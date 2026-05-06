import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { useFilteredProducts } from '../core/useFilteredProducts';
import { useFilterStore } from '../core/filterStore.ts';
import { CATEGORY_LABELS } from '../core/';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { paginated, totalPages, page, total } = useFilteredProducts();
  const { filters, setPage, resetFilters } = useFilterStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePageChange = (p: number) => {
    setLoading(true);
    setTimeout(() => {
      setPage(p);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const categoryLabel = CATEGORY_LABELS[filters.category];

  return (
    <>
      {loading && <Loader />}
      <div className="home-layout">
        <Sidebar />
        <main className="main-content">
          <div className="results-bar">
            <h1 className="results-title">
              {filters.search ? `Пошук: "${filters.search}"` : categoryLabel}
            </h1>
            <span className="results-count">{total} товарів</span>
            {/* <button className="home-back-btn" onClick={() => navigate('/')}>🏠 На головну</button> */}
          </div>

          {paginated.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <p>Товарів не знайдено</p>
              <button className="reset-search-btn" onClick={resetFilters}>
                Скинути фільтри
              </button>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onPage={handlePageChange} />
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default HomePage;
