import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import UserDropdown from "@/components/UserDropdown";
import SearchDialog from "@/components/SearchDialog";
import retroImage from "@/assets/retro-banner.jpg";

const navLinks = [
  { label: "Stores", href: "/stores" },
  { label: "New In", href: "/jerseys" },
  { label: "Section", href: "/jerseys?cat=Section" },
  { label: "Club", href: "/jerseys?cat=Club" },
  { label: "Batch", href: "/jerseys?cat=Batch+Jersey" },
  { label: "About", href: "/#about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[hsl(222,47%,4%)]">
      {/* Logo banner with retro image */}
      <div className="relative h-12 w-full overflow-hidden">
        <img src={retroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="container relative flex h-full items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-extrabold tracking-tight text-foreground">
              DIU <span className="text-primary">JERSEY HUB</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="container flex h-14 items-center justify-between">
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
        <div className="flex items-center gap-4 ml-auto">
          <button onClick={() => setSearchOpen(true)} className="text-muted-foreground transition-colors hover:text-foreground">
            <Search className="h-5 w-5" />
          </button>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

          <Link to="/cart" className="relative text-muted-foreground transition-colors hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <UserDropdown />
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
