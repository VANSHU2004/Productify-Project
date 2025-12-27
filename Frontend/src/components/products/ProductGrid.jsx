import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

export default function ProductGrid({
  products = [],
  renderActions,
  onView,
  onEdit,
}) {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const statusMatch =
        status === "all" ? true : p.status === status;

      const searchMatch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase());

      return statusMatch && searchMatch;
    });
  }, [products, status, search]);

  return (
    <div>
      <ProductFilters
        activeStatus={status}
        onStatusChange={setStatus}
        search={search}
        onSearchChange={setSearch}
      />

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onView={() => onView?.(product)}
              onEdit={() => onEdit?.(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
