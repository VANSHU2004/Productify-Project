import { getVendorsWithProductStats } from "../services/admin.service.js";

export async function getVendorsController(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const vendors = await getVendorsWithProductStats();

    return res.status(200).json({
      success: true,
      data: vendors,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch vendors",
    });
  }
}
