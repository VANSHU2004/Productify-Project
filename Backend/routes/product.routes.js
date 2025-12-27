import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";

import {
  createProductController,
  getProductsController,
  updateProductController,
  deleteProductController,
  changeProductStatusController,
  getVendorProductsController,
  getApprovedProductsController
} from "../controllers/product.controller.js";

const router = Router();

router.use(authenticate);

// Product CRUD
router.post("/", createProductController);          // create product
router.get("/", getProductsController);             // list all products
router.put("/:id", updateProductController);        // update product
router.delete("/:id", deleteProductController);
router.get("/approved", getApprovedProductsController);     // delete product

// Update the status
router.patch("/:id/status", changeProductStatusController);

// Vendor-specific products
router.get("/vendor/:vendorId", getVendorProductsController);

export default router;
