<template>
  <n-card
    hoverable
    :title="GetProductFormattedPrice(product.price)"
    header-style="padding:12px"
    content-style="padding:12px; padding-bottom:unset;"
    footer-style="padding:12px"
    style="height: 100%"
  >
    <template #header-extra>
      <n-button circle>
        <template #icon>
          <n-icon><heart-outline /></n-icon>
        </template>
      </n-button>
    </template>
    <n-space
      vertical
      align="center"
    >
      <n-image
        preview-disabled
        height="120"
        width="190"
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
      <n-text
        depth="3"
        style="font-size: 12px"
      >
        {{ GetProductShortDescription(product) }}
      </n-text>
    </n-space>

    <template #footer>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        "
      >
        <n-rate
          size="small"
          readonly
          :default-value="4"
          :count="5"
          :color="themeVars.primaryColor"
        />
        <n-button
          text
          strong
          secondary
        >
          <template #icon>
            <n-icon>
              <chatbox-outline />
            </n-icon>
          </template>
          {{ Math.floor(Math.random() * 100) + 1 }}
        </n-button>
      </div>
      <div
        class=""
        style="display: flex; justify-content: center"
      >
        <n-button
          style="width: 100%"
          :disabled="alreadyInCart || !product.isAvailable"
          @click="addToCart()"
        >
          <template #icon>
            <n-icon><cart /></n-icon>
          </template>
          {{
            alreadyInCart
              ? 'Уже в корзине'
              : product.isAvailable
                ? 'В корзину'
                : 'Недоступен'
          }}
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
} from 'naive-ui';
import { Heart, HeartOutline, ChatboxOutline } from '@vicons/ionicons5';
import { Cart16Filled as Cart } from '@vicons/fluent';

import { defineComponent, h, Component, PropType } from 'vue';
import type { MenuOption } from 'naive-ui';
import { ProductsTabMode, ProductsTabType } from '@/@enums';
import { ProductEntity, ProductEntityCount } from '@/@types';
import { useCartStore } from '@/store';
import { GetProductFormattedTitle } from '@/helpers';
const themeVars = useThemeVars();
const props = defineProps({
  product: {
    type: Object as PropType<ProductEntity>,
    required: true,
  },
});

const cartStore = useCartStore();

const cartProducts: ComputedRef<ProductEntityCount[]> = computed(
  () => cartStore.data
);

const alreadyInCart: ComputedRef<boolean> = computed(() =>
  cartProducts.value.some((n) => n.data.id === props.product.id)
);

const addToCart = async () => {
  await cartStore.addProductToCart(props.product);
};
</script>
<style scoped></style>
