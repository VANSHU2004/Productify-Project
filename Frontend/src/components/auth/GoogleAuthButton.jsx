import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { navigateToRoleDashboard } from "../../utils/navigation";

export default function GoogleAuthButton({ role }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = async ({ credential }) => {
    try {
      if (!credential) {
        toast.error("Google token missing");
        return;
      }

      const payload = {
        token: credential,
      };
      
      if (role) {
        payload.role = role;
      }

      const res = await axiosInstance.post("/auth/oauth/google", payload);
      const userData = res.data.data;

      login(userData);
      toast.success("Logged in with Google");

      navigateToRoleDashboard(userData.user, navigate);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Google login failed"
      );
    }
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Google authentication failed")}
        theme="outline"
        size="large"
        shape="rectangular"
      />
    </div>
  );
}
