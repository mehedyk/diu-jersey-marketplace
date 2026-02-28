import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { User, ShoppingBag, HelpCircle, LogOut, ChevronDown, ChevronUp, Shirt, Package, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const UserDropdown = () => {
  const { user, signOut } = useAuth();
  const { isAdmin, isSupplier } = useRole();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors outline-none">
          <User className="h-4 w-4" />
          <span className="hidden lg:inline max-w-[100px] truncate">{displayName}</span>
          {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
        {/* Role-based dashboard links */}
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/admin/dashboard" className="flex items-center gap-3 cursor-pointer">
              <LayoutDashboard className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        {isSupplier && (
          <DropdownMenuItem asChild>
            <Link to="/supplier/dashboard" className="flex items-center gap-3 cursor-pointer">
              <LayoutDashboard className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">Supplier Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        {(isAdmin || isSupplier) && <DropdownMenuSeparator className="bg-border" />}

        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-3 cursor-pointer">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/my-orders" className="flex items-center gap-3 cursor-pointer">
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            <span>My Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/my-custom-jerseys" className="flex items-center gap-3 cursor-pointer">
            <Shirt className="h-4 w-4 text-muted-foreground" />
            <span>My Custom Jerseys</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/custom-jersey" className="flex items-center gap-3 cursor-pointer">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span>Custom Jersey Order</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/#faq" className="flex items-center gap-3 cursor-pointer">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span>Help Center</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem
          onClick={signOut}
          className="flex items-center gap-3 cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
