import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scraping, setScraping] = useState(false);
  const [success, setSuccess] = useState("");

  const handleScrape = async () => {
    try {
      setScraping(true);
      setError("");

      await api(`/api/products/${slug}/scrape`, {
        method: "POST",
      });

      // Fetch updated product
      const response = await api(`/api/products/${slug}`);

      setProduct(response.data);
      setSuccess("Product updated successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setScraping(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api(`/api/products/${slug}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!product) {
    return <p className="error">Product not found</p>;
  }

  return (
    <div className="product-details">
      {success && <p className="success-message">{success}</p>}

      <div className="product-details-card">
        <div className="product-details-image">
          <img src={product.imageUrl} alt={product.title} />
        </div>

        <div className="product-details-info">
          <h1>{product.title}</h1>

          <p>
            <strong>Author:</strong> {product.author}
          </p>

          <p>
            <strong>Price:</strong> {product.price} {product.currency}
          </p>

          <p>
            <strong>Last scraped:</strong>{" "}
            {new Date(product.lastScrapedAt).toLocaleString()}
          </p>

          <button onClick={handleScrape} disabled={scraping}>
            {scraping ? "Scraping..." : "Scrape Latest Data"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
