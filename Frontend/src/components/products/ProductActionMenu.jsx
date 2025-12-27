import { useState } from "react";
import { MoreVertical } from "lucide-react";

export default function ProductActionsMenu({ onView, onEdit }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="p-1 rounded hover:bg-gray-100"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
          <button
            onClick={() => {
              onView();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
          >
            View
          </button>

          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
