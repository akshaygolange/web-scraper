const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="product-image"
      />

      <div className="product-content">
        <h2>{product.title}</h2>

        <p>by {product.author}</p>

        <strong>£{product.price}</strong>
      </div>
    </div>
  );
};

export default ProductCard;