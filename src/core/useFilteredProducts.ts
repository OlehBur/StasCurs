import { useMemo } from 'react';
import { products } from '../core/products';
import { useFilterStore } from '../core/filterStore';
import { type Product } from '../core/index.ts';

const ITEMS_PER_PAGE = 12;

export function useFilteredProducts() {
  const { filters } = useFilterStore();

  const filtered = useMemo(() => {
    let result: Product[] = [...products];

    // Shuffle only once (stable shuffle by id)
    result.sort((a, b) => {
      const ha = parseInt(a.id.replace(/\D/g, ''), 10) * 7919;
      const hb = parseInt(b.id.replace(/\D/g, ''), 10) * 7919;
      return (ha % 997) - (hb % 997);
    });

    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    const boolFilters: Array<keyof Product> = [
      'colorPrint', 'wireless', 'duplex', 'inkjet', 'laser',
      'a3', 'a4', 'a5', 'a6', 'oem', 'refill', 'isBulk', 'autoFeed', 'crossCut',
      'hds', 'coldLamination', 'hd', 'wideFormat', 'touchScreen', 'portableScanner',
      'isFlatbed', 'isCutting'
    ];

    // boolFilters.forEach((key) => {
    //   if (filters[key as keyof typeof filters]) {
    //     result = result.filter((p) => p[key] === true);
    //   }
    // });
    boolFilters.forEach((key) => {
      if (filters[key as keyof typeof filters]) {
        result = result.filter((p) => p[key as keyof Product] === true);
      }
    });

    return result;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const page = Math.min(filters.page, totalPages);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return { filtered, paginated, totalPages, page, total: filtered.length };
}
