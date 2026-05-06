import { type Product } from './index.ts';

export const getProductTags = (product: Product) => {
  const tags: { label: string; value: string }[] = [
    { label: 'Бренд', value: product.brand }
  ];

  if (product.laser) tags.push({ label: 'Тип', value: 'Лазерний' });
  if (product.inkjet) tags.push({ label: 'Тип', value: 'Струменевий' });
  if (product.wireless) tags.push({ label: 'Зв\'язок', value: 'Wi-Fi' });
  if (product.duplex) tags.push({ label: 'Друк', value: 'Двосторонній' });
  if (product.autoFeed) tags.push({ label: 'Подача', value: 'Автоподавач' });
  if (product.touchScreen) tags.push({ label: 'Керування', value: 'Сенсорний екран' });
  if (product.portableScanner) tags.push({ label: 'Тип', value: 'Портативний' });
  if (product.a3) tags.push({ label: 'Формат', value: 'A3' });
  if (product.a4) tags.push({ label: 'Формат', value: 'A4' });
  if (product.a5) tags.push({ label: 'Формат', value: 'A5' });
  if (product.a6) tags.push({ label: 'Формат', value: 'A6' });
  if (product.isBulk !== undefined)
    tags.push({ label: 'Тип', value: product.isBulk ? 'Флакон (СБПЧ)' : 'Картридж' });
  if (product.oem) tags.push({ label: 'Сумісність', value: 'Оригінальний' });
  if (product.refill) tags.push({ label: 'Сумісність', value: 'Сумісний / Заправний' });
  if (product.hds) tags.push({ label: 'Тип', value: 'Важкого навантаження' });
  if (product.coldLamination) tags.push({ label: 'Тип', value: 'Холодна ламінація' });
  if (product.hd) tags.push({ label: 'Роздільна здатність', value: '4K / Full HD' });
  if (product.wideFormat) tags.push({ label: 'Особливість', value: 'Широкоформатний' });
  if (product.laser) tags.push({ label: 'Джерело', value: 'Лазерне' });
  if (product.wideFormat) tags.push({ label: 'Формат', value: '16:9 / 16:10' });
  if (product.isFlatbed) tags.push({ label: 'Тип', value: 'Планшетний' });
  if (product.isCutting) tags.push({ label: 'Тип', value: 'Ріжучий' });
  return tags;
};

export const CATEGORY_PREFIXES: Record<string, string> = {
  all: 'all',
  printers: 'p0',
  plotters: 'pl',
  paper: 'pa',
  shredders: 'sh',
  ink: 'i',
  toner: 't0',
  laminators: 'l0',
  projectors: 'pr',
  scanners: 'sc', 
};