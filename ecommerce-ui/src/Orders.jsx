import { useEffect, useState } from "react";
import api from "./services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/orders/my");
        setOrders(response.data);
      } catch (err) {
        setError("Could not load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="page">
      <h2>My Orders</h2>

      {error && <div className="alert-error">{error}</div>}

      {loading ? (
        <div className="state-message">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div className="state-message">
          You haven't placed any orders yet. Go add something to your cart!
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-main">
                <h3>{order.productName || order.productId}</h3>
                <p>Quantity: {order.quantity}</p>
              </div>
              <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
