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

import { OrderStatusEnum, ProductsModeEnum } from '@/@enums';
import { ResponseStatusEnum } from '@/@enums';
import type {
  ResponseErrorModel,
  ProductsIdsModel,
  ShortProductsModel,
  ProductEntity,
  ProductEntityCount,
  ShortUserModel,
  CartRequestData,
} from '@/@types';
import { defaultProductsIds } from '@/models';
import { supabase } from '@/lib';
import { v4 as uuidv4 } from 'uuid';

import { EntityState, useCartStore } from '@/store';
import { OrderData } from '@/@types';
import { useUserStore } from '@/store';

export type OrdersState = {
  data: OrderData[];
  error: string | null;
  loading: boolean;
};

export const useOrdersStore = defineStore({
  id: 'orders',
  state: (): OrdersState => ({
    data: [],
    error: null,
    loading: false,
  }),
  getters: {
    getOrdersList: (state) => () => {
      return state.data;
    },
  },
  actions: {
    async createOrder(userData: ShortUserModel): Promise<boolean> {
      this.loading = true;
      const userStore = useUserStore();
      const cartStore = useCartStore();
      const cartData = cartStore.data as ProductEntityCount[];
      const cost = cartStore.getCartPriceCount;
      const data = {
        products: cartData,
        address: userData.address,
        email: userData.email,
        phone: userData.phone,
        userName: userData.name,
        userId: userStore.current?.id,
        cost: cost,
      };

      try {
        const response = await supabase.from('orders').insert(data);

        if (response.error !== null) {
          throw response.error.message;
        }

        cartStore.resetCart();

        this.loading = false;
        return true;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(err); */
        this.loading = false;
        return false;
      }
    },
    async cancelOrder(orderId: number): Promise<boolean> {
      this.loading = true;

      try {
        const response = await supabase
          .from('orders')
          .update({ status: OrderStatusEnum.Canceled })
          .eq('id', orderId);

        if (response.error !== null) {
          throw response.error.message;
        }

        const index = this.data.findIndex((n) => n.id === orderId);
        if (~index) {
          this.data[index].status = OrderStatusEnum.Canceled;
        }

        this.loading = false;
        return true;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(err); */
        this.loading = false;
        return false;
      }
    },
    async ordersByUser(userId: string): Promise<boolean> {
      this.loading = true;
      this.data = [];

      try {
        const response = await supabase
          .from('orders')
          .select('*')
          .eq('userId', userId)
          .order('createdAt', { ascending: false });
        console.log(
          '🚀 ~ file: orders.pinia.ts:87 ~ ordersByUser ~ response:',
          response
        );

        if (response.error !== null) {
          throw response.error.message;
        }

        this.data = response.data as OrderData[];

        this.loading = false;
        return true;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(err); */
        this.loading = false;
        return false;
      }
    },
    async ordersList(): Promise<boolean> {
      this.loading = true;
      try {
        const response = await supabase
          .from('orders')
          .select('*')
          .order('createdAt', { ascending: false });

        if (response.error !== null) {
          throw response.error.message;
        }

        this.data = response.data as OrderData[];

        this.loading = false;
        return true;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(err); */
        this.loading = false;
        return false;
      }
    },

    async assignManagerToOrder(
      orderId: number,
      managerId: string
    ): Promise<boolean> {
      this.loading = true;

      try {
        const response = await supabase
          .from('orders')
          .update({ managerId: managerId })
          .eq('id', orderId);

        if (response.error !== null) {
          throw response.error.message;
        }

        this.loading = false;
        return true;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(err); */
        this.loading = false;
        return false;
      }
    },
    async unassignManagerFromOrder(orderId: number): Promise<boolean> {
      this.loading = true;

      try {
        const response = await supabase
          .from('orders')
          .update({ managerId: null })
          .eq('id', orderId);

        if (response.error !== null) {
          throw response.error.message;
        }

        this.loading = false;
        return true;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(err); */
        this.loading = false;
        return false;
      }
    },
    async changeOrderStatus(
      orderId: number,
      status: OrderStatusEnum
    ): Promise<boolean> {
      this.loading = true;

      try {
        const response = await supabase
          .from('orders')
          .update({ status: status })
          .eq('id', orderId);

        if (response.error !== null) {
          throw response.error.message;
        }

        this.loading = false;
        return true;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(err); */
        this.loading = false;
        return false;
      }
    },

    /* async updateProductCount(count: number, productId: number): Promise<void> {
        const index = this.data.findIndex((n) => n.data.id === productId);
        if (~index) {
          this.data[index].count = count;
        }
      }, */

    /* async removeProductFromCart(productId: number): Promise<void> {
        const index = this.data.findIndex((n) => n.data.id === productId);
        if (~index) {
          this.data.splice(index, 1);
        }
      }, */
  },
  persist: true,
});
