import { describe, test, expect } from '@jest/globals';
import { getProductTags } from './core/utils';
import { getPriceRangeByCategory } from './core/products'; 

describe('Unit Testing: Core Utilities', () => {

  test('should return correct tags for printer category', () => {
    const mockPrinter = {
      id: 'p001',
      category: 'printers',
      brand: 'Canon',
      colorPrint: true,
      wireless: true,
      inkjet: true,
      price: 5000
    };
    
    const tags = getProductTags(mockPrinter as any);

    expect(tags).toContainEqual({ label: 'Бренд', value: 'Canon' });
    expect(tags).toContainEqual({ label: 'Тип', value: 'Струменевий' });
    expect(tags).toContainEqual({ label: 'Зв\'язок', value: 'Wi-Fi' });
  });

  test('should calculate price range correctly by prefix', () => {
    const range = getPriceRangeByCategory('p0');
    expect(range.min).toBeLessThanOrEqual(range.max);
    expect(typeof range.min).toBe('number');
  });
});