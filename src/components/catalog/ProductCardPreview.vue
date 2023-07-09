<template>
  <n-card
    :style="`background-color: ${category.background};`"
    content-style="padding:12px;"
  >
    <div style="display: flex; justify-content: space-between; height: 100%">
      <n-space
        vertical
        justify="space-between"
      >
        <n-h3>{{ category.title }}</n-h3>

        <n-button
          strong
          secondary
          @click="open()"
        >
          Выбрать
        </n-button>
      </n-space>
      <div style="display: flex; align-items: center">
        <n-image
          preview-disabled
          width="160"
          height="160"
          :src="category.img"
          object-fit="contain"
        />
      </div>
    </div>
  </n-card>
</template>
<script setup lang="ts">
import { LayoutDefault } from '@/layouts';
import type { DrawerPlacement } from 'naive-ui';
import { computed, ComputedRef, onMounted, ref, ShallowRef } from 'vue';
import { useThemeVars } from 'naive-ui';
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
} from 'naive-ui';
import {
  Search16Regular,
  Person20Filled as Person,
  Heart20Filled as Heart,
  Cart20Filled as cart,
  TextAlignLeft16Filled as Align,
} from '@vicons/fluent';

import { defineComponent, h, Component, PropType } from 'vue';
import type { MenuOption } from 'naive-ui';
import { ProductsTabMode, ProductsTabType, ProductTypeEnum } from '@/@enums';
import { ProductCard, ProductCardSkeleton } from '@/components';
import { useProductStore } from '@/store';
import { ProductEntity } from '@/@types';
import { take, shuffle } from 'lodash';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';
import { ROUTES_NAME } from '@/router';
const themeVars = useThemeVars();
const props = defineProps({
  category: {
    type: Object as PropType<any>,
    required: true,
  },
});
const router = useRouter();
const productStore = useProductStore();
const open = async () => {
  await router.push({ name: props.category.link });
};
</script>
<style scoped>
.n-card {
  height: 100%;
}
</style>
