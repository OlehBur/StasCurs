import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type FilterState, type ProductCategory } from '../core';
import { MIN_PRICE, MAX_PRICE } from './products';

const defaultFilters: FilterState = {
  category: 'all',
  search: '',
  brands: [],
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  colorPrint: false,
  wireless: false,
  duplex: false,
  inkjet: false,
  laser: false,
  a3: false,
  oem: false,
  refill: false,
  autoFeed: false,
  crossCut: false,
  coldLamination: false,
  hd: false,
  wideFormat: false,
  touchScreen: false,
  portableScanner: false,
  page: 1,
};

interface FilterStore {
  filters: FilterState;
  setCategory: (category: ProductCategory | 'all') => void;
  setSearch: (search: string) => void;
  toggleBrand: (brand: string) => void;
  setPriceRange: (min: number, max: number) => void;
  toggleBoolFilter: (key: keyof Omit<FilterState, 'category' | 'search' | 'brands' | 'minPrice' | 'maxPrice' | 'page'>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      setCategory: (category) =>
        set((s) => ({ filters: { ...s.filters, category, page: 1, brands: [], colorPrint: false, wireless: false, duplex: false, inkjet: false, laser: false, a3: false, oem: false, refill: false, autoFeed: false, crossCut: false, coldLamination: false, hd: false, wideFormat: false, touchScreen: false, portableScanner: false } })),
      setSearch: (search) => set((s) => ({ filters: { ...s.filters, search, page: 1 } })),
      toggleBrand: (brand) =>
        set((s) => {
          const brands = s.filters.brands.includes(brand)
            ? s.filters.brands.filter((b) => b !== brand)
            : [...s.filters.brands, brand];
          return { filters: { ...s.filters, brands, page: 1 } };
        }),
      setPriceRange: (minPrice, maxPrice) =>
        set((s) => ({ filters: { ...s.filters, minPrice, maxPrice, page: 1 } })),
      toggleBoolFilter: (key) =>
        set((s) => ({ filters: { ...s.filters, [key]: !s.filters[key], page: 1 } })),
      setPage: (page) => set((s) => ({ filters: { ...s.filters, page } })),
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    { name: 'stascurs-filters' }
  )
);
