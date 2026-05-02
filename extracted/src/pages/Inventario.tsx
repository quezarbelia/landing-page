import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import GlassCard from '../components/GlassCard';
import { useLocalStorage } from '../lib/storage';
import { 
  Product, 
  InventoryMetrics, 
  DEFAULT_CATEGORIES,
  generateProductId,
  generateSku,
  calculateMetrics
} from '../lib/inventory';
import { cn } from '../lib/utils';

const STORAGE_KEY = 'auracore_inventory';

interface InventoryState {
  products: Product[];
  categories: InventoryCategory[];
}

interface InventoryCategory {
  id: string;
  name: string;
  description: string;
}

const initialInventory: InventoryState = {
  products: [],
  categories: DEFAULT_CATEGORIES,
};

export default function Inventario() {
  const [inventory, setInventory, clearInventory] = useLocalStorage<InventoryState>(STORAGE_KEY, initialInventory);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    minStock: 5,
  });

  const metrics: InventoryMetrics = calculateMetrics(inventory.products);

  const filteredProducts = inventory.products.filter(p => {
    if (filter === 'low') return p.quantity > 0 && p.quantity <= p.minStock;
    if (filter === 'out') return p.quantity === 0;
    return true;
  }).filter(p => 
    searchTerm === '' || 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      const updated = inventory.products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, updatedAt: new Date().toISOString() }
          : p
      );
      setInventory({ ...inventory, products: updated });
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        id: generateProductId(),
        sku: generateSku(),
        name: formData.name,
        category: formData.category,
        quantity: formData.quantity,
        price: formData.price,
        minStock: formData.minStock,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setInventory({ 
        ...inventory, 
        products: [...inventory.products, newProduct] 
      });
    }
    
    setShowForm(false);
    setFormData({ name: '', category: '', quantity: 0, price: 0, minStock: 5 });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
      minStock: product.minStock,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const filtered = inventory.products.filter(p => p.id !== id);
    setInventory({ ...inventory, products: filtered });
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const updated = inventory.products.map(p => {
      if (p.id === id) {
        const newQty = Math.max(0, p.quantity + delta);
        return { ...p, quantity: newQty, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    setInventory({ ...inventory, products: updated });
  };

  return (
    <main className="relative pt-32 overflow-hidden pb-32 min-h-screen">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
            Gestión de Inventario
          </h1>
          <p className="text-on-surface-variant text-lg">
            Controla tu stock y productos en tiempo real
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-4 text-center">
            <p className="text-xs uppercase text-on-surface-variant">Total Productos</p>
            <p className="text-2xl font-bold text-primary">{metrics.totalProducts}</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-xs uppercase text-on-surface-variant">Valor Total</p>
            <p className="text-2xl font-bold text-secondary">${metrics.totalValue.toLocaleString()}</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-xs uppercase text-on-surface-variant">Stock Bajo</p>
            <p className="text-2xl font-bold text-yellow-400">{metrics.lowStockCount}</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-xs uppercase text-on-surface-variant">Sin Stock</p>
            <p className="text-2xl font-bold text-error">{metrics.outOfStockCount}</p>
          </GlassCard>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre o SKU..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-surface/50 border border-sky-300/10 rounded-xl text-on-surface focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={cn("px-4 py-2 rounded-lg text-sm font-medium", filter === 'all' ? "bg-primary text-slate-900" : "bg-surface/50 text-on-surface")}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('low')}
              className={cn("px-4 py-2 rounded-lg text-sm font-medium", filter === 'low' ? "bg-yellow-400 text-slate-900" : "bg-surface/50 text-on-surface")}
            >
              Stock Bajo
            </button>
            <button
              onClick={() => setFilter('out')}
              className={cn("px-4 py-2 rounded-lg text-sm font-medium", filter === 'out' ? "bg-error text-white" : "bg-surface/50 text-on-surface")}
            >
              Sin Stock
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setShowForm(true); setEditingProduct(null); setFormData({ name: '', category: '', quantity: 0, price: 0, minStock: 5 }); }}
            className="px-6 py-3 bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20"
          >
            + Nuevo Producto
          </motion.button>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={e => e.stopPropagation()}
              className="bg-slate-900 border border-sky-300/10 rounded-2xl p-6 max-w-lg w-full"
            >
              <h2 className="text-2xl font-bold mb-6 text-on-surface">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Nombre *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-surface/50 border border-sky-300/10 rounded-xl text-on-surface focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Categoría *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-surface/50 border border-sky-300/10 rounded-xl text-on-surface focus:border-primary focus:outline-none"
                  >
                    <option value="">Selecciona...</option>
                    {inventory.categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">Cantidad</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.quantity}
                      onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 bg-surface/50 border border-sky-300/10 rounded-xl text-on-surface focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">Precio</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                      className="w-full px-4 py-3 bg-surface/50 border border-sky-300/10 rounded-xl text-on-surface focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Stock Mínimo</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minStock}
                    onChange={e => setFormData({...formData, minStock: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 bg-surface/50 border border-sky-300/10 rounded-xl text-on-surface focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 py-3 bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20"
                  >
                    {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-surface/50 border border-sky-300/10 text-on-surface font-semibold rounded-xl"
                  >
                    Cancelar
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Products Table */}
        {filteredProducts.length === 0 ? (
          <GlassCard>
            <p className="text-on-surface-variant text-center py-8">
              No hay productos en el inventario. ¡Añade tu primer producto!
            </p>
          </GlassCard>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sky-300/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-on-surface-variant">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-on-surface-variant">Producto</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-on-surface-variant">Categoría</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-on-surface-variant">Cantidad</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-on-surface-variant">Precio</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-on-surface-variant">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, idx) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-sky-300/5 hover:bg-white/5"
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-primary">{product.sku}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-on-surface">{product.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-on-surface-variant">{product.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="w-8 h-8 rounded-lg bg-surface/50 text-on-surface hover:bg-primary/20 hover:text-primary"
                        >
                          -
                        </button>
                        <span className={cn(
                          "w-12 text-center font-bold",
                          product.quantity === 0 ? "text-error" :
                          product.quantity <= product.minStock ? "text-yellow-400" : "text-primary"
                        )}>
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="w-8 h-8 rounded-lg bg-surface/50 text-on-surface hover:bg-primary/20 hover:text-primary"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-on-surface">${product.price.toFixed(2)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="px-3 py-1 text-sm bg-surface/50 text-on-surface-variant hover:text-primary rounded-lg"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1 text-sm bg-surface/50 text-on-surface-variant hover:text-error rounded-lg"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}