import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Users,
} from "lucide-react";

export const NAV_CONFIG = {
  admin: [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/products", label: "All Products", icon: Package },
    { to: "/admin/vendors", label: "Vendors", icon: Users },
    { to: "/admin/add-product", label: "Add Product", icon: PlusCircle },
  ],
  vendor: [
    { to: "/vendor", label: "Dashboard", icon: LayoutDashboard },
    { to: "/vendor/products", label: "My Products", icon: Package },
    { to: "/vendor/add-product", label: "Add Product", icon: PlusCircle },
  ],
  user: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/products", label: "Products", icon: Package },
  ],
};
