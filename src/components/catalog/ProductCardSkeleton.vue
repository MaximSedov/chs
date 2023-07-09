<template>
  <n-card
    hoverable
    title=" "
    header-style="padding:12px"
    content-style="padding:12px; padding-bottom:unset;"
    footer-style="padding:12px"
  >
    <template #header-extra>
      <n-button
        disabled
        circle
      >
        <template #icon>
          <n-icon><heart-outline /></n-icon>
        </template>
      </n-button>
    </template>
    <n-space
      vertical
      align="center"
    >
      <n-skeleton
        text
        :repeat="1"
        :sharp="false"
        style="width: 120px; height: 120px"
      />
    </n-space>

    <n-skeleton
      text
      :repeat="5"
      :sharp="false"
      style="width: 100%"
    />

    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
      "
    >
      <n-skeleton
        text
        :repeat="1"
        :sharp="false"
        style="width: 50%"
      />
      <n-skeleton
        text
        :repeat="1"
        :sharp="false"
        style="width: 30%"
      />
    </div>

    <template #footer>
      <div
        class=""
        style="display: flex; justify-content: center"
      >
        <n-button
          disabled
          style="width: 100%"
        >
          <template #icon>
            <n-icon><cart /></n-icon>
          </template>
          В корзину
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
  NSkeleton,
} from 'naive-ui';
import { Heart, HeartOutline, ChatboxOutline } from '@vicons/ionicons5';
import { Cart16Filled as Cart } from '@vicons/fluent';

import { defineComponent, h, Component, PropType } from 'vue';
import type { MenuOption } from 'naive-ui';
import { ProductsTabMode, ProductsTabType } from '@/@enums';
</script>
<style scoped></style>
