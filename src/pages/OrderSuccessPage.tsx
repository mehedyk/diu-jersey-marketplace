import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Package, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const OrderSuccessPage = () => {
  const [params] = useSearchParams();
  const orderId = params.get("orderId") ?? "";
  const { user } = useAuth();
  const email = user?.email ?? "";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container flex items-center justify-center py-16">
        <div className="max-w-lg w-full rounded-2xl bg-card border border-border p-8 text-center space-y-6">
          <CheckCircle className="mx-auto h-20 w-20 text-primary" />
          <h1 className="text-2xl font-extrabold text-foreground">Order Placed Successfully!</h1>
          {orderId && (
            <p className="text-sm text-muted-foreground">
              Order ID: <span className="font-mono font-bold text-foreground">{orderId.slice(0, 8).toUpperCase()}</span>
            </p>
          )}
          <p className="text-muted-foreground">
            Thank you for your order! You can track its status from the My Orders page.
          </p>
          {email && (
            <p className="text-sm text-muted-foreground">
              We've sent a confirmation to <span className="font-semibold text-foreground">{email}</span>.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link to={orderId ? `/orders/${orderId}` : "/my-orders"}>
              <Button className="gap-2"><Package className="h-4 w-4" /> Track This Order</Button>
            </Link>
            <Link to="/my-orders">
              <Button variant="outline" className="gap-2"><List className="h-4 w-4" /> View All Orders</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
