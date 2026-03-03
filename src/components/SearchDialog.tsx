import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { jerseyDesigns, stores } from "@/data/mockData";
import { Search, Store, Shirt } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredJerseys = query.length > 0
    ? jerseyDesigns.filter((j) =>
        j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.category.toLowerCase().includes(query.toLowerCase()) ||
        j.supplierName.toLowerCase().includes(query.toLowerCase()) ||
        j.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  const filteredStores = query.length > 0
    ? stores.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search jerseys, stores..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {filteredStores.length > 0 && (
          <CommandGroup heading="Stores">
            {filteredStores.map((store) => (
              <CommandItem
                key={store.id}
                onSelect={() => { navigate(`/stores/${store.id}`); onOpenChange(false); setQuery(""); }}
              >
                <Store className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{store.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredJerseys.length > 0 && (
          <CommandGroup heading="Jerseys">
            {filteredJerseys.map((jersey) => (
              <CommandItem
                key={jersey.id}
                onSelect={() => { navigate(`/jerseys/${jersey.id}`); onOpenChange(false); setQuery(""); }}
              >
                <Shirt className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <span>{jersey.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground">৳{jersey.pricePerPiece}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
