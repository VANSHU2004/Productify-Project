import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api/axios";

// Schema for product 
const ProductSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(100, "Too long")
    .required("Product name is required"),

  description: Yup.string()
    .min(10, "Minimum 10 characters")
    .required("Description is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  category: Yup.string()
    .required("Category is required"),

  image: Yup.string()
    .url("Enter a valid image URL")
    .nullable(),
});

export default function AddProduct() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  };

  const submit = async (values, { setSubmitting, resetForm }) => {
    try {
      await api.post("/products", values);
      resetForm();
      
      navigate("/vendor/products");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={ProductSchema}
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <Field
                  name="name"
                  placeholder="Enter product name"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows={4}
                  placeholder="Describe your product"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Price + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price (₹)
                  </label>
                  <Field
                    name="price"
                    type="number"
                    placeholder="0.00"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                  <ErrorMessage
                    name="price"
                    component="p"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <Field
                    name="category"
                    placeholder="e.g. Electronics"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL (optional)
                </label>
                <Field
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                />
                <ErrorMessage
                  name="image"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-2.5 rounded-md font-medium hover:bg-black/90 transition disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Add Product"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
