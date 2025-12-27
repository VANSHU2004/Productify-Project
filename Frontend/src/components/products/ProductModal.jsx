import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ProductSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().positive().required(),
  category: Yup.string().required(),
  image: Yup.string().url("Enter a valid image URL").nullable(),
});

const STATUS_STYLES = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ProductModal({
  product,
  onClose,
  onSave,
  readOnly = false,
  showStatusActions = false,
  onApprove,
  onReject,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[50vw] max-h-[90vh] overflow-y-auto rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          {readOnly ? "View Product" : "Edit Product"}
        </h3>

        <Formik
          initialValues={product}
          validationSchema={ProductSchema}
          enableReinitialize
          onSubmit={onSave}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Image Preview */}
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
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

              {/* Status (READ-ONLY) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Status
                </label>
                <span
                  className={`inline-block text-sm px-3 py-1 rounded ${
                    STATUS_STYLES[product.status]
                  }`}
                >
                  {product.status}
                </span>
              </div>

              {!readOnly && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Image URL
                  </label>
                  <Field
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    className="w-full border p-2 rounded"
                  />
                </div>
              )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name *
                </label>
                <Field
                  name="name"
                  disabled={readOnly}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <Field
                  name="description"
                  disabled={readOnly}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
              

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price *
                  </label>
                  <Field
                    name="price"
                    type="number"
                    disabled={readOnly}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category *
                  </label>
                  <Field
                    name="category"
                    disabled={readOnly}
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>

              {/* Admin-only status actions (NOT in view mode) */}
              {showStatusActions && !readOnly && (
                <div className="flex gap-2 pt-3">
                  <button
                    type="button"
                    onClick={onApprove}
                    className="flex-1 bg-green-600 text-white py-2 rounded"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={onReject}
                    className="flex-1 bg-red-600 text-white py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded"
                >
                  Close
                </button>

                {!readOnly && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-black text-white rounded"
                  >
                    Save
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
