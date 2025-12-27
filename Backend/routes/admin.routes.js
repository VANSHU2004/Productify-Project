import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getVendorsController } from "../controllers/admin.controller.js";

const router = Router();

// Admin only
router.get("/vendors", authenticate, getVendorsController);

export default router;
