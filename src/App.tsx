import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { RoleProvider } from "@/hooks/useRole";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import JerseysPage from "./pages/JerseysPage";
import JerseyDetailPage from "./pages/JerseyDetailPage";
import StoresPage from "./pages/StoresPage";
import StoreDetailPage from "./pages/StoreDetailPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import CustomJerseyPage from "./pages/CustomJerseyPage";
import MyCustomJerseysPage from "./pages/MyCustomJerseysPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminSuppliers from "./pages/admin/AdminSuppliers";
import AdminUsers from "./pages/admin/AdminUsers";
import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import SupplierOrders from "./pages/supplier/SupplierOrders";
import SupplierProducts from "./pages/supplier/SupplierProducts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <RoleProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/jerseys" element={<JerseysPage />} />
                <Route path="/jerseys/:id" element={<JerseyDetailPage />} />
                <Route path="/stores" element={<StoresPage />} />
                <Route path="/stores/:id" element={<StoreDetailPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/orders/:id" element={<OrderDetailPage />} />
                <Route path="/custom-jersey" element={<CustomJerseyPage />} />
                <Route path="/my-custom-jerseys" element={<MyCustomJerseysPage />} />

                {/* Admin routes */}
                <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={["admin"]}><AdminOrders /></ProtectedRoute>} />
                <Route path="/admin/suppliers" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSuppliers /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUsers /></ProtectedRoute>} />

                {/* Supplier routes */}
                <Route path="/supplier/dashboard" element={<ProtectedRoute allowedRoles={["supplier"]}><SupplierDashboard /></ProtectedRoute>} />
                <Route path="/supplier/orders" element={<ProtectedRoute allowedRoles={["supplier"]}><SupplierOrders /></ProtectedRoute>} />
                <Route path="/supplier/products" element={<ProtectedRoute allowedRoles={["supplier"]}><SupplierProducts /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </RoleProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
