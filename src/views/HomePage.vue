<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <main-banner />
      <product-main-tab
        :type="ProductsTabType.NewProducts"
        :mode="ProductsTabMode.Tab"
      />
      <product-main-tab
        :type="ProductsTabType.Actual"
        :mode="ProductsTabMode.Slider"
      />
      <product-main-tab
        :type="ProductsTabType.Popular"
        :mode="ProductsTabMode.Tab"
      />
    </n-layout-content>
  </n-layout>
</template>
<script setup lang="ts">
import { LayoutDefault } from '@/layouts';

import { computed, ref, ShallowRef } from 'vue';
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
} from 'naive-ui';

import { defineComponent, h, Component } from 'vue';
import { CatalogMainDrawer, MainBanner, ProductMainTab } from '@/components';
import type { MenuOption } from 'naive-ui';
import { ProductsTabMode, ProductsTabType } from '@/@enums';
</script>
<style scoped></style>
