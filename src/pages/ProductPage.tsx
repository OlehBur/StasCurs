import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../core/products';
import { useCartStore } from '../core/cartStore';
import './ProductPage.css';
import { getProductTags } from '../core/utils';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);
  const cartItems = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.totalItems());
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Товар не знайдено</h2>
        <button onClick={() => navigate('/')}>← На головну</button>
      </div>
    );
  }

  const inCart = cartItems.find((i) => i.product.id === product.id);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };


  return (
    <div className="product-page">
      <div className="product-page-inner">
        {/* Nav bar */}
        <div className="product-nav">
          <button className="back-btn" onClick={() => navigate(-1)}>← Назад</button>
          <button className="back-home-btn" onClick={() => navigate('/')}>🏠 На головну</button>
          <button className="nav-cart-btn" onClick={() => navigate('/cart')}>
            🛒 Кошик
            {totalItems > 0 && <span className="nav-cart-badge">{totalItems}</span>}
          </button>
        </div>

        <div className="product-layout">
          {/* Image */}
          <div className="product-img-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x450?text=Фото';
              }}
            />
            {!product.inStock && (
              <div className="product-out-badge">Немає в наявності</div>
            )}
          </div>

          {/* Info */}
          <div className="product-info">
            <p className="product-brand">{product.brand}</p>
            <h1 className="product-name">{product.name}</h1>

            {/* Tags */}
            <div className="product-tags">
              {getProductTags(product).map((tag, i) => (
                <span key={i} className="product-tag">
                  <span className="tag-label">{tag.label}:</span>
                  <span className="tag-value">{tag.value}</span>
                </span>
              ))}
            </div>

            <div className="product-price-row">
              <span className="product-price">{product.price.toLocaleString('uk-UA')} ₴</span>
              {inCart && (
                <span className="in-cart-hint">✓ У кошику: {inCart.quantity} шт.</span>
              )}
            </div>

            <button
              className={`add-to-cart-big ${added ? 'added' : ''}`}
              onClick={handleAdd}
              disabled={!product.inStock}
            >
              {added ? '✓ Додано!' : '🛒 Додати в кошик'}
            </button>

            {/* Description */}
            <div className="product-desc">
              <h3 className="desc-title">Опис</h3>
              <p className="desc-text">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
