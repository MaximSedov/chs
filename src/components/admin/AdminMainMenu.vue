<template>
  <n-layout
    has-sider
    style="height: 100%"
  >
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      show-trigger
      :default-collapsed="true"
    >
      <div
        style="
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <n-menu
          v-model:value="activeKey"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="viewsMenu"
        />
        <n-menu
          v-model:value="activeKey"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="otherMenu"
        />
      </div>
    </n-layout-sider>
    <n-layout>
      <slot />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { LayoutDefault } from '@/layouts';

import { computed, ComputedRef, Ref, ref, ShallowRef } from 'vue';
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
  NText,
  NIconWrapper,
} from 'naive-ui';
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  StatsChartOutline,
  ServerOutline,
  CartOutline,
  HomeOutline,
  PowerOutline,
  CashOutline,
} from '@vicons/ionicons5';

import { defineComponent, h, Component } from 'vue';
import { CatalogMainDrawer, MainBanner, ProductMainTab } from '@/components';
import type { MenuOption } from 'naive-ui';
import { ProductsTabMode, ProductsTabType, UserRoleEnum } from '@/@enums';
import { RouteRecordName, RouterLink } from 'vue-router';
import { ROUTES_NAME } from '@/router';
import { useRoute, useRouter } from 'vue-router';
import { useAppState, GetUserRoleInString } from '@/helpers';
import { useUserStore } from '@/store';
const route = useRoute();
const icons = {
  stats: StatsChartOutline,
  server: ServerOutline,
  cart: CartOutline,
  home: HomeOutline,
  power: PowerOutline,
  cash: CashOutline,
};

const userStore = useUserStore();
const currentUserRole: ComputedRef<UserRoleEnum> = computed(
  () => userStore.current?.roleId ?? 0
);

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const activeKey = ref<RouteRecordName | null | undefined | any>(route.name);

const viewsMenu: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: ROUTES_NAME.ADMIN,
          },
        },
        'Статистика'
      ),
    key: ROUTES_NAME.ADMIN,
    icon: renderIcon(icons.stats),
  },
  {
    label: 'Таблицы',
    key: 'tables',
    icon: renderIcon(icons.server),
    children: [
      {
        type: 'group',
        label: 'Данные',
        key: 'data',
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: ROUTES_NAME.ADMIN_PRODUCTS,
                  },
                },
                'Товары'
              ),
            key: ROUTES_NAME.ADMIN_PRODUCTS,
            icon: renderIcon(icons.cart),
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: ROUTES_NAME.ADMIN_USERS,
                  },
                },
                'Пользователи'
              ),
            key: ROUTES_NAME.ADMIN_USERS,
            icon: renderIcon(PersonIcon),
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: ROUTES_NAME.ADMIN_ORDERS,
                  },
                },
                'Заказы'
              ),
            key: ROUTES_NAME.ADMIN_ORDERS,
            icon: renderIcon(icons.cash),
          },
        ],
      },
    ],
  },
];

const router = useRouter();
const otherMenu: MenuOption[] = [
  /* {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: ROUTES_NAME.HOME,
          },
        },
        'Главная'
      ),
    key: ROUTES_NAME.HOME,
    icon: renderIcon(icons.home),
  }, */
  {
    key: ROUTES_NAME.LOGIN,
    icon: renderIcon(icons.power),
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: ROUTES_NAME.HOME,
          },
        },
        'Выход'
      ),
  },
];
</script>

<style scoped></style>
