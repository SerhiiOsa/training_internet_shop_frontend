import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import ProductPage from './pages/ProductPage';
import Shop from './pages/Shop';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
];

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    Component: ProductPage
  },
];