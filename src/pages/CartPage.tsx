import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../core/cartStore';
import ConfirmModal from '../components/ConfirmModal';
import { getProductTags } from '../core/utils';
import './CartPage.css';
import type { ProductTag } from '../core';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, totalItems, totalPrice } = useCartStore();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleRemoveConfirm = (id: string) => setConfirmId(id);
  const handleConfirm = () => {
    if (confirmId) removeFromCart(confirmId);
    setConfirmId(null);
  };

  return (
    <div className="cart-page">
      <div className="cart-inner">
        <div className="cart-nav">
          <button className="back-btn" onClick={() => navigate(-1)}>← Назад</button>
          <button className="back-home-btn" onClick={() => navigate('/')}>🏠 На головну</button>
        </div>

        <h1 className="cart-title">🛒 Кошик</h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="empty-icon">🛒</span>
            <p>Кошик порожній</p>
            <button className="go-shop-btn" onClick={() => navigate('/')}>До каталогу</button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-item-img"
                    onClick={() => navigate(`/product/${product.id}`)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x450?text=Фото';
                    }}
                  />
                  <div className="cart-item-info">
                    <p className="cart-item-brand">{product.brand}</p>
                    <h3
                      className="cart-item-name"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <div className="cart-item-tags">
                      {getProductTags(product).slice(0, 2).map((tag: ProductTag, i: number) => (
                        <span key={i} className="cart-item-tag">{tag.value}</span>
                      ))}
                    </div>
                    <div className="cart-item-bottom">
                      <span className="cart-item-qty">Кількість: {quantity}</span>
                      <span className="cart-item-price">
                        {(product.price * quantity).toLocaleString('uk-UA')} ₴
                      </span>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveConfirm(product.id)}
                        title="Видалити"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2 className="summary-title">Підсумок</h2>
              <div className="summary-row">
                <span>Товарів:</span>
                <span>{totalItems()} шт.</span>
              </div>
              <div className="summary-row total">
                <span>Разом:</span>
                <span>{totalPrice().toLocaleString('uk-UA')} ₴</span>
              </div>
              <button className="checkout-btn">Оформити замовлення</button>
              <button className="continue-btn" onClick={() => navigate('/')}>
                Продовжити покупки
              </button>
            </div>
          </div>
        )}
      </div>

      {confirmId && (
        <ConfirmModal
          message="Видалити товар з кошика?"
          onConfirm={handleConfirm}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
};

export default CartPage;
