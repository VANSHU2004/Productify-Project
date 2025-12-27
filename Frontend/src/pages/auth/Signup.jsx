import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Mail, Store } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";

const ROLE_DASHBOARD_MAP = {
  vendor: "/vendor",
  user: "/products",
};

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [role, setRole] = useState(""); // user | vendor
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!role) {
      toast.error("Please select User or Vendor");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/signup", {
        ...form,
        role,
      });

      const { user } = res.data.data;
      login(res.data.data);

      toast.success("Account created successfully");
      navigate(ROLE_DASHBOARD_MAP[user.role], { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        {/* ROLE SELECTOR */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`border rounded-lg p-3 flex flex-col items-center gap-1 transition
              ${
                role === "user"
                  ? "border-black bg-gray-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <FaUser size={20} />
            <span className="text-sm font-medium">User</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("vendor")}
            className={`border rounded-lg p-3 flex flex-col items-center gap-1 transition
              ${
                role === "vendor"
                  ? "border-black bg-gray-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <Store size={20} />
            <span className="text-sm font-medium">Vendor</span>
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border rounded px-3">
            <FaUser className="text-gray-400 mr-2" />
            <input
              name="name"
              placeholder="Full name"
              onChange={handleChange}
              className="w-full py-2 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded px-3">
            <Mail className="text-gray-400 mr-2" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full py-2 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded px-3">
            <FaLock className="text-gray-400 mr-2" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full py-2 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google OAuth */}
        <GoogleAuthButton role={role} />

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Signup;
