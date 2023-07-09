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

import { ProductTypeEnum, ProductsModeEnum } from '@/@enums';
import { ResponseStatusEnum } from '@/@enums';
import type {
  ResponseErrorModel,
  ProductsIdsModel,
  ProductEntity,
  ShortProductsModel,
} from '@/@types';
import { defaultProductsIds } from '@/models';
import { supabase } from '@/lib';
import { v4 as uuidv4 } from 'uuid';

import type { EntityState } from '@/store';

interface ProductState extends EntityState<ProductEntity> {
  error: string | null;
  productsIds: ProductsIdsModel;
}

export const useProductStore = defineStore({
  id: 'product',
  state: (): ProductState => ({
    data: [],
    error: null,
    loading: false,
    productsIds: cloneDeep(defaultProductsIds),
  }),
  getters: {
    /* getId: (state): number => state.current?.id ?? 0, */
    /* getErrors:
        (state) =>
        (type: string): string[] => {
          let _errors: string[] = [];
          state.errors
            .filter((f: ErrorMessageModel) => f.key === type)
            .forEach(function (m: ErrorMessageModel) {
              _errors = [..._errors, ...m.errors];
            });
          return _errors;
        }, */
    /* getUserProfile:
        (state) =>
        (id: number): UserEntity => {
          const index = state.data.findIndex(
            (user: UserEntity) => user.id === id
          );
  
          if (~index) {
            return state.data[index];
          }
          return cloneDeep(defaultUser);
        }, */
    /* getProductsPage:
        (state) =>
        (withoutCurrent?: boolean): ShortProductsModel => {
          const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
          const data = orderBy(state.data, (obj) =>
            indexOf(state.productsIds.usersPage.ids, obj.id)
          );
          result.data = withoutCurrent
            ? filter(
                data,
                (obj) =>
                  includes(state.productsIds.usersPage.ids, obj.id) &&
                  obj.id !== state.current?.id
              )
            : filter(data, (obj) =>
                includes(state.productsIds.usersPage.ids, obj.id)
              );
          result.loadMoreUrl = state.productsIds.usersPage.loadMoreUrl;
          return result;
        }, */
    getProductsList: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.list.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.list.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.list.loadMoreUrl;
      return result;
    },
    getProductsNewest: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.newest.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.newest.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.newest.loadMoreUrl;
      return result;
    },
    getProductsCPU: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.CPU.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.CPU.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.CPU.loadMoreUrl;
      return result;
    },
    getProductsRAM: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.RAM.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.RAM.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.RAM.loadMoreUrl;
      return result;
    },
    getProductsCASE: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.CASE.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.CASE.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.CASE.loadMoreUrl;
      return result;
    },
    getProductsGPU: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.GPU.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.GPU.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.GPU.loadMoreUrl;
      return result;
    },
    getProductsMOTHERBOARDS: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.MOTHERBOARD.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.MOTHERBOARD.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.MOTHERBOARD.loadMoreUrl;
      return result;
    },
    getProductsSSD: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.SSD.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.SSD.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.SSD.loadMoreUrl;
      return result;
    },
    getProductsHDD: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.HDD.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.HDD.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.HDD.loadMoreUrl;
      return result;
    },
    getProductsCOOLER: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.COOLER.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.COOLER.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.COOLER.loadMoreUrl;
      return result;
    },
    getProductsPOWERSUPPLY: (state) => (): ShortProductsModel => {
      const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
      const data = orderBy(state.data, (obj) =>
        indexOf(state.productsIds.POWERSUPPLY.ids, obj.id)
      );
      result.data = filter(data, (obj) =>
        includes(state.productsIds.POWERSUPPLY.ids, obj.id)
      );
      result.loadMoreUrl = state.productsIds.POWERSUPPLY.loadMoreUrl;
      return result;
    },
    /* getProductsChosen:
      (state) =>
      (mode: UsersModeEnum): ShortProductsModel => {
        const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
        if (mode === UsersModeEnum.ChosenMentions) {
          const data = orderBy(state.data, (obj) =>
            indexOf(state.productsIds.chosen.mentions.ids, obj.id)
          );
          result.data = filter(data, (obj) =>
            includes(state.productsIds.chosen.mentions.ids, obj.id)
          );
          result.loadMoreUrl = state.productsIds.chosen.mentions.loadMoreUrl;
        } else {
          const data = orderBy(state.data, (obj) =>
            indexOf(state.productsIds.chosen.others.ids, obj.id)
          );
          result.data = filter(data, (obj) =>
            includes(state.productsIds.chosen.others.ids, obj.id)
          );
          result.loadMoreUrl = state.productsIds.chosen.others.loadMoreUrl;
        }
        return result;
      }, */
    /* getProductsFromGroupId:
      (state) =>
      (groupId: number | null): ShortProductsModel => {
        const index = state.productsIds.groups.findIndex(
          (n) => n.groupId === groupId
        );
        const result = { data: [], loadMoreUrl: null } as ShortProductsModel;
        if (~index) {
          const data = orderBy(state.data, (obj) =>
            indexOf(state.productsIds.groups[index].ids, obj.id)
          );
          result.data = filter(data, (obj) =>
            includes(state.productsIds.groups[index].ids, obj.id)
          );
          result.loadMoreUrl = state.productsIds.groups[index].loadMoreUrl;
          return result;
        } else {
          return result;
        }
      }, */
    /* getLoadMoreUrl:
      (state) =>
      (
        mode: UsersModeEnum,
        userId?: number | null,
        groupId?: number | null
      ): string | null => {
        let url = null as null | string;

        switch (mode) {
          case UsersModeEnum.List:
            {
              url = state.productsIds.list.loadMoreUrl;
            }
            break;

          case UsersModeEnum.ByGroup:
            {
              const index = state.productsIds.groups.findIndex(
                (n) => n.groupId === groupId
              );
              if (~index) {
                url = state.productsIds.groups[index].loadMoreUrl;
              }
            }

            break;
        }

        return url;
      }, */
  },
  actions: {
    async list(): Promise<void> {
      this.error = null;
      this.loading = true;

      try {
        /*  id, productSKU, image, productModel, productLine, createdAt, price, isAvailable, */
        const response = await supabase
          .from('products')
          .select(
            `*, manufacture (id, title), type (id, title), category (id, title), productGPUCoreManufacture (id, title)`
          );

        if (response.error !== null) {
          throw response.error.message;
        }

        if (response.data) {
          this.data = mergeById(
            this.data,
            response.data as ProductEntity[] | any
          );
          this.productsIds.list.ids = response.data.map((n) => n.id);
          /* this.productsIds.list.loadMoreUrl = loadMoreUrl; */
        }
        this.loading = false;
        return;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(err); */
        this.loading = false;
        return;
      }
    },

    async newest(mode: ProductsModeEnum): Promise<void> {
      this.error = null;
      this.loading = true;

      try {
        const response = await supabase
          .from('products')
          .select(
            `id, productSKU, image, productModel, productLine, createdAt, price, isAvailable, manufacture (id, title), type (id, title), category (id, title), productGPUCoreManufacture (id, title)`
          );

        if (response.error !== null) {
          throw response.error.message;
        }

        if (response.data) {
          this.data = mergeById(
            this.data,
            response.data as ProductEntity[] | any
          );
          this.productsIds.newest.ids = response.data.map((n) => n.id);
          /* this.productsIds.list.loadMoreUrl = loadMoreUrl; */
        }
        this.loading = false;
        return;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(err); */
        this.loading = false;
        return;
      }
    },

    async CPU(): Promise<void> {
      this.error = null;
      this.loading = true;

      try {
        const response = await supabase
          .from('products')
          .select(
            `*, manufacture (id, title), type (id, title), category (id, title), productGPUCoreManufacture (id, title)`
          )
          .eq('type', ProductTypeEnum.CPU);

        if (response.error !== null) {
          throw response.error.message;
        }

        if (response.data) {
          this.data = mergeById(
            this.data,
            response.data as ProductEntity[] | any
          );
          this.productsIds.CPU.ids = response.data.map((n) => n.id);
        }
        this.loading = false;
        return;
      } catch (error) {
        console.log(error);
        this.loading = false;
        return;
      }
    },

    async GPU(): Promise<void> {
      this.error = null;
      this.loading = true;

      try {
        const response = await supabase
          .from('products')
          .select(
            `*, manufacture (id, title), type (id, title), category (id, title), productGPUCoreManufacture (id, title)`
          )
          .eq('type', ProductTypeEnum.GPU);

        if (response.error !== null) {
          throw response.error.message;
        }

        if (response.data) {
          this.data = mergeById(
            this.data,
            response.data as ProductEntity[] | any
          );
          this.productsIds.GPU.ids = response.data.map((n) => n.id);
        }
        this.loading = false;
        return;
      } catch (error) {
        console.log(error);
        this.loading = false;
        return;
      }
    },

    async productsByCategory(category: ProductTypeEnum): Promise<void> {
      this.error = null;
      this.loading = true;

      console.log(category);

      try {
        const response = await supabase
          .from('products')
          .select(
            `*, manufacture (id, title), type (id, title), category (id, title), productGPUCoreManufacture (id, title)`
          )
          .eq('type', category);

        if (response.error !== null) {
          throw response.error.message;
        }

        if (response.data) {
          this.data = mergeById(
            this.data,
            response.data as ProductEntity[] | any
          );
          switch (category) {
            case ProductTypeEnum.CPU:
              this.productsIds.CPU.ids = response.data.map((n) => n.id);
              break;
            case ProductTypeEnum.Case:
              this.productsIds.CASE.ids = response.data.map((n) => n.id);
              break;
            case ProductTypeEnum.Cooler:
              this.productsIds.COOLER.ids = response.data.map((n) => n.id);
              break;
            case ProductTypeEnum.GPU:
              this.productsIds.GPU.ids = response.data.map((n) => n.id);
              break;
            case ProductTypeEnum.HDD:
              this.productsIds.HDD.ids = response.data.map((n) => n.id);
              break;
            case ProductTypeEnum.Motherboard:
              this.productsIds.MOTHERBOARD.ids = response.data.map((n) => n.id);
              break;
            case ProductTypeEnum.PowerSupply:
              this.productsIds.POWERSUPPLY.ids = response.data.map((n) => n.id);
              break;
            case ProductTypeEnum.RAM:
              this.productsIds.RAM.ids = response.data.map((n) => n.id);
              break;
            case ProductTypeEnum.SSD:
              this.productsIds.SSD.ids = response.data.map((n) => n.id);
              break;
          }
        }
        this.loading = false;
        return;
      } catch (error) {
        console.log(error);
        this.loading = false;
        return;
      }
    },

    async addNewProduct(productData: any): Promise<boolean> {
      this.error = null;
      this.loading = true;

      try {
        const response = await supabase.from('products').insert(productData);

        if (response.error !== null) {
          throw response.error.message;
        }

        if (response.data) {
          this.data = mergeById(
            this.data,
            response.data as ProductEntity[] | any
          );
          /* this.productsIds.list.ids = response.data.map((n) => n.id); */
        }
        this.loading = false;
        return true;
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(error); */
        this.loading = false;
        return false;
      }
    },

    async uploadFile(file: File | any): Promise<string | undefined> {
      this.error = null;

      try {
        const uuid = uuidv4();
        const fileExt = file.name.split('.')[1];
        const response = await supabase.storage
          .from('catalog')
          .upload(`${uuid}.${fileExt}`, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (response.error !== null) {
          throw response.error.message;
        }

        return (
          import.meta.env.VITE_SUPABASE_URL +
          '/storage/v1/object/public/catalog/' +
          uuid +
          '.' +
          fileExt
        );
      } catch (error) {
        console.log(error);
        /* this.errors = cloneDeep(error); */
        return undefined;
      }
    },
    /* async loadMore(
        mode: UsersModeEnum,
        userId?: number | null,
        groupId?: number | null
      ): Promise<void> {
        this.error = null;
        const url = this.getLoadMoreUrl(mode, userId, groupId);
        if (url !== null) {
          const response = await $api.user.loadMore(url);
  
          if (response.status === ResponseStatusEnum.Ok) {
            const model = response as ResponseUsersModel;
            this.data = mergeById(this.data, model.data);
            updateUsersAfterLoadedMore(mode, model, userId, groupId);
            return;
          }
  
          if (response.status === ResponseStatusEnum.Error) {
            const error = response as ResponseErrorModel;
            this.errors = cloneDeep(error.errorMessages);
          }
          return;
        }
        return;
      }, */
    /* async autocomplete(data: string, mode: UsersModeEnum): Promise<void> {
      this.error = null;
        this.loading = true;
        const response = await $api.user.autocomplete(data);
  
        if (response.status === ResponseStatusEnum.Ok) {
          const model = response as ResponseUsersModel;
  
          this.data = mergeById(this.data, model.data);
          if (mode === UsersModeEnum.UsersPage) {
            this.productsIds.usersPage.ids = model.data.map((n) => n.id);
            this.productsIds.usersPage.loadMoreUrl = model.loadMoreUrl;
          } else {
            this.productsIds.list.ids = model.data.map((n) => n.id);
            this.productsIds.list.loadMoreUrl = model.loadMoreUrl;
          }
  
          this.loading = false;
          return;
        }
  
        if (response.status === ResponseStatusEnum.Error) {
          const error = response as ResponseErrorModel;
          this.errors = cloneDeep(error.errorMessages);
        }
  
        this.loading = false;
    }, */

    /* async userProfileById(userId: number): Promise<boolean> {
        this.error = null;
        this.loading = true;
        const response = await $api.user.getUserById(userId);
  
        if (response.status === ResponseStatusEnum.Ok) {
          const model = response as ResponseUserModel;
          const user = cloneDeep(model.data);
          this.loading = false;
          this.upsert(user);
          return true;
        }
  
        if (response.status === ResponseStatusEnum.Error) {
          const error = response as ResponseErrorModel;
          this.errors = cloneDeep(error.errorMessages);
        }
  
        this.loading = false;
        return false;
      },
      async chooseUserAutocomplete(
        data: string,
        mode: UsersModeEnum
      ): Promise<void> {
        this.error = null;
        const response = await $api.user.autocomplete(data);
  
        if (response.status === ResponseStatusEnum.Ok) {
          const model = response as ResponseUsersModel;
  
          this.data = mergeById(this.data, model.data);
          if (mode == UsersModeEnum.ChosenMentions) {
            this.productsIds.chosen.mentions.ids = model.data.map((n) => n.id);
            this.productsIds.chosen.mentions.loadMoreUrl = model.loadMoreUrl;
          } else {
            this.productsIds.chosen.others.ids = model.data.map((n) => n.id);
            this.productsIds.chosen.others.loadMoreUrl = model.loadMoreUrl;
          }
  
          return;
        }
  
        if (response.status === ResponseStatusEnum.Error) {
          const error = response as ResponseErrorModel;
          this.errors = cloneDeep(error.errorMessages);
        }
  
        return;
      }, */
    /* async resetProductsIdsChosen(mode: UsersModeEnum): Promise<void> {
        if (mode === UsersModeEnum.ChosenMentions) {
          this.productsIds.chosen.mentions.ids = [];
          this.productsIds.chosen.mentions.loadMoreUrl = null;
        } else {
          this.productsIds.chosen.others.ids = [];
          this.productsIds.chosen.others.loadMoreUrl = null;
        }
  
        return;
      }, */
  },
  persist: true,
});

