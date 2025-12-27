import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [pendingProducts, setPendingProducts] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const [productsRes, vendorsRes] = await Promise.all([
      api.get("/products"),
      api.get("/admin/vendors"),
    ]);

    const products = productsRes.data.data;
    const vendors = vendorsRes.data.data;

    setStats({
      vendors: vendors.length,
      products: products.length,
      pending: products.filter(p => p.status === "pending").length,
      approved: products.filter(p => p.status === "approved").length,
    });

    setPendingProducts(
      products.filter(p => p.status === "pending").slice(0, 5)
    );
  };

  if (!stats) return null;

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatusCard title="Vendors" value={stats.vendors} onClick={() => navigate("/admin/vendors")} />
        <StatusCard title="Products" value={stats.products} onClick={() => navigate("/admin/products")} />
        <StatusCard title="Pending" value={stats.pending} onClick={() => navigate("/admin/products")} />
        <StatusCard title="Approved" value={stats.approved} />
      </div>

      {/* Pending approvals */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Pending Approvals</h3>

        {pendingProducts.length === 0 ? (
          <p className="text-sm text-gray-500">No pending products</p>
        ) : (
          pendingProducts.map(p => (
            <div key={p._id} className="flex justify-between py-2 border-b last:border-0">
              <span>{p.name}</span>
              <button
                onClick={() => navigate("/admin/products")}
                className="text-sm text-blue-600"
              >
                Review
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function StatusCard({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
