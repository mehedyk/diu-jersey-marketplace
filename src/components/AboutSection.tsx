import { Shield, Truck, Users, Shirt } from "lucide-react";

const features = [
  {
    icon: Shirt,
    title: "All DIU Jerseys",
    description: "Browse every club, section, batch, and department jersey available at Daffodil International University — all in one place.",
  },
  {
    icon: Users,
    title: "Trusted Suppliers",
    description: "We partner with verified local jersey suppliers who deliver quality sublimation printing and premium fabrics.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Most orders are delivered within 5–10 business days. Track your order status in real-time from your dashboard.",
  },
  {
    icon: Shield,
    title: "Secure Ordering",
    description: "Place orders safely with transparent pricing. Communicate directly with suppliers through our built-in messaging system.",
  },
];

const AboutSection = () => (
  <section id="about" className="bg-card py-16">
    <div className="container max-w-5xl space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-extrabold uppercase tracking-widest text-foreground md:text-3xl">
          About DIU Jersey Hub
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed">
          DIU Jersey Hub is the official marketplace for Daffodil International University students to discover, customize, and order jerseys for their clubs, departments, sections, and batches — all from verified suppliers.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-border bg-background p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
