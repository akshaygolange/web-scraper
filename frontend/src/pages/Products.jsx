import { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const [appliedPrice, setAppliedPrice] = useState({
    min: "",
    max: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (sort) {
          params.append("sort", sort);
        }

        if (search) {
          params.append("search", search);
        }

        if (appliedPrice.min) {
          params.append("minPrice", appliedPrice.min);
        }

        if (appliedPrice.max) {
          params.append("maxPrice", appliedPrice.max);
        }

        params.append("page", page);
        params.append("limit", 5);

        const response = await api(`/api/products?${params.toString()}`);

        setProducts(response.data);
        setPagination(response.pagination);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 500);

    return () => clearTimeout(timer);
  }, [search, appliedPrice, sort, page]);

  return (
    <div className="products-page">
      <h1>Products</h1>

      <div className="products-controls">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className="price-filter">
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Default</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>

          <button
            onClick={() => {
              setAppliedPrice({
                min: minPrice,
                max: maxPrice,
              });
              setPage(1);
            }}
          >
            Apply
          </button>

          <button
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
              setAppliedPrice({
                min: "",
                max: "",
              });
              setPage(1);
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {loading && <p className="loading">Loading products...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="no-results">No products found.</p>
      )}

      {!loading && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product.slug}`}
              className="product-link"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}

      {!loading && pagination.totalPages > 0 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
