import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product } from '../core/index.ts';
import { useCartStore } from '../core/cartStore';
import './ProductCard.css';
import { getProductTags } from '../core/utils.ts';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="card-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="card-img"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://ceholder.com/400x300?text=Фото';
          }}
        />
        {!product.inStock && (
          <div className="out-of-stock-badge">Немає в наявності</div>
        )}
      </div>

      <div className="card-body">
        <p className="card-brand">{product.brand}</p>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-tags">
          {getProductTags(product).slice(0, 2).map((tag, i) => (
            <span key={i} className="card-tag">{tag.value}</span>
          ))}
        </div>
        <div className="card-footer">
          <span className="card-price">{product.price.toLocaleString('uk-UA')} ₴</span>
          <button
            className={`add-cart-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            title="Додати в кошик"
          >
            {added ? '✓' : '🛒'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
