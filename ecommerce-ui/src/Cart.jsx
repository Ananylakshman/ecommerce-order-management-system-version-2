import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const checkout = async () => {
    setError("");
    setCheckingOut(true);

    try {
      for (const item of cartItems) {
        await api.post("/orders", {
          productId: item.id,
          quantity: 1,
        });
      }

      localStorage.removeItem("cart");
      setCartItems([]);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      setError(
        err.response?.data?.message || "Checkout failed. Please try again."
      );
    } finally {
      setCheckingOut(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page">
      <h2>Your Cart</h2>

      {error && <div className="alert-error">{error}</div>}

      {cartItems.length === 0 ? (
        <div className="state-message">Your cart is empty.</div>
      ) : (
        <>
          <div className="product-grid">
            {cartItems.map((item, index) => (
              <div className="product-card" key={index}>
                <div className="product-card-top">
                  <h3>{item.name}</h3>
                </div>
                <p className="product-description">{item.description}</p>
                <div className="product-card-bottom">
                  <span className="product-price">₹{item.price}</span>
                  <button className="btn-danger" onClick={() => removeFromCart(index)}>
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <span>
              Total: <strong>₹{total}</strong>
            </span>
            <button className="btn-primary" onClick={checkout} disabled={checkingOut}>
              {checkingOut ? "Placing Order..." : "✅ Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
