<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <n-grid
        x-gap="12"
        :cols="4"
      >
        <n-gi :span="4">
          <div class="light-green">
            <n-h2 class="title">
              Ваши заказы<n-text depth="3">
                {{ ' ' + orders.length }}
              </n-text>
            </n-h2>

            <order-item
              v-for="order in orders"
              :key="order.id"
              :order="order"
            />

            <n-empty
              v-if="orders.length === 0"
              description="Список заказов пуст"
            />
          </div>
        </n-gi>
      </n-grid>
    </n-layout-content>
  </n-layout>
</template>
<script setup lang="ts">
import { LayoutDefault } from '@/layouts';

import { computed, ComputedRef, onMounted, ref, ShallowRef } from 'vue';
import {
  NSpace,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NButton,
  NInput,
  NIcon,
  NDrawer,
  NDrawerContent,
  NMessageProvider,
  NMenu,
  NGrid,
  NH2,
  NText,
  NGi,
  NAffix,
  NEmpty,
  NCard,
} from 'naive-ui';

import { defineComponent, h, Component } from 'vue';
import {
  CatalogMainDrawer,
  MainBanner,
  ProductMainTab,
  CartProductItem,
  OrderForm,
} from '@/components';
import { useCartStore, useOrdersStore, useUserStore } from '@/store';
import type { MenuOption } from 'naive-ui';
import { ProductsTabMode, ProductsTabType } from '@/@enums';
import { OrderData, ProductEntity, ProductEntityCount } from '@/@types';
import { uniqBy } from 'lodash';
import { OrderItem } from '@/components';
const containerRef = ref<HTMLElement | undefined>(undefined);
const cartStore = useCartStore();
const ordersStore = useOrdersStore();
const userStore = useUserStore();
/*  
  const cartCount: ComputedRef<number> = computed(() => cartStore.data.length);
  
  const products: ComputedRef<ProductEntityCount[]> = computed(() =>
    uniqBy(cartStore.data, (n) => n.data.id)
  ); */

const orders: ComputedRef<OrderData[]> = computed(() =>
  ordersStore.getOrdersList()
);

const currentUserId: ComputedRef<string> = computed(
  () => userStore.current?.id ?? ''
);
onMounted(async () => {
  await ordersStore.ordersByUser(currentUserId.value);
});
</script>
<style scoped></style>
