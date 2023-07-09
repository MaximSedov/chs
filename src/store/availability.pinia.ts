import {
  cloneDeep,
  filter,
  find,
  includes,
  indexOf,
  orderBy,
  sumBy,
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
import { AvailabilityData } from '@/@types';

export type AvailabilityState = {
  data: AvailabilityData[];
  error: string | null;
  loading: boolean;
};

export const useAvailabilityStore = defineStore({
  id: 'availability',
  state: (): AvailabilityState => ({
    data: [],
    error: null,
    loading: false,
  }),
  getters: {
    getCountByProductId:
      (state) =>
      (id: number): number => {
        const filteredData = filter(state.data, { productId: id });
        const sum = sumBy(filteredData, 'count');

        return sum;
      },
  },
  actions: {
    async list(): Promise<boolean> {
      this.loading = true;

      try {
        const response = await supabase.from('availability').select('*');

        if (response.error !== null) {
          throw response.error.message;
        }

        this.data = response.data as AvailabilityData[];

        this.loading = false;
        return true;
      } catch (error) {
        console.log(error);
        this.loading = false;
        return false;
      }
    },
  },
  persist: true,
});
