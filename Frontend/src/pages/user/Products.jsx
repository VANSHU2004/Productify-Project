import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductGrid from "../../components/products/ProductGrid";
import ProductModal from "../../components/products/ProductModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/approved");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      <ProductGrid
        products={products}
        onView={setSelectedProduct}
        hideStatus
        disableStatusFilter
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          readOnly
          showStatusActions={false}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
