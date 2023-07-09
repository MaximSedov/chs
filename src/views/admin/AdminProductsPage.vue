<template>
  <n-layout>
    <n-layout-content content-style="padding: 12px;padding-inline:24px;">
      <n-h2>Товары</n-h2>
      <admin-products-table />
    </n-layout-content>
  </n-layout>
  <n-back-top
    :right="40"
    :visibility-height="500"
  />
</template>
<script setup lang="ts">
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
  NGi,
  NRow,
  NCol,
  NH2,
  NH5,
  NH3,
  NList,
  NThing,
  NListItem,
  NResult,
  NCard,
  NTab,
  NTabPane,
  NTabs,
  NText,
  NCarousel,
  NImage,
  NBadge,
  NBackTop,
} from 'naive-ui';
import { AdminProductsTable } from '@/components';
</script>
<style scoped></style>
