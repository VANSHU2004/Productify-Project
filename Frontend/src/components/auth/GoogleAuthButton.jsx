import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { navigateToRoleDashboard } from "../../utils/navigation";

const GoogleAuthButton = ({ rememberMe = false }) => {
  const navigate = useNavigate();
  const { login, selectedRole } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      // Include selected role if available
      const requestData = {
        provider: "google",
        token: credentialResponse.credential,
      };
      
      // Add role if one is selected
      if (selectedRole) {
        requestData.role = selectedRole;
      }

      const res = await axiosInstance.post("/auth/oauth", requestData);
      const userData = res.data.data;

      // Use AuthContext login method
      login(userData);

      toast.success("Logged in with Google");
      
      // Navigate to role-appropriate dashboard
      navigateToRoleDashboard(userData.user, navigate);
    } catch (err) {
      toast.error("Google login failed");
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Google authentication failed")}
        width="100%"
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
      />
    </div>
  );
};

export default GoogleAuthButton;
