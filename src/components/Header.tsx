import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCartStore } from '../core/cartStore';
import { useFilterStore } from '../core/filterStore';
import { CATEGORY_LABELS, CATEGORY_ICONS, type ProductCategory } from '../core/';
import './Header.css';

const CATEGORIES = Object.keys(CATEGORY_LABELS).filter((k) => k !== 'all') as ProductCategory[];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());
  const { filters, setSearch, setCategory } = useFilterStore();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [searchVal, setSearchVal] = useState(filters.search);
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(e.target as Node)) {
        setCatalogOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchVal);
    if (location.pathname !== '/') navigate('/');
  };

  const handleCategoryClick = (cat: ProductCategory | 'all') => {
    setCategory(cat);
    setCatalogOpen(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-inner">
        <button className="logo" onClick={() => { setCategory('all'); navigate('/'); }}>
          <span className="logo-icon">🖨️</span>
          <span className="logo-text">СтасКурс</span>
          <span className="logo-sub">Оргтехніка</span>
        </button>

        <div className="header-center">
          <div className="catalog-wrap" ref={catalogRef}>
            <button
              className={`catalog-btn ${catalogOpen ? 'open' : ''}`}
              onClick={() => setCatalogOpen((v) => !v)}
            >
              <span className="catalog-icon">{catalogOpen ? '✕' : '☰'}</span>
              Каталог
              <span className={`catalog-arrow ${catalogOpen ? 'up' : ''}`}>▾</span>
            </button>

            {catalogOpen && (
              <div className="catalog-dropdown">
                <button
                  className="catalog-item all-item"
                  onClick={() => handleCategoryClick('all')}
                >
                  <span>{CATEGORY_ICONS['all']}</span>
                  {CATEGORY_LABELS['all']}
                </button>
                <div className="catalog-grid">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={`catalog-item ${filters.category === cat ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(cat)}
                    >
                      <span className="cat-emoji">{CATEGORY_ICONS[cat]}</span>
                      {CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              className="search-input"
              type="text"
              placeholder="Пошук товарів..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button className="search-btn" type="submit">🔍</button>
          </form>
        </div>

        <button className="cart-btn" onClick={() => navigate('/cart')}>
          <span className="cart-icon">🛒</span>
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          <span className="cart-label">Кошик</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
