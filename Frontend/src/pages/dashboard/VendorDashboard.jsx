import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function VendorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await api.get(`/products/vendor/${user.id}`);
    setProducts(res.data.data);
  };

  const stats = {
    total: products.length,
    pending: products.filter(p => p.status === "pending").length,
    approved: products.filter(p => p.status === "approved").length,
    rejected: products.filter(p => p.status === "rejected").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
        <p className="text-gray-600">Manage your products and approvals</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard label="Total Products" value={stats.total} icon={Package} />
        <StatCard label="Pending" value={stats.pending} icon={Clock} />
        <StatCard label="Approved" value={stats.approved} icon={CheckCircle} />
        <StatCard label="Rejected" value={stats.rejected} icon={XCircle} />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <ActionButton
          label="Add Product"
          icon={Plus}
          onClick={() => navigate("/vendor/add-product")}
        />
        <ActionButton
          label="View Products"
          onClick={() => navigate("/vendor/products")}
        />
      </div>

      {/* Recent Products */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Recent Products</h3>

        {products.slice(0, 5).map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-center py-2 border-b last:border-0"
          >
            <span>{p.name}</span>
            <span className={`text-sm capitalize ${statusColor(p.status)}`}>
              {p.status}
            </span>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-sm text-gray-500">No products yet</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Icon className="text-gray-600" />
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ label, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md"
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
}

function statusColor(status) {
  if (status === "approved") return "text-green-600";
  if (status === "rejected") return "text-red-600";
  return "text-yellow-600";
}
