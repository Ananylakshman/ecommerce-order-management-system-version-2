import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";
import Orders from "./Orders";
import Cart from "./Cart";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

function AppRoutes() {
  const { auth } = useAuth();

  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-content">
        <Routes>
          <Route
            path="/login"
            element={auth ? <Navigate to="/products" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={auth ? <Navigate to="/products" replace /> : <Register />}
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
