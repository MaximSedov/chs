<template>
  <n-menu
    class="main-header"
    mode="horizontal"
    :options="menuOptions"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { defineComponent, h, Component } from 'vue';
import { NIcon, NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import { ROUTES_NAME } from '@/router';
import { supabase } from '@/lib';
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5';

import {
  Cart16Regular,
  PeopleCall16Regular,
  ArrowStepBack16Regular,
  VehicleCarProfileRtl16Regular,
  BuildingShop16Regular,
  PeopleSettings20Regular,
} from '@vicons/fluent';

const count = ref(0);

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};
const router = useRouter();
const route = useRoute();

const icons = {
  building: BuildingShop16Regular,
  cart: Cart16Regular,
  arrow: ArrowStepBack16Regular,
  contacts: PeopleCall16Regular,
  people: PeopleSettings20Regular,
};

const activeKey = ref<string | null>('1');

const menuOptions: MenuOption[] = [
  {
    key: '1',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: ROUTES_NAME.HOME,
          },
        },
        'CHS'
      ),
    icon: undefined,
  },
  {
    key: '2',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: ROUTES_NAME.ABOUT,
          },
        },
        'О компании'
      ),
    icon: renderIcon(icons.building),
  },
  {
    key: '3',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: ROUTES_NAME.DILIVERY,
          },
        },
        'Доставка и оплата'
      ),
    icon: renderIcon(icons.cart),
  },
  {
    key: '4',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: ROUTES_NAME.WARRANTY,
          },
        },
        'Гарантия и возврат'
      ),
    icon: renderIcon(icons.arrow),
  },
  {
    key: '5',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: ROUTES_NAME.CONTACTS,
          },
        },
        'Контакты'
      ),
    icon: renderIcon(icons.contacts),
  },
  {
    key: '6',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: ROUTES_NAME.ADMIN,
          },
        },
        'Управление'
      ),
    icon: renderIcon(icons.people),
  },
];

onMounted(async () => {
  /* const { data } = await supabase.from('users').select(); */
  /*  console.log(data); */
});
</script>

<style scoped></style>
