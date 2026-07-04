import { useEffect, useState } from "react";
import api from "./services/api";

const PAGE_SIZE = 6;
const EMPTY_FORM = { name: "", description: "", price: "", stock: "" };

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/products", {
        params: { page, size: PAGE_SIZE },
      });
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Could not load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormError("");
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.description.trim()) {
      setFormError("Name and description are required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock, 10) || 0,
    };

    setSaving(true);

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post("/products", payload);
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Could not save product. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete product.");
    }
  };

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <p className="page-subtitle">Manage your product catalog</p>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Update Product" : "Add New Product"}</h3>

        {formError && <div className="alert-error">{formError}</div>}

        <div className="admin-form-grid">
          <label className="form-field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Price (₹)</span>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Stock</span>
            <input
              type="number"
              name="stock"
              min="0"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field form-field-wide">
            <span>Description</span>
            <textarea
              name="description"
              rows="2"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="admin-list-heading">Existing Products</h3>

      {error && <div className="alert-error">{error}</div>}

      {loading ? (
        <div className="state-message">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="state-message">No products yet. Add your first one above.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td className="admin-desc-cell">{product.description}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td className="admin-actions-cell">
                    <button className="btn-secondary" onClick={() => startEdit(product)}>
                      Edit
                    </button>
                    <button className="btn-danger" onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
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

export default AdminDashboard;
