import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

export default function ProductGrid({
  products = [],
  onView,
  onEdit,
  hideStatus = false,
  disableStatusFilter = false,
  onDelete
}) {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const statusMatch = disableStatusFilter
        ? true
        : status === "all"
          ? true
          : p.status === status;

      const q = search.toLowerCase();

      const searchMatch =
        p.name.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q);

      return statusMatch && searchMatch;
    });
  }, [products, status, search, disableStatusFilter]);

  return (
    <div>
      <ProductFilters
        activeStatus={status}
        onStatusChange={setStatus}
        search={search}
        onSearchChange={setSearch}
        hideStatusFilter={disableStatusFilter}
      />

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              product={product}
              onView={() => onView?.(product)}
              onEdit={onEdit ? () => onEdit(product) : undefined}
              onDelete={onDelete ? () => onDelete(product) : undefined}
              hideStatus={hideStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
