<template>
  <n-button
    type="success"
    icon-placement="left"
    size="large"
    style="width: 100%"
    @click="activate()"
  >
    <template #icon>
      <n-icon>
        <reorder />
      </n-icon>
    </template>
    Каталог товаров
  </n-button>

  <n-drawer
    v-model:show="active"
    placement="top"
    :height="900"
    class="catalog"
  >
    <n-drawer-content
      title="Catalog"
      footer-style="justify-content: space-between;"
    >
      <n-layout has-sider>
        <n-layout-sider>
          <n-menu
            v-model:value="selectedKey"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout>
          <n-layout-content content-style="padding: 6px;">
            <n-grid
              v-if="menuOptions[Number(selectedKey)].content.length > 0"
              x-gap="12"
              :cols="4"
              :y-gap="12"
            >
              <n-gi
                v-for="category in menuOptions[Number(selectedKey)].content"
                :key="category.title"
              >
                <div class="light-green">
                  <n-list
                    clickable
                    hoverable
                    :bordered="false"
                  >
                    <template #header>
                      <n-h4>{{ category.title }}</n-h4>
                    </template>
                    <n-list-item
                      v-for="item in category.items"
                      :key="item.title"
                    >
                      {{ item.title }}
                    </n-list-item>
                  </n-list>
                </div>
              </n-gi>
            </n-grid>

            <n-grid
              v-else
              x-gap="12"
              :cols="1"
              :y-gap="12"
            >
              <n-gi>
                <n-result
                  v-if="true"
                  status="403"
                  title="Товары не найдены"
                  description="Данная категория в разработке, вернитесь позже"
                />
              </n-gi>
            </n-grid>
          </n-layout-content>
        </n-layout>
      </n-layout>

      <template #header>
        Каталог
      </template>
      <template #footer>
        <n-button
          type="primary"
          @click="activate()"
        >
          <template #icon>
            <n-icon>
              <power />
            </n-icon>
          </template>
          Конфигуратор ПК
        </n-button>
        <n-button @click="activate()">
          Закрыть
        </n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup lang="ts">
import { LayoutDefault } from '@/layouts';
import type { DrawerPlacement } from 'naive-ui';
import { computed, ref, ShallowRef } from 'vue';
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
  NH4,
  NH5,
  NList,
  NThing,
  NListItem,
  NResult,
} from 'naive-ui';
import {
  Search16Regular,
  Person20Filled as Person,
  Heart20Filled as Heart,
  Cart20Filled as cart,
  TextAlignLeft16Filled as Align,
} from '@vicons/fluent';
import { CableOutlined, ComputerOutlined } from '@vicons/material';
import {
  BareMetalServer,
  Network3,
  Keyboard,
  Printer,
  VmdkDisk,
  App,
  SettingsServices,
  Fire,
  ContentDeliveryNetwork,
  Power,
} from '@vicons/carbon';
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon,
  ReorderThreeOutline as Reorder,
} from '@vicons/ionicons5';
import { defineComponent, h, Component } from 'vue';
import type { MenuOption } from 'naive-ui';
import { CatalogMenuOptions } from '@/@types';
const active = ref(false);
const selectedKey = ref('2');
const activate = () => {
  active.value = !active.value;
};

const icons = {
  server: BareMetalServer,
  network: ContentDeliveryNetwork,
  keyboard: Keyboard,
  printer: Printer,
  disk: VmdkDisk,
  app: App,
  settings: SettingsServices,
  fire: Fire,
  computer: ComputerOutlined,
  cable: Network3,
};

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const menuOptions: CatalogMenuOptions[] = [
  {
    label: 'Скидки и акции',
    key: '0',
    icon: renderIcon(icons.fire),
    content: [],
  },
  {
    key: '1',
    label: '',
    type: 'divider',
    icon: null,
    content: [],
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: 'Комплектующие для ПК',
    key: '2',
    icon: renderIcon(icons.settings),
    content: [
      {
        title: 'Процессоры',
        items: [
          { title: 'Intel Core i7' },
          { title: 'AMD Ryzen 5' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Видеокарты',
        items: [
          { title: 'Nvidia' },
          { title: 'AMD' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Корпуса',
        items: [
          { title: 'ATX' },
          { title: 'mATX' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Материнские платы',
        items: [
          { title: 'LGA 1700' },
          { title: 'AM4' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Оперативная память',
        items: [
          { title: 'DDR4' },
          { title: 'DDR5' },
          { title: 'SO-DIMM' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Блоки питания',
        items: [
          { title: '400 Вт - 500 Вт' },
          { title: '500 Вт - 800 Вт' },
          { title: '800 Вт - 1000 Вт' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Системы охлаждения',
        items: [
          { title: 'Кулеры для процессоров' },
          { title: 'Вентиляторы для корпуса' },
          { title: 'Водяное охлаждение' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Жесткие диски',
        items: [
          { title: '2.5"' },
          { title: '3.5"' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Накопители SSD',
        items: [
          { title: 'PCI-E x4' },
          { title: '2.5"' },
          { title: 'M.2"' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Программное обеспечение',
        items: [
          { title: 'Операционные системы' },
          { title: 'Антивирусы' },
          { title: 'Офисные программы' },
          { title: 'Все категории' },
        ],
      },
    ],
  },
  {
    label: 'Компьютеры и ноутбуки',
    key: '3',
    icon: renderIcon(icons.computer),
    content: [
      {
        title: 'Ноутбуки',
        items: [
          { title: 'Asus' },
          { title: 'Msi' },
          { title: 'Huawei' },
          { title: 'Lenovo' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Моноблоки',
        items: [
          { title: 'Asus' },
          { title: 'Msi' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Настольные компьютеры',
        items: [
          { title: 'Asus' },
          { title: 'Msi' },
          { title: 'Acer' },
          { title: 'Lenovo' },
          { title: 'Все категории' },
        ],
      },
      {
        title: 'Аксессуары',
        items: [
          { title: 'Рюкзаки, чехлы, сумки' },
          { title: 'Охлаждающие подставки' },
          { title: 'Все категории' },
        ],
      },
    ],
  },
  {
    label: 'Сетевое оборудование',
    key: '4',
    icon: renderIcon(icons.network),
    content: [],
  },
  {
    label: 'Серверное оборудование',
    key: '5',
    icon: renderIcon(icons.server),
    content: [],
  },
  {
    label: 'Периферия',
    key: '6',
    icon: renderIcon(icons.keyboard),
    content: [],
  },
  {
    label: 'Кабели и переходники',
    key: '7',
    icon: renderIcon(icons.cable),
    content: [],
  },
  {
    label: 'Накопители данных',
    key: '8',
    icon: renderIcon(icons.disk),
    content: [],
  },
  {
    label: 'Оргтехника',
    key: '9',
    icon: renderIcon(icons.printer),
    content: [],
  },
];
</script>
<style scoped>
.light-green {
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
