import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [selectedRole, setSelectedRoleState] = useState(null);

  const login = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    // Clear selected role after successful login since user now has an assigned role
    setSelectedRoleState(null);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setSelectedRoleState(null);
  };

  const setSelectedRole = (role) => {
    setSelectedRoleState(role);
  };

  const clearSelectedRole = () => {
    setSelectedRoleState(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      selectedRole, 
      setSelectedRole, 
      clearSelectedRole 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
