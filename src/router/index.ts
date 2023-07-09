import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAppState } from '@/helpers';

declare module 'vue-router' {
  interface RouteMeta {
    isActive?: boolean;
  }
}
export const ROUTES_NAME = {
  HOME: 'Home',
  LOGIN: 'Login',
  USERS: 'Users',
  USER_BY_ID: 'UserById',
  NOT_FOUND: 'NotFound',
  ADMIN: 'Admin',
  ADMIN_USERS: 'AdminUsers',
  ADMIN_PRODUCTS: 'AdminProducts',
  ABOUT: 'About',
  CONTACTS: 'Contacts',
  WARRANTY: 'Warranty',
  DILIVERY: 'Dilivery',
  CART: 'Cart',
  ORDERS: 'Orders',
  ADMIN_ORDERS: 'AdminOrders',
  PARTS: 'Parts',
  CATALOG: 'Catalog',
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTES_NAME.HOME,
    component: () => import('@/views/HomePage.vue'),
    meta: { layout: 'LayoutMain' },
  },
  {
    path: '/about',
    name: ROUTES_NAME.ABOUT,
    component: () => import('@/views/AboutCompanyPage.vue'),
    meta: { layout: 'LayoutMain' },
  },
  {
    path: '/catalog',
    name: ROUTES_NAME.CATALOG,
    component: () => import('@/views/CatalogPage.vue'),
    meta: { layout: 'LayoutMain' },
  },
  {
    path: '/contacts',
    name: ROUTES_NAME.CONTACTS,
    component: () => import('@/views/AboutContactsPage.vue'),
    meta: { layout: 'LayoutMain' },
  },
  {
    path: '/warranty',
    name: ROUTES_NAME.WARRANTY,
    component: () => import('@/views/AboutWarrantyPage.vue'),
    meta: { layout: 'LayoutMain' },
  },
  {
    path: '/dilivery',
    name: ROUTES_NAME.DILIVERY,
    component: () => import('@/views/AboutDiliveryPage.vue'),
    meta: { layout: 'LayoutMain' },
  },
  {
    path: '/cart',
    name: ROUTES_NAME.CART,
    component: () => import('@/views/CartPage.vue'),
    meta: { layout: 'LayoutMain' },
  },
  {
    path: '/orders',
    name: ROUTES_NAME.ORDERS,
    component: () => import('@/views/OrdersPage.vue'),
    meta: { layout: 'LayoutMain' },
  },
  {
    path: '/parts',
    name: ROUTES_NAME.PARTS,
    component: () => import('@/views/PartsPage.vue'),
    meta: { layout: 'LayoutMain' },
  },
  {
    path: '/login',
    name: ROUTES_NAME.LOGIN,
    component: () => import('@/views/LoginPage.vue'),
    meta: { layout: 'LayoutDefault' },
  },
  {
    path: '/admin',
    name: ROUTES_NAME.ADMIN,
    component: () => import('@/views/admin/AdminPage.vue'),
    meta: { layout: 'LayoutAdmin' },
  },
  {
    path: '/admin/users',
    name: ROUTES_NAME.ADMIN_USERS,
    component: () => import('@/views/admin/AdminUsersPage.vue'),
    meta: { layout: 'LayoutAdmin' },
  },
  {
    path: '/admin/products',
    name: ROUTES_NAME.ADMIN_PRODUCTS,
    component: () => import('@/views/admin/AdminProductsPage.vue'),
    meta: { layout: 'LayoutAdmin' },
  },
  {
    path: '/admin/orders',
    name: ROUTES_NAME.ADMIN_ORDERS,
    component: () => import('@/views/admin/AdminOrdersPage.vue'),
    meta: { layout: 'LayoutAdmin' },
  },
  /* {
    path: '/user/:id',
    name: ROUTES_NAME.USER_BY_ID,
    component: () => import('@/views/Users/UserPage.vue'),
  },
  
  {
    path: '/:pathMatch(.*)*',
    name: ROUTES_NAME.NOT_FOUND,
    component: () => import('@/views/Common/NotFound.vue'),
  }, */
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeResolve(async (to, from, next) => {
  const appState = useAppState();
  const isValid = await appState.isValidToken();

  if (to.name !== ROUTES_NAME.LOGIN && !isValid) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
