import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { auth, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  if (!auth) return null;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/products" className="navbar-brand" onClick={closeMenu}>
          🛍️ ShopSphere
        </NavLink>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/products" className="nav-link" onClick={closeMenu}>
            Products
          </NavLink>
          <NavLink to="/orders" className="nav-link" onClick={closeMenu}>
            My Orders
          </NavLink>
          <NavLink to="/cart" className="nav-link" onClick={closeMenu}>
            Cart
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin" className="nav-link" onClick={closeMenu}>
              Admin Dashboard
            </NavLink>
          )}

          <div className="navbar-user">
            <span className="user-chip">
              {auth.name}
              <span className={`role-badge role-${auth.role.toLowerCase()}`}>
                {auth.role}
              </span>
            </span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
