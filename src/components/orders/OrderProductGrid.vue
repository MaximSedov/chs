<template>
  <p>
    <n-text code>
      Имя
    </n-text> {{ order.userName }}
  </p>
  <p>
    <n-text code>
      Email
    </n-text> {{ order.email }}
  </p>
  <p>
    <n-text code>
      Phone
    </n-text> {{ order.phone }}
  </p>
  <p>
    <n-text code>
      Address
    </n-text> {{ order.address }}
  </p>
  <n-grid
    x-gap="12"
    y-gap="12"
    :cols="5"
  >
    <n-gi
      v-for="product in order.products"
      :key="product.data.id"
    >
      <n-badge
        :value="product.count"
        type="success"
        style="position: relative"
      >
        <order-product-item
          :show-availability="true"
          :product="product.data"
        />
      </n-badge>
    </n-gi>
  </n-grid>
</template>
<script setup lang="ts">
import { LayoutDefault } from '@/layouts';
import type { DrawerPlacement } from 'naive-ui';
import { computed, ComputedRef, ref, ShallowRef } from 'vue';
import { useThemeVars } from 'naive-ui';
import {
  GetProductShortDescription,
  GetProductFormattedPrice,
} from '@/helpers';
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
  NPopconfirm,
  useMessage,
  NUl,
  NLi,
} from 'naive-ui';
import {
  Heart,
  HeartOutline,
  ChatboxOutline,
  CloseCircleOutline as Close,
} from '@vicons/ionicons5';
import { Cart16Filled as Cart } from '@vicons/fluent';

import { defineComponent, h, Component, PropType } from 'vue';
import type { MenuOption } from 'naive-ui';
import { OrderStatusEnum, ProductsTabMode, ProductsTabType } from '@/@enums';
import { OrderData, ProductEntity, ProductEntityCount } from '@/@types';
import { useCartStore } from '@/store';
import { GetProductFormattedTitle, GetOrderStatusInString } from '@/helpers';
import { OrderProductItem } from '@/components';
import { format } from 'date-fns';
import { useOrdersStore } from '@/store';
const themeVars = useThemeVars();
const ordersStore = useOrdersStore();
const props = defineProps({
  order: {
    type: Object as PropType<OrderData>,
    required: true,
  },
});
const cost: ComputedRef<string> = computed(() =>
  GetProductFormattedPrice(props.order.cost)
);

const isLoading: ComputedRef<boolean> = computed(() => ordersStore.loading);
const message = useMessage();
</script>
<style scoped></style>
