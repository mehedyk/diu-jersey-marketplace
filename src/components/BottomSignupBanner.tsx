import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Gift } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const BottomSignupBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const { user } = useAuth();

  if (dismissed || user) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-2xl">
      <div className="container flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <Gift className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            Welcome! Enjoy{" "}
            <span className="text-primary">free delivery</span>{" "}
            and exclusive discount on your first order.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/register">
            <Button size="sm" variant="outline" className="font-bold text-xs uppercase tracking-wider border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Sign up
            </Button>
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSignupBanner;
