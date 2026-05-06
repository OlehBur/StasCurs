export type ProductCategory =
  | 'printers'
  | 'scanners'
  | 'mfp'
  | 'ink'
  | 'toner'
  | 'paper'
  | 'shredders'
  | 'laminators'
  | 'projectors'
  | 'plotters';

export interface ProductTag {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  image: string;
  description: string;
  tags: ProductTag[];
  inStock: boolean;
  // Category-specific filters
  colorPrint?: boolean;
  wireless?: boolean;
  duplex?: boolean;
  inkjet?: boolean;
  laser?: boolean;
  a3?: boolean;
  oem?: boolean;
  refill?: boolean;
  sheetCapacity?: number;
  maxDpi?: number;
  touchScreen?: boolean;
  portableScanner?: boolean;
  autoFeed?: boolean;
  crossCut?: boolean;
  coldLamination?: boolean;
  hd?: boolean;
  wideFormat?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: ProductCategory | 'all';
  search: string;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  colorPrint: boolean;
  wireless: boolean;
  duplex: boolean;
  inkjet: boolean;
  laser: boolean;
  a3: boolean;
  oem: boolean;
  refill: boolean;
  autoFeed: boolean;
  crossCut: boolean;
  coldLamination: boolean;
  hd: boolean;
  wideFormat: boolean;
  touchScreen: boolean;
  portableScanner: boolean;
  page: number;
}

export const CATEGORY_LABELS: Record<ProductCategory | 'all', string> = {
  all: 'Всі товари',
  printers: 'Принтери',
  scanners: 'Сканери',
  mfp: 'БФП',
  ink: 'Чорнила',
  toner: 'Картриджі',
  paper: 'Папір',
  shredders: 'Шредери',
  laminators: 'Ламінатори',
  projectors: 'Проектори',
  plotters: 'Плотери',
};

export const CATEGORY_ICONS: Record<ProductCategory | 'all', string> = {
  all: '🗂️',
  printers: '🖨️',
  scanners: '📠',
  mfp: '⚙️',
  ink: '💧',
  toner: '🔲',
  paper: '📄',
  shredders: '✂️',
  laminators: '🪪',
  projectors: '📽️',
  plotters: '🗺️',
};
