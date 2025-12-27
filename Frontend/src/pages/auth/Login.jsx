import { useState } from "react";
import { ShieldCheck, Store, User } from "lucide-react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";
import  {ROLES} from "../../utils/constants";


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (error) setError("");
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setError("Please select your role");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        ...form,
        role: selectedRole,
      });

      login(res.data.data);
      navigate(`/${selectedRole}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
     
      <section className="flex flex-col justify-center items-center w-full max-w-lg rounded shadow-lg shadow-black/30">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold w-full text-center mb-5">SIGN IN</h1>

          {/* ROLE SELECTOR */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {ROLES.map((role) => {
              const Icon = role.icon;
              const active = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`border rounded-lg p-3 flex flex-col items-center text-sm transition
                    ${active
                      ? "border-black bg-gray-100"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <Icon size={22} />
                  <span className="mt-1">{role.label}</span>
                </button>
              );
            })}
          </div>

          {error && (
            <p className="text-sm text-red-600 mb-3">{error}</p>
          )}

          <form onSubmit={submit} className="space-y-4">
            {/* Email */}
            <div className="flex items-center border rounded px-3">
              <HiOutlineMail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full py-2 outline-none"
                disabled={loading}
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center border rounded px-3">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full py-2 outline-none"
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-gray-500"
              >
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google OAuth */}
          <GoogleAuthButton />

          <p className="text-sm text-center mt-5">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
