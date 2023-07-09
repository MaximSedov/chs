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
              Корзина<n-text depth="3">
                {{ ' ' + cartCount }}
              </n-text>
            </n-h2>
            <cart-product-item
              v-for="product in products"
              :key="product.data.id"
              :product="product"
            />

            <n-empty
              v-if="products.length === 0"
              description="Корзина пуста"
            />

            <template v-if="products.length > 0">
              <n-h2 class="title">
                Оформление заказа
              </n-h2>

              <order-form />
            </template>
          </div>
        </n-gi>
      </n-grid>
    </n-layout-content>
  </n-layout>
</template>
<script setup lang="ts">
import { LayoutDefault } from '@/layouts';

import { computed, ComputedRef, ref, ShallowRef } from 'vue';
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
import { useCartStore } from '@/store';
import type { MenuOption } from 'naive-ui';
import { ProductsTabMode, ProductsTabType } from '@/@enums';
import { ProductEntity, ProductEntityCount } from '@/@types';
import { uniqBy } from 'lodash';
const containerRef = ref<HTMLElement | undefined>(undefined);
const cartStore = useCartStore();

const cartCount: ComputedRef<number> = computed(() => cartStore.data.length);

const products: ComputedRef<ProductEntityCount[]> = computed(() =>
  uniqBy(cartStore.data, (n) => n.data.id)
);
</script>
<style scoped></style>
