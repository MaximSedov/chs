import {
  cloneDeep,
  filter,
  find,
  includes,
  indexOf,
  orderBy,
  unionBy,
} from 'lodash';
import { defineStore } from 'pinia';

import type { ProductsModeEnum } from '@/@enums';
import { ResponseStatusEnum } from '@/@enums';
import type {
  ResponseErrorModel,
  ProductsIdsModel,
  ShortProductsModel,
  ProductEntity,
  ProductEntityCount,
} from '@/@types';
import { defaultProductsIds } from '@/models';
import { supabase } from '@/lib';
import { v4 as uuidv4 } from 'uuid';

import type { EntityState } from '@/store';

interface CartState extends EntityState<ProductEntityCount> {
  error: string | null;
}

export const useCartStore = defineStore({
  id: 'cart',
  state: (): CartState => ({
    data: [],
    error: null,
    loading: false,
  }),
  getters: {
    getCartList: (state) => () => {
      return state.data;
    },
    getCartPriceCount: (state): number =>
      state.data.reduce(
        (sum, product) => sum + product.data.price * product.count,
        0
      ),
  },
  actions: {
    async addProductToCart(productData: ProductEntity): Promise<void> {
      this.loading = true;

      try {
        this.data = [...this.data, { count: 1, data: productData }];

        this.loading = false;
        return;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(err); */
        this.loading = false;
        return;
      }
    },

    async updateProductCount(count: number, productId: number): Promise<void> {
      const index = this.data.findIndex((n) => n.data.id === productId);
      if (~index) {
        this.data[index].count = count;
      }
    },

    async removeProductFromCart(productId: number): Promise<void> {
      const index = this.data.findIndex((n) => n.data.id === productId);
      if (~index) {
        this.data.splice(index, 1);
      }
    },

    async resetCart(): Promise<void> {
      this.data = [];
    },
  },
  persist: true,
});
