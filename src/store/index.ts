import type { _ActionsTree, _GettersTree, Store } from 'pinia';
import { createPinia } from 'pinia';
import PiniaLogger from 'pinia-logger';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export interface BaseState<T> {
  data: T | null;
  errors: [];
  loading: boolean;
}

export interface EntityState<T> {
  data: T[];
  error: string | null;
  loading: boolean;
}

const stores: Store[] = [];

export const pinia = createPinia()
  .use(
    PiniaLogger({
      showDuration: true,
    })
  )
  .use(piniaPluginPersistedstate)
  .use(({ store }) => {
    stores.push(store);
  });

export const resetAllStores = (): void => {
  console.log(stores);
  stores.forEach((store) => {
    store.$reset();
  });
};

export * from './app.pinia';
export * from './user.pinia';
export * from './product.pinia';
export * from './cart.pinia';
export * from './orders.pinia';
export * from './availability.pinia';
