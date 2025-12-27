import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="font-semibold text-gray-800 capitalize">
        {user?.role} Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div className="text-right text-sm">
          <p className="font-medium">{user?.name}</p>
          <p className="text-gray-500 text-xs">{user?.email}</p>
        </div>

        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
          {user?.name?.[0]?.toUpperCase()}
        </div>
      </div>
    </header>
  );
}
