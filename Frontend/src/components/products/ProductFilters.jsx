const STATUS_TABS = ["all", "approved", "pending", "rejected"];

export default function ProductFilters({
  activeStatus,
  onStatusChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Status Tabs */}
      <div className="flex gap-2">
        {STATUS_TABS.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-4 py-1.5 rounded-full text-sm capitalize border
              ${
                activeStatus === status
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search products..."
        className="border rounded-md px-3 py-2 w-full sm:w-64"
      />
    </div>
  );
}
