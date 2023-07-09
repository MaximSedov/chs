<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <n-grid
        x-gap="12"
        :cols="4"
      >
        <n-gi :span="4">
          <n-breadcrumb separator=">">
            <n-breadcrumb-item @click="open(ROUTES_NAME.HOME)">
              Главная
            </n-breadcrumb-item>
            <n-breadcrumb-item> Каталог</n-breadcrumb-item>
          </n-breadcrumb>
          <div>
            <n-h2 class="title">
              Каталог товаров
            </n-h2>
          </div>
        </n-gi>
      </n-grid>
      <n-grid
        x-gap="12"
        :cols="3"
        :y-gap="12"
      >
        <n-gi
          v-for="category in categories"
          :key="category.title"
        >
          <product-card-preview :category="category" />
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
  NBreadcrumb,
  NBreadcrumbItem,
} from 'naive-ui';

import { defineComponent, h, Component } from 'vue';
import {
  CatalogMainDrawer,
  MainBanner,
  ProductMainTab,
  CartProductItem,
  OrderForm,
  ProductCardPreview,
} from '@/components';
import { useCartStore } from '@/store';
import type { MenuOption } from 'naive-ui';
import { ProductsTabMode, ProductsTabType } from '@/@enums';
import { ProductEntity, ProductEntityCount } from '@/@types';
import { uniqBy } from 'lodash';
import { ROUTES_NAME } from '@/router';
import { useRouter } from 'vue-router';
const containerRef = ref<HTMLElement | undefined>(undefined);

const categories: ComputedRef<any[]> = computed(() => {
  return [
    {
      title: 'Комплектующие для ПК',
      background: '#A0D4B5',
      img: 'https://uejykeyievkzdshnqwmd.supabase.co/storage/v1/object/public/catalog/Catalog/Cases/zalman?t=2023-03-26T10%3A06%3A54.475Z',
      link: ROUTES_NAME.PARTS,
    },
    {
      title: 'Компьютеры и ноутбуки',
      background: '#BFDDEB',
      img: 'https://uejykeyievkzdshnqwmd.supabase.co/storage/v1/object/public/catalog/Catalog/1012500.jpg',
      link: ROUTES_NAME.CATALOG,
    },
    {
      title: 'Сетевое оборудование',
      background: '#A7E0DA',
      img: 'https://uejykeyievkzdshnqwmd.supabase.co/storage/v1/object/public/catalog/Catalog/843960.jpg',
      link: ROUTES_NAME.CATALOG,
    },
  ];
});
const router = useRouter();
const open = async (link: any) => {
  await router.push({ name: link });
};
</script>

<style scoped></style>
