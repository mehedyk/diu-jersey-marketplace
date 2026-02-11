import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { label: "New In", href: "/jerseys" },
  { label: "Section", href: "/jerseys?cat=Section" },
  { label: "Club", href: "/jerseys?cat=Club" },
  { label: "Batch", href: "/jerseys?cat=Batch+Jersey" },
  { label: "Tournament", href: "/jerseys?cat=Tournament" },
  { label: "About", href: "/#about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();

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

          <Link to="/cart" className="relative text-muted-foreground transition-colors hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="text-muted-foreground transition-colors hover:text-foreground">
                <User className="h-5 w-5" />
              </Link>
              <button
                onClick={signOut}
                className="hidden text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground lg:block"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-md bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 lg:block"
            >
              Login
            </Link>
          )}

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
            {user ? (
              <button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="text-left text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm font-bold uppercase tracking-wider text-primary hover:text-primary/80"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
