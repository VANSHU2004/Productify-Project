import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await api.get("/admin/vendors");
    //   console.log(res)
      setVendors(res.data.data);
    } catch (err) {
      console.error("Failed to fetch vendors", err);
    } finally {
      setLoading(false);
    }
  };

  const stats = vendors.reduce(
    (acc, v) => {
      acc.totalVendors += 1;
      acc.totalProducts += v.totalProducts;
      acc.approved += v.approvedProducts;
      acc.rejected += v.rejectedProducts;
      return acc;
    },
    {
      totalVendors: 0,
      totalProducts: 0,
      approved: 0,
      rejected: 0,
    }
  );

  if (loading) return <p>Loading vendors...</p>;

  return (
    <div className="space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Vendors" value={stats.totalVendors} />
        <StatCard label="Total Products" value={stats.totalProducts} />
        <StatCard label="Approved Products" value={stats.approved} />
        <StatCard label="Rejected Products" value={stats.rejected} />
      </div>

      {/*  TABLE */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <Th>Vendor</Th>
              <Th>Email</Th>
              <Th>Total</Th>
              <Th>Approved</Th>
              <Th>Rejected</Th>
              <Th>Joined</Th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v._id} className="border-b last:border-0">
                <Td className="font-medium">{v.name}</Td>
                <Td>{v.email}</Td>
                <Td>{v.totalProducts}</Td>
                <Td className="text-green-600">{v.approvedProducts}</Td>
                <Td className="text-red-600">{v.rejectedProducts}</Td>
                <Td>
                  {new Date(v.createdAt).toLocaleDateString()}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>

        {vendors.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No vendors found
          </p>
        )}
      </div>
    </div>
  );
}


function StatCard({ label, value }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="text-left font-medium text-gray-600 px-4 py-3">
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td className={`px-4 py-3 ${className}`}>
      {children}
    </td>
  );
}
