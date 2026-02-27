import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jerseyTypes = ["Football Jersey", "Cricket Jersey", "Basketball Jersey", "Hoodie", "Others"];

const CustomJerseyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jerseyType, setJerseyType] = useState("");
  const [teamOrClub, setTeamOrClub] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [sizeDetails, setSizeDetails] = useState("");
  const [playerNameNumber, setPlayerNameNumber] = useState("");
  const [extraInstructions, setExtraInstructions] = useState("");
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!user) { navigate("/login"); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jerseyType || !designFile) {
      toast({ title: "Missing fields", description: "Jersey type and design image are required.", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    const requestId = crypto.randomUUID();
    let designUrl = "";
    let logoUrl = "";

    // Upload design
    const designPath = `${user.id}/${requestId}/design.${designFile.name.split(".").pop()}`;
    const { error: dErr } = await supabase.storage.from("jersey-designs").upload(designPath, designFile);
    if (dErr) { toast({ title: "Upload failed", description: dErr.message, variant: "destructive" }); setSubmitting(false); return; }
    const { data: dUrl } = supabase.storage.from("jersey-designs").getPublicUrl(designPath);
    designUrl = dUrl.publicUrl;

    // Upload logo if provided
    if (logoFile) {
      const logoPath = `${user.id}/${requestId}/logo.${logoFile.name.split(".").pop()}`;
      const { error: lErr } = await supabase.storage.from("jersey-designs").upload(logoPath, logoFile);
      if (!lErr) {
        const { data: lUrl } = supabase.storage.from("jersey-designs").getPublicUrl(logoPath);
        logoUrl = lUrl.publicUrl;
      }
    }

    const { error } = await supabase.from("custom_jersey_requests").insert({
      user_id: user.id,
      jersey_type: jerseyType,
      team_or_club: teamOrClub,
      quantity,
      size_details: sizeDetails,
      player_name_number: playerNameNumber,
      extra_instructions: extraInstructions,
      design_image_url: designUrl,
      logo_image_url: logoUrl,
    } as any);

    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Request submitted!", description: "We'll review your custom jersey request soon." });
      navigate("/my-custom-jerseys");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-extrabold text-foreground mb-8">Custom Jersey Order</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <Label>Jersey Type *</Label>
            <Select value={jerseyType} onValueChange={setJerseyType}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                {jerseyTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Team / Club Name</Label>
            <Input value={teamOrClub} onChange={(e) => setTeamOrClub(e.target.value)} placeholder="e.g. DIU SWE Batch 25" />
          </div>
          <div className="space-y-2">
            <Label>Quantity *</Label>
            <Input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Size Details</Label>
            <Textarea value={sizeDetails} onChange={(e) => setSizeDetails(e.target.value)} placeholder="e.g. S-5, M-10, L-3, XL-2" />
          </div>
          <div className="space-y-2">
            <Label>Player Name & Number Details</Label>
            <Textarea value={playerNameNumber} onChange={(e) => setPlayerNameNumber(e.target.value)} placeholder="e.g. Rafiq-07, Tanvir-10" />
          </div>
          <div className="space-y-2">
            <Label>Extra Instructions</Label>
            <Textarea value={extraInstructions} onChange={(e) => setExtraInstructions(e.target.value)} placeholder="Any special requirements..." />
          </div>
          <div className="space-y-2">
            <Label>Upload Design / Pattern Image *</Label>
            <Input type="file" accept="image/*" onChange={(e) => setDesignFile(e.target.files?.[0] ?? null)} />
          </div>
          <div className="space-y-2">
            <Label>Upload Logo Image (optional)</Label>
            <Input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)} />
          </div>
          <Button type="submit" size="lg" disabled={submitting} className="w-full">
            {submitting ? "Submitting..." : "Submit Custom Jersey Request"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CustomJerseyPage;
