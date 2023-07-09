<template>
  <n-card
    hoverable
    header-style="padding:12px"
    content-style="padding:12px;height: 100%;"
    footer-style="padding:12px"
    style="height: 100%; position: relative"
    :title="GetProductFormattedPrice(product.price)"
  >
    <n-space
      vertical
      align="center"
    >
      <n-image
        preview-disabled
        height="40"
        width="40"
        object-fit="contain"
        :src="product?.image"
      />
    </n-space>
    <n-space
      align="start"
      vertical
      style="gap: unset"
    >
      <n-text depth="3">
        ID: {{ product.id }}
      </n-text>
      <n-text style="font-weight: bold; font-size: 14px">
        {{ GetProductFormattedTitle(product, true) }}
      </n-text>
    </n-space>

    <template
      v-if="showAvailability"
      #footer
    >
      <div
        class=""
        style="display: flex; justify-content: center"
      >
        <n-button style="width: 100%">
          {{ 'В наличии: ' + productAvailabilityCount }}
        </n-button>
      </div>
    </template>
  </n-card>
</template>
<script setup lang="ts">
import { LayoutDefault } from '@/layouts';
import type { DrawerPlacement } from 'naive-ui';
import { computed, ComputedRef, ref, ShallowRef } from 'vue';
import { useThemeVars } from 'naive-ui';
import { GetProductShortDescription } from '@/helpers';
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
  NRate,
} from 'naive-ui';
import { Heart, HeartOutline, ChatboxOutline } from '@vicons/ionicons5';
import { Cart16Filled as Cart } from '@vicons/fluent';

import { defineComponent, h, Component, PropType } from 'vue';
import type { MenuOption } from 'naive-ui';
import { ProductsTabMode, ProductsTabType } from '@/@enums';
import { ProductEntity, ProductEntityCount } from '@/@types';
import { useCartStore, useAvailabilityStore } from '@/store';
import { GetProductFormattedTitle, GetProductFormattedPrice } from '@/helpers';

const availabilityStore = useAvailabilityStore();

const themeVars = useThemeVars();
const props = defineProps({
  product: {
    type: Object as PropType<ProductEntity>,
    required: true,
  },
  showAvailability: {
    type: Boolean,
    default: () => false,
  },
});

const productAvailabilityCount: ComputedRef<number> = computed(() =>
  availabilityStore.getCountByProductId(props.product.id)
);
</script>
<style scoped></style>