const mergeById = (a: ProductEntity[], b: ProductEntity[]) => {
  return unionBy(a, b, 'id').map((obj) => {
    const match = find(b, { id: obj.id });
    return match ? Object.assign({}, obj, match) : obj;
  });
};

/* const updateUsersAfterLoadedMore = (
    mode: UsersModeEnum,
    model: ResponseUsersModel,
    userId?: number | null,
    groupId?: number | null
  ) => {
    const userStore = useUserStore();
    switch (mode) {
      case UsersModeEnum.UsersPage:
        {
          userStore.productsIds.usersPage.ids = [
            ...userStore.productsIds.usersPage.ids,
            ...model.data.map((n) => n.id),
          ];
          userStore.productsIds.usersPage.loadMoreUrl = model.loadMoreUrl;
        }
        break;
  
      case UsersModeEnum.List:
        {
          userStore.productsIds.list.ids = [
            ...userStore.productsIds.list.ids,
            ...model.data.map((n) => n.id),
          ];
          userStore.productsIds.list.loadMoreUrl = model.loadMoreUrl;
        }
        break;
  
      case UsersModeEnum.ByGroup:
        {
          const index = userStore.productsIds.groups.findIndex(
            (n) => n.groupId === groupId
          );
          if (~index) {
            userStore.productsIds.groups[index].ids = [
              ...userStore.productsIds.groups[index].ids,
              ...model.data.map((n) => n.id),
            ];
            userStore.productsIds.groups[index].loadMoreUrl = model.loadMoreUrl;
          }
        }
        break;
  
      case UsersModeEnum.ByProfile:
        {
          const index = userStore.productsIds.profiles.findIndex(
            (n) => n.profileId === userId
          );
          if (~index) {
            userStore.productsIds.profiles[index].ids = [
              ...userStore.productsIds.profiles[index].ids,
              ...model.data.map((n) => n.id),
            ];
            userStore.productsIds.profiles[index].loadMoreUrl = model.loadMoreUrl;
          }
        }
        break;
    }
  }; */

/* const subscription = supabase.from('products').on('*', payload => {
   console.log('***', payload)
 })
 .subscribe() */
