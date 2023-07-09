<template>
  <div class="product-item">
    <div class="avatar">
      <n-avatar
        :size="48"
        :src="product.data.image"
      />
    </div>
    <div class="text">
      <n-space
        align="start"
        vertical
        style="gap: unset"
      >
        <n-text depth="3">
          ID: {{ product.data.id }}
        </n-text>
        <n-text style="font-weight: bold; font-size: 14px">
          {{ GetProductFormattedTitle(product.data, true) }}
        </n-text>
        <n-text
          depth="3"
          style="font-size: 12px"
        >
          {{ GetProductShortDescription(product.data) }}
        </n-text>
      </n-space>
    </div>
    <div class="price">
      <n-input-number
        v-model:value="inputNumber"
        :min="1"
        button-placement="both"
        @update:value="countChange()"
      />
      <h2>
        {{ GetProductFormattedPrice(product.data.price * product.count) }}
      </h2>
    </div>
    <div class="controls">
      <n-button
        quaternary
        circle
        @click="removeProduct()"
      >
        <template #icon>
          <n-icon><trash-outline /></n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LayoutDefault } from '@/layouts';
import type { DrawerPlacement } from 'naive-ui';
import { computed, ComputedRef, ref, ShallowRef } from 'vue';
import { useThemeVars } from 'naive-ui';
import {
  NSpace,
  NInputNumber,
  NAvatar,
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
import {
  Heart,
  HeartOutline,
  ChatboxOutline,
  TrashOutline,
} from '@vicons/ionicons5';
import { Cart16Filled as Cart } from '@vicons/fluent';

import { defineComponent, h, Component, PropType } from 'vue';
import type { MenuOption } from 'naive-ui';
import { ProductsTabMode, ProductsTabType } from '@/@enums';
import { Amount } from 'amount-ts';
import { useCartStore } from '@/store';
import { ProductEntity, ProductEntityCount } from '@/@types';
import {
  GetProductFormattedTitle,
  GetProductShortDescription,
  GetProductFormattedPrice,
} from '@/helpers';
const themeVars = useThemeVars();
const props = defineProps({
  product: {
    type: Object as PropType<ProductEntityCount>,
    required: true,
  },
});

const formatter: Amount = new Amount({
  thousand: ' ',
  code: 'RUB',
  suffix: ' ₽',
  decimals: 2,
});

const inputNumber = ref<number>(props.product.count);

const cartStore = useCartStore();

const cartCount: ComputedRef<number> = computed(() => cartStore.data.length);

const removeProduct = async () => {
  await cartStore.removeProductFromCart(props.product.data.id);
};

const countChange = async () => {
  await cartStore.updateProductCount(inputNumber.value, props.product.data.id);
};
</script>
<style scoped>
.product-item {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(224, 224, 230);
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.avatar {
  display: flex;
  align-items: center;
  flex: 0 0 48px;
}
.text {
  flex: 1 1 auto;
  padding-inline: 1rem;
}
.price {
  display: flex;
  align-items: center;
  flex: 0 0 300px;
}
.price h2 {
  line-height: 1;
  margin: 0;
}
.price .n-input-number {
  width: 100px;
  text-align: center;
  margin-right: 1rem;
}
</style>
