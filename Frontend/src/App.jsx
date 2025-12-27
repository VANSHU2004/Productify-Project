import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import AdminDashboard from "./pages/dashboard/AdminDashboard";
import VendorDashboard from "./pages/dashboard/VendorDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import MyProducts from "./pages/vendor/MyProducts";
import AddProduct from "./pages/vendor/AddProduct";
import ProductApproval from "./pages/admin/ProductApproval";
import Products from "./pages/user/Products";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AppLayout>
                <AdminDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requiredRole="admin">
              <AppLayout>
                <ProductApproval />
              </AppLayout>
            </ProtectedRoute>
          }
        />


        {/* Vendor Routes*/}
        <Route
          path="/vendor"
          element={
            <ProtectedRoute requiredRole="vendor">
              <AppLayout>
                <VendorDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/products"
          element={
            <ProtectedRoute requiredRole="vendor">
              <AppLayout>
                <MyProducts />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/add-product"
          element={
            <ProtectedRoute requiredRole="vendor">
              <AppLayout>
                <AddProduct />
              </AppLayout>
            </ProtectedRoute>
          }
        />


        {/* User Routes*/}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <AppLayout>
                <UserDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Products />
              </AppLayout>
            </ProtectedRoute>
          }
        />


        {/* Redirections */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
