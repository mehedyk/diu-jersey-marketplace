import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingBag } from "lucide-react";

const navLinks = [
  { label: "New In", href: "/jerseys" },
  { label: "Football", href: "/jerseys?cat=Football" },
  { label: "Cricket", href: "/jerseys?cat=Cricket" },
  { label: "Batch", href: "/jerseys?cat=Batch+Jersey" },
  { label: "Tournament", href: "/jerseys?cat=Tournament" },
  { label: "About", href: "/#about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            DIU <span className="text-primary">JERSEY HUB</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button className="text-muted-foreground transition-colors hover:text-foreground">
            <Search className="h-5 w-5" />
          </button>
          <button className="text-muted-foreground transition-colors hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
          </button>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
