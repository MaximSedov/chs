<template>
  <n-card
    header-style="padding:12px"
    content-style="padding:12px;"
    footer-style="padding:12px"
    style="height: 100%; margin-bottom: 24px"
  >
    <template #header>
      <n-text :delete="order.status === OrderStatusEnum.Canceled">
        {{
          `Заказ #${order.id} от ${format(
            new Date(order.createdAt),
            'dd-MM-yyyy HH:mm'
          )} на сумму ${cost}`
        }}
      </n-text>
    </template>
    <template #header-extra>
      <n-text>
        Статус заказа:
        <n-text :type="statusTextType">
          {{ GetOrderStatusInString(order.status) }}
        </n-text>
      </n-text>
    </template>

    <n-grid
      x-gap="12"
      y-gap="12"
      :cols="6"
    >
      <n-gi
        v-for="product in order.products"
        :key="product.data.id"
      >
        <n-badge
          :value="product.count"
          type="success"
        >
          <order-product-item :product="product.data" />
        </n-badge>
      </n-gi>
    </n-grid>

    <template #footer>
      <div
        v-if="
          order.status !== OrderStatusEnum.Canceled &&
            order.status !== OrderStatusEnum.Shipped
        "
        class=""
        style="display: flex; justify-content: end"
      >
        <n-popconfirm
          positive-text="Отменить заказ"
          :negative-text="null"
          :positive-button-props="{
            strong: true,
            secondary: true,
            type: 'error',
          }"
          @positive-click="cancelOrder()"
        >
          <template #trigger>
            <n-button
              strong
              secondary
              type="error"
              :disabled="isLoading"
            >
              <template #icon>
                <n-icon><Close /></n-icon>
              </template>
              Отменить заказ
            </n-button>
          </template>
          Вы уверены что хотите отменить заказ?
        </n-popconfirm>
      </div>
    </template>
  </n-card>
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

const statusTextType: ComputedRef<string> = computed(() => {
  switch (props.order.status) {
    case OrderStatusEnum.Created:
      return 'info';
    case OrderStatusEnum.Confirmed:
      return 'success';
    case OrderStatusEnum.Processing:
      return 'warning';
    case OrderStatusEnum.Shipped:
      return 'info';
    case OrderStatusEnum.Canceled:
      return 'error';
  }
  return 'info';
});
const isLoading: ComputedRef<boolean> = computed(() => ordersStore.loading);
const message = useMessage();
const cancelOrder = async () => {
  const result = await ordersStore.cancelOrder(props.order.id);
  if (result) {
    message.success('Заказ успешно отменен!', {
      duration: 5000,
      closable: true,
    });
  } else {
    message.error('Не удалось отменить заказ!', {
      duration: 5000,
      closable: true,
    });
  }
};
</script>
<style scoped></style>
