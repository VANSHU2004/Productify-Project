import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";

const ROLE_DASHBOARD_MAP = {
  admin: "/admin",
  vendor: "/vendor",
  user: "/products",
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);
      const { user } = res.data.data;

      login(res.data.data);
      toast.success("Login successful");

      navigate(ROLE_DASHBOARD_MAP[user.role], { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <form onSubmit={submit} className="space-y-4">
          <div className="flex items-center border rounded px-3">
            <HiOutlineMail className="text-gray-400 mr-2" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full py-2 outline-none"
              required
            />
          </div>

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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <GoogleAuthButton />

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
