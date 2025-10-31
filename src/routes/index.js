// El archivo index.js en la carpeta routes sirve como un punto central para importar y exportar todas las rutas de la aplicación.
import productRoutes from './product.routes.js';
import userRoutes from './user.routes.js';
// import orderRoutes from './orders.js';

const routes = [
  productRoutes,
  userRoutes,
  // orderRoutes
]

export default routes;
