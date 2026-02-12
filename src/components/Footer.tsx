import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import retroImage from "@/assets/retro-banner.jpg";

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-border" id="contact">
    {/* Background image */}
    <img
      src={retroImage}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-background/90 dark:bg-background/95" />

    <div className="container relative py-12">
      <div className="grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="text-base font-extrabold text-foreground">
              DIU JERSEY HUB
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The one-stop marketplace for university jerseys at Daffodil International University.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><Link to="/jerseys" className="hover:text-primary transition-colors">Browse Jerseys</Link></li>
            <li><Link to="/suppliers" className="hover:text-primary transition-colors">Suppliers</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
          </ul>
        </div>

        {/* For Suppliers */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-foreground">For Suppliers</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><Link to="/register" className="hover:text-primary transition-colors">Become a Supplier</Link></li>
            <li><Link to="/login" className="hover:text-primary transition-colors">Supplier Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-foreground">Contact</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>jerseyhub@diu.edu.bd</li>
            <li>Daffodil International University</li>
            <li>Ashulia, Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        A final year project for DIU — DIU Jersey Hub © {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default Footer;
