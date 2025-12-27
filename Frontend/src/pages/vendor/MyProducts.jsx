import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import ProductGrid from "../../components/products/ProductGrid";
import ProductModal from "../../components/products/ProductModal";

export default function MyProducts() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mode, setMode] = useState("view");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/products/vendor/${user.id}`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

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
      <h2 className="text-xl font-semibold mb-4">My Products</h2>

      <ProductGrid
        products={products}
        onView={(product) => {
          setSelectedProduct(product);
          setMode("view");
        }}
        onEdit={(product) => {
          setSelectedProduct(product);
          setMode("edit");
        }}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          readOnly={mode === "view"}
          showStatusActions={false}
          onSave={saveProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
