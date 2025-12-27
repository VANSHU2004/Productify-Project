import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { NAV_CONFIG } from "./navConfig";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const links = NAV_CONFIG[user?.role] || [];

  return (
    <aside className="w-64 h-screen bg-[#0F172A] text-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 text-xl font-bold border-b border-white/10">
        Productify
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${isActive ? "bg-white/10" : "hover:bg-white/5"}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-6 py-4 border-t border-white/10 text-sm hover:bg-white/5"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
