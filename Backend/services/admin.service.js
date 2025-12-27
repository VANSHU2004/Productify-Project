import { UserModel } from "../models/user.model.js";

// Get vendors with all the required data
export async function getVendorsWithProductStats() {
  const vendors = await UserModel.aggregate([
    { $match: { role: "vendor" } },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "vendorId",
        as: "products",
      },
    },
  ]);

  return vendors.map((vendor) => {
    const totalProducts = vendor.products.length;
    const approvedProducts = vendor.products.filter(
      (p) => p.status === "approved"
    ).length;
    const rejectedProducts = vendor.products.filter(
      (p) => p.status === "rejected"
    ).length;

    return {
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      createdAt: vendor.createdAt,
      totalProducts,
      approvedProducts,
      rejectedProducts,
    };
  });
}
