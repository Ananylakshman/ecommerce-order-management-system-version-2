import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function readStoredAuth() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  return {
    token,
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    role: localStorage.getItem("role") || "USER",
  };
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);

  const login = ({ token, name, email, role }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    setAuth({ token, name, email, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("cart");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAdmin: auth?.role === "ADMIN" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
