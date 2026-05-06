import React from 'react';
import { useFilterStore } from '../core/filterStore';
import { BRANDS, MIN_PRICE, MAX_PRICE } from '../core/products';
import './Sidebar.css';

const CATEGORY_FILTERS: Record<string, { key: string; label: string }[]> = {
  printers: [
    { key: 'colorPrint', label: '🎨 Кольоровий друк' },
    { key: 'wireless', label: '📶 Wi-Fi / Бездротовий' },
    { key: 'duplex', label: '↔️ Дуплекс (двосторонній)' },
    { key: 'inkjet', label: '💧 Струменевий' },
    { key: 'laser', label: '🔆 Лазерний' },
    { key: 'a3', label: '📐 Формат A3' },
  ],
  scanners: [
    { key: 'autoFeed', label: '📂 Автоподавач' },
    { key: 'portableScanner', label: '🎒 Портативний' },
  ],
  mfp: [
    { key: 'colorPrint', label: '🎨 Кольоровий друк' },
    { key: 'wireless', label: '📶 Wi-Fi / Бездротовий' },
    { key: 'duplex', label: '↔️ Дуплекс' },
    { key: 'touchScreen', label: '👆 Сенсорний екран' },
    { key: 'autoFeed', label: '📂 Автоподавач' },
    { key: 'inkjet', label: '💧 Струменевий' },
    { key: 'laser', label: '🔆 Лазерний' },
  ],
  ink: [
    { key: 'oem', label: '✅ Оригінальне' },
    { key: 'refill', label: '♻️ Сумісне / Заправне' },
  ],
  toner: [
    { key: 'oem', label: '✅ Оригінальний' },
    { key: 'refill', label: '♻️ Сумісний' },
  ],
  paper: [
    { key: 'a3', label: '📐 Формат A3' },
  ],
  shredders: [
    { key: 'crossCut', label: '✂️ Перехресне різання' },
    { key: 'autoFeed', label: '📂 Автопідавач' },
  ],
  laminators: [
    { key: 'coldLamination', label: '❄️ Холодна ламінація' },
    { key: 'a3', label: '📐 Формат A3' },
  ],
  projectors: [
    { key: 'wireless', label: '📶 Wi-Fi / Бездротовий' },
    { key: 'hd', label: '🎬 4K / Full HD' },
  ],
  plotters: [
    { key: 'colorPrint', label: '🎨 Кольоровий друк' },
    { key: 'wireless', label: '📶 Wi-Fi' },
    { key: 'wideFormat', label: '🗺️ Широкоформатний' },
  ],
};

type BoolFilterKey = 'colorPrint' | 'wireless' | 'duplex' | 'inkjet' | 'laser' | 'a3' | 'oem' | 'refill' | 'autoFeed' | 'crossCut' | 'coldLamination' | 'hd' | 'wideFormat' | 'touchScreen' | 'portableScanner';

const Sidebar: React.FC = () => {
  const { filters, toggleBrand, setPriceRange, toggleBoolFilter, resetFilters } = useFilterStore();
  const categoryFilters = filters.category !== 'all' ? CATEGORY_FILTERS[filters.category] || [] : [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Фільтри</span>
        <button className="reset-btn" onClick={resetFilters}>Скинути</button>
      </div>

      {/* Price */}
      <div className="filter-section">
        <div className="filter-label">💰 Ціна (грн)</div>
        <div className="price-inputs">
          <input
            type="number"
            className="price-input"
            value={filters.minPrice}
            min={MIN_PRICE}
            max={filters.maxPrice}
            onChange={(e) => setPriceRange(Number(e.target.value), filters.maxPrice)}
          />
          <span className="price-dash">—</span>
          <input
            type="number"
            className="price-input"
            value={filters.maxPrice}
            min={filters.minPrice}
            max={MAX_PRICE}
            onChange={(e) => setPriceRange(filters.minPrice, Number(e.target.value))}
          />
        </div>
        <input
          type="range"
          className="price-range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={filters.maxPrice}
          onChange={(e) => setPriceRange(filters.minPrice, Number(e.target.value))}
        />
      </div>

      {/* Brands */}
      <div className="filter-section">
        <div className="filter-label">🏷️ Виробник</div>
        {BRANDS.map((brand) => (
          <label key={brand} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />
            <span className="checkbox-custom" />
            {brand}
          </label>
        ))}
      </div>

      {/* Category-specific filters */}
      {categoryFilters.length > 0 && (
        <div className="filter-section">
          <div className="filter-label">⚙️ Характеристики</div>
          {categoryFilters.map(({ key, label }) => (
            <label key={key} className="checkbox-label">
              <input
                type="checkbox"
                checked={!!filters[key as keyof typeof filters]}
                onChange={() => toggleBoolFilter(key as BoolFilterKey)}
              />
              <span className="checkbox-custom" />
              {label}
            </label>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
