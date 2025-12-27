import * as productService from "../services/product.service.js";
import { Types } from "mongoose";

// Create Product (Vendor)
export async function createProductController(req, res) {
  try {
    const { id, role } = req.user;

    if (role !== "vendor") {
      return res.status(403).json({
        success: false,
        message: "Only vendors can create products",
      });
    }

    const product = await productService.createProduct({
      ...req.body,
      vendorId: id,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to create product",
    });
  }
}

// Get all products (Admin)
export async function getProductsController(req, res) {
  try {
    const products = await productService.getProducts();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch products",
    });
  }
}

// Get approved products (Users)
export async function getApprovedProductsController(req, res) {
  try {
    const products = await productService.getApprovedProducts();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch approved products",
    });
  }
}

// Update Product
export async function updateProductController(req, res) {
  try {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const existing = await productService.getProductsByVendor(userId);
    const isOwner = existing.some(p => p._id.toString() === id);

    if (role !== "admin" && !isOwner) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const product = await productService.updateProduct(id, req.body);

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to update product",
    });
  }
}

// Delete Product
export async function deleteProductController(req, res) {
  try {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    if (role !== "admin") {
      const vendorProducts = await productService.getProductsByVendor(userId);
      const ownsProduct = vendorProducts.some(p => p._id.toString() === id);
      if (!ownsProduct) {
        return res.status(403).json({ success: false, message: "Unauthorized" });
      }
    }

    await productService.deleteProduct(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to delete product",
    });
  }
}

// Change Product Status (Admin)
export async function changeProductStatusController(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can change product status",
      });
    }

    const product = await productService.changeProductStatus(
      req.params.id,
      req.body.status
    );

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to update product status",
    });
  }
}

// Get Vendor Products
export async function getVendorProductsController(req, res) {
  try {
    const products = await productService.getProductsByVendor(req.params.vendorId);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch vendor products",
    });
  }
}
