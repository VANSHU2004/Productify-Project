import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductGrid from "../../components/products/ProductGrid";
import ProductModal from "../../components/products/ProductModal";

export default function ProductApproval() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // view | edit

  /* Fetch Products */
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

  /* Update Status */
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/products/${id}/status`, { status });

      // Optimistic UI update
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status } : p
        )
      );

      setSelectedProduct(null);
    } catch (err) {
      alert("Failed to update product status");
    }
  };

  /* Save Edit */
  const saveProduct = async (values) => {
    try {
      const res = await api.put(`/products/${selectedProduct._id}`, values);

      setProducts((prev) =>
        prev.map((p) =>
          p._id === selectedProduct._id ? res.data.data : p
        )
      );

      setSelectedProduct(null);
    } catch (err) {
      alert("Failed to update product");
    }
  };


  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Product Approvals</h2>

      {/* Product Grid */}
      <ProductGrid
        products={products}
        onView={(product) => {
          setSelectedProduct(product);
          setModalMode("view");
        }}
        onEdit={(product) => {
          setSelectedProduct(product);
          setModalMode("edit");
        }}
      />

      {/* View/Edit Modal*/}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          readOnly={modalMode === "view"}
          showStatusActions={true}
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
