import { useEffect, useState } from "react";
import api from "./services/api";

const PAGE_SIZE = 8;

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Debounce search input, then reset to first page and refetch.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(0);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/products", {
          params: { search, page, size: PAGE_SIZE },
        });

        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Could not load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Browse Products</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {loading ? (
        <div className="state-message">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="state-message">No products found.</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-card-top">
                <h3>{product.name}</h3>
                <span
                  className={`stock-badge ${product.stock > 0 ? "in-stock" : "out-stock"}`}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-card-bottom">
                <span className="product-price">₹{product.price}</span>
                <button
                  className="btn-primary"
                  disabled={product.stock <= 0}
                  onClick={() => addToCart(product)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            ← Prev
          </button>

          <span className="pagination-info">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
