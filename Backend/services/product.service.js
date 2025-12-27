import { Product } from "../models/product.model.js";
import { Types } from "mongoose";

// Create product
export async function createProduct(data) {
  return Product.create(data);
}

// Get all products (admin)
export async function getProducts() {
  return Product.find().sort({ createdAt: -1 });
}

// Get approved products (users)
export async function getApprovedProducts() {
  return Product.find({ status: "approved" }).sort({ createdAt: -1 });
}

// Get vendor products
export async function getProductsByVendor(vendorId) {
  if (!Types.ObjectId.isValid(vendorId)) {
    throw new Error("Invalid vendor ID");
  }

  return Product.find({ vendorId }).sort({ createdAt: -1 });
}

// Update product
export async function updateProduct(id, updates) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid product ID");
  }

  const updated = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updated) throw new Error("Product not found");
  return updated;
}

// Delete product
export async function deleteProduct(id) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid product ID");
  }

  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new Error("Product not found");

  return deleted;
}

// Change product status (admin)
export async function changeProductStatus(id, status) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid product ID");
  }

  const validStatuses = ["pending", "approved", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid product status");
  }

  const updated = await Product.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updated) throw new Error("Product not found");
  return updated;
}
