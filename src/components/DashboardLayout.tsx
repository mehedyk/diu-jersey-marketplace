import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Store,
  LogOut,
  ChevronLeft,
  MessageSquare,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Suppliers", href: "/admin/suppliers", icon: Store },
  { label: "Users", href: "/admin/users", icon: Users },
];

const supplierLinks = [
  { label: "Dashboard", href: "/supplier/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/supplier/orders", icon: ShoppingBag },
  { label: "Products", href: "/supplier/products", icon: Package },
  { label: "Messages", href: "/supplier/messages", icon: MessageSquare },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { signOut } = useAuth();
  const { isAdmin } = useRole();
  const location = useLocation();
  const links = isAdmin ? adminLinks : supplierLinks;
  const title = isAdmin ? "Admin Panel" : "Supplier Panel";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="p-6">
          <h2 className="text-lg font-extrabold text-primary">{title}</h2>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {links.map((link) => {
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Site
          </Link>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-card p-4 lg:hidden">
          <h2 className="text-lg font-extrabold text-primary">{title}</h2>
          <div className="flex gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`rounded-lg p-2 ${
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <link.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
