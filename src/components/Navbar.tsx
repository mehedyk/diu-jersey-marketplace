import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Jerseys", href: "/jerseys" },
  { label: "Suppliers", href: "/suppliers" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">
            DIU <span className="text-primary">Jersey Hub</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm">Login</Button>
          <Button variant="outline" size="sm">Register</Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            Become a Supplier
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container flex flex-col gap-3 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <Button variant="ghost" size="sm" className="justify-start">Login</Button>
            <Button variant="outline" size="sm" className="justify-start">Register</Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold justify-start">
              Become a Supplier
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
