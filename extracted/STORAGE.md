# Sistema de Almacenamiento de Datos - AuraCore

## Persistencia Local

### Keys utilizados
- `auracore_orders` - Pedidos/cotizaciones
- `auracore_user` - Sesión de usuario
- `auracore_inventory` - Inventario de productos
- `auracore_sessions` - Historial de sesiones

### Funciones exportadas

**storage.ts:**
- `useLocalStorage<T>(key, initialValue)` - Hook React para persistencia
- `exportData()` - Exporta todos los datos como JSON
- `importData(data)` - Importa datos desde JSON
- `clearAllAppData()` - Limpia todos los datos de la app

**inventory.ts:**
- `Product` - Interfaz de producto
- `InventoryMetrics` - Métricas del inventario
- `calculateMetrics(products)` - Calcula métricas
- `getLowStockProducts(products)` - Productos bajo stock
- `getOutOfStockProducts(products)` - Productos sin stock

### Sincronización
El sistema utiliza StorageEvent para sincronizar datos entre pestañas del navegador.