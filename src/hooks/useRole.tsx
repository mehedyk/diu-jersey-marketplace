import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type AppRole = "customer" | "supplier" | "admin";

interface RoleContextType {
  role: AppRole | null;
  loading: boolean;
  isAdmin: boolean;
  isSupplier: boolean;
  isCustomer: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_user_role", { _user_id: user.id });
      if (!error && data) {
        setRole(data as AppRole);
      } else {
        setRole("customer"); // default fallback
      }
      setLoading(false);
    };

    fetchRole();
  }, [user]);

  return (
    <RoleContext.Provider
      value={{
        role,
        loading,
        isAdmin: role === "admin",
        isSupplier: role === "supplier",
        isCustomer: role === "customer",
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within RoleProvider");
  return context;
};
