import { ShieldCheck, Store, User } from "lucide-react";

export const ROLES = [
  {
    id: "admin",
    label: "Administrator",
    icon: ShieldCheck,
    color: "blue",
  },
  {
    id: "vendor",
    label: "Vendor",
    icon: Store,
    color: "green",
  },
  {
    id: "user",
    label: "Customer",
    icon: User,
    color: "purple",
  },
];
