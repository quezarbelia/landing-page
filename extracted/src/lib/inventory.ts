export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  minStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryCategory {
  id: string;
  name: string;
  description: string;
}

export interface InventoryMetrics {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export const DEFAULT_CATEGORIES: InventoryCategory[] = [
  { id: 'cat-1', name: 'Electrónica', description: 'Dispositivos y componentes electrónicos' },
  { id: 'cat-2', name: 'Accesorios', description: 'Accesorios y periféricos' },
  { id: 'cat-3', name: 'Servicios', description: 'Servicios digitales y consultoría' },
];

export function generateProductId(): string {
  return 'PROD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function generateSku(): string {
  const prefix = ['ELEC', 'ACC', 'SERV'][Math.floor(Math.random() * 3)];
  return prefix + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

export function calculateMetrics(products: Product[]): InventoryMetrics {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const lowStockCount = products.filter(p => p.quantity > 0 && p.quantity <= p.minStock).length;
  const outOfStockCount = products.filter(p => p.quantity === 0).length;
  
  return { totalProducts, totalValue, lowStockCount, outOfStockCount };
}

export function getLowStockProducts(products: Product[]): Product[] {
  return products.filter(p => p.quantity <= p.minStock);
}

export function getOutOfStockProducts(products: Product[]): Product[] {
  return products.filter(p => p.quantity === 0);
}