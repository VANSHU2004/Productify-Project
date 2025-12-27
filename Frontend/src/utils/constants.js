import { ShieldCheck, Store, User } from "lucide-react";

export const ROLES = [
  {
    id: "admin",
    label: "Administrator",
    icon: ShieldCheck,
  },
  {
    id: "vendor",
    label: "Vendor",
    icon: Store,
  },
  {
    id: "user",
    label: "Customer",
    icon: User,
  },
];
