import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductGrid from "../../components/products/ProductGrid";
import ProductModal from "../../components/products/ProductModal";

export default function ProductApproval() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/products/${id}/status`, { status });

      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status } : p
        )
      );

      setSelectedProduct(null);
    } catch {
      alert("Failed to update product status");
    }
  };

  const saveProduct = async (values) => {
    try {
      const res = await api.put(
        `/products/${selectedProduct._id}`,
        values
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === selectedProduct._id ? res.data.data : p
        )
      );

      setSelectedProduct(null);
    } catch {
      alert("Failed to update product");
    }
  };

  const deleteProduct = async (product) => {
    if (!window.confirm("Delete this product permanently?")) return;

    try {
      await api.delete(`/products/${product._id}`);
      setProducts((prev) =>
        prev.filter((p) => p._id !== product._id)
      );
      setSelectedProduct(null);
    } catch {
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Product Approvals
      </h2>

      <ProductGrid
        products={products}
        onView={(p) => {
          setSelectedProduct(p);
          setModalMode("view");
        }}
        onEdit={(p) => {
          setSelectedProduct(p);
          setModalMode("edit");
        }}
        onDelete={deleteProduct}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          readOnly={modalMode === "view"}
          showStatusActions={modalMode === "edit"}
          onApprove={() =>
            updateStatus(selectedProduct._id, "approved")
          }
          onReject={() =>
            updateStatus(selectedProduct._id, "rejected")
          }
          onSave={saveProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
