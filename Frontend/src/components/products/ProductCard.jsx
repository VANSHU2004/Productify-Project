import ProductActionsMenu from "./ProductActionMenu";

export default function ProductCard({ product, onView, onEdit, actions }) {
    const statusColor = {
        approved: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        rejected: "bg-red-100 text-red-700",
    };

    return (
        <div className="relative bg-white border rounded-lg p-4 flex flex-col hover:shadow-md transition">

            <div className="absolute top-2 right-2">
                <ProductActionsMenu onView={onView} onEdit={onEdit} />
            </div>
            {/* Image */}
            <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full object-contain"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                )}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {product.description}
                </p>
            </div>

            {/* Footer */}
            <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="font-semibold">₹{product.price}</span>
                    <span
                        className={`text-xs px-2 py-1 rounded ${statusColor[product.status]}`}
                    >
                        {product.status}
                    </span>
                </div>
            </div>
        </div>
    );
}
