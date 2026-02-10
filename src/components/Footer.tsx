import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-foreground text-primary-foreground" id="contact">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-accent" />
            <span className="text-lg font-bold">DIU Jersey Hub</span>
          </div>
          <p className="text-sm text-primary-foreground/70">
            The one-stop marketplace for university jerseys at Daffodil International University.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/jerseys" className="hover:text-accent transition-colors">Browse Jerseys</Link></li>
            <li><Link to="/suppliers" className="hover:text-accent transition-colors">Suppliers</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-accent transition-colors">How It Works</Link></li>
          </ul>
        </div>

        {/* For Suppliers */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-accent">For Suppliers</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/register" className="hover:text-accent transition-colors">Become a Supplier</Link></li>
            <li><Link to="/login" className="hover:text-accent transition-colors">Supplier Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-accent">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>Email: jerseyhub@diu.edu.bd</li>
            <li>Daffodil International University</li>
            <li>Ashulia, Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/50">
        A final year project for DIU — DIU Jersey Hub © {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default Footer;
