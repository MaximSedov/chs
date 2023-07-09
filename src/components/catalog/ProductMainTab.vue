<template>
  <n-h2
    style=""
    class="title"
  >
    {{ tabsTitle }}<n-text depth="3">
      132
    </n-text>
  </n-h2>
  <n-tabs
    v-if="mode === ProductsTabMode.Tab"
    :value="tabValue"
    type="line"
    animated
    @update:value="updateTab"
  >
    <n-tab-pane
      name="All"
      tab="Все категории"
      :disabled="isLoading"
    >
      <n-grid
        v-if="products.length > 0"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product" />
        </n-gi>
      </n-grid>

      <n-grid
        v-if="products.length === 0 && isLoading"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="item in 5"
          :key="item"
        >
          <product-card-skeleton />
        </n-gi>
      </n-grid>
    </n-tab-pane>
    <n-tab-pane
      :name="ProductTypeEnum.CPU"
      tab="Процессоры"
      :disabled="isLoading"
    >
      <n-grid
        v-if="products.length > 0"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product" />
        </n-gi>
      </n-grid>

      <n-grid
        v-if="products.length === 0 && isLoading"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="item in 5"
          :key="item"
        >
          <product-card-skeleton />
        </n-gi>
      </n-grid>
    </n-tab-pane>
    <n-tab-pane
      :name="ProductTypeEnum.GPU"
      tab="Видеокарты"
      :disabled="isLoading"
    >
      <n-grid
        v-if="products.length > 0"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product" />
        </n-gi>
      </n-grid>

      <n-grid
        v-if="products.length === 0 && isLoading"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="item in 5"
          :key="item"
        >
          <product-card-skeleton />
        </n-gi>
      </n-grid>
    </n-tab-pane>
    <n-tab-pane
      :name="ProductTypeEnum.Motherboard"
      tab="Материнские платы"
      :disabled="isLoading"
    >
      <n-grid
        v-if="products.length > 0"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product" />
        </n-gi>
      </n-grid>

      <n-grid
        v-if="products.length === 0 && isLoading"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="item in 5"
          :key="item"
        >
          <product-card-skeleton />
        </n-gi>
      </n-grid>
    </n-tab-pane>
    <n-tab-pane
      :name="ProductTypeEnum.Case"
      tab="Корпуса"
      :disabled="isLoading"
    >
      <n-grid
        v-if="products.length > 0"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product" />
        </n-gi>
      </n-grid>

      <n-grid
        v-if="products.length === 0 && isLoading"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="item in 5"
          :key="item"
        >
          <product-card-skeleton />
        </n-gi>
      </n-grid>
    </n-tab-pane>
    <n-tab-pane
      :name="ProductTypeEnum.Cooler"
      tab="Охлаждение"
      :disabled="isLoading"
    >
      <n-grid
        v-if="products.length > 0"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product" />
        </n-gi>
      </n-grid>

      <n-grid
        v-if="products.length === 0 && isLoading"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="item in 5"
          :key="item"
        >
          <product-card-skeleton />
        </n-gi>
      </n-grid>
    </n-tab-pane>
    <n-tab-pane
      :name="ProductTypeEnum.SSD"
      tab="SSD"
      :disabled="isLoading"
    >
      <n-grid
        v-if="products.length > 0"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product" />
        </n-gi>
      </n-grid>

      <n-grid
        v-if="products.length === 0 && isLoading"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="item in 5"
          :key="item"
        >
          <product-card-skeleton />
        </n-gi>
      </n-grid>
    </n-tab-pane>
    <n-tab-pane
      :name="ProductTypeEnum.HDD"
      tab="Жесткие диски"
      :disabled="isLoading"
    >
      <n-grid
        v-if="products.length > 0"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product" />
        </n-gi>
      </n-grid>

      <n-grid
        v-if="products.length === 0 && isLoading"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="item in 5"
          :key="item"
        >
          <product-card-skeleton />
        </n-gi>
      </n-grid>
    </n-tab-pane>
    <n-tab-pane
      :name="ProductTypeEnum.RAM"
      tab="ОЗУ"
      :disabled="isLoading"
    >
      <n-grid
        v-if="products.length > 0"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product" />
        </n-gi>
      </n-grid>

      <n-grid
        v-if="products.length === 0 && isLoading"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="item in 5"
          :key="item"
        >
          <product-card-skeleton />
        </n-gi>
      </n-grid>
    </n-tab-pane>
    <n-tab-pane
      :name="ProductTypeEnum.PowerSupply"
      tab="Блоки питания"
      :disabled="isLoading"
    >
      <n-grid
        v-if="products.length > 0"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product" />
        </n-gi>
      </n-grid>

      <n-grid
        v-if="products.length === 0 && isLoading"
        x-gap="12"
        :cols="5"
        :y-gap="12"
      >
        <n-gi
          v-for="item in 5"
          :key="item"
        >
          <product-card-skeleton />
        </n-gi>
      </n-grid>
    </n-tab-pane>
  </n-tabs>

  <n-carousel
    v-if="mode === ProductsTabMode.Slider"
    style="height: 200px"
    dot-type="line"
    dot-placement="bottom"
    show-arrow
    :show-dots="false"
    :slides-per-view="3"
    :space-between="20"
    :loop="false"
    draggable
    class="slider"
  >
    <n-card
      v-for="category in categories"
      :key="category.title"
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
          >
            Выбрать
          </n-button>
        </n-space>
        <div style="display: flex; align-items: center">
          <n-image
            preview-disabled
            height="160"
            :src="category.img"
          />
        </div>
      </div>
    </n-card>
  </n-carousel>
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
import {
  ProductCard,
  ProductCardSkeleton,
  ProductCardPreview,
} from '@/components';
import { useProductStore } from '@/store';
import { ProductEntity } from '@/@types';
import { take, shuffle } from 'lodash';
const themeVars = useThemeVars();
const props = defineProps({
  /* data: {
    type: Object as PropType<PostCommentsModel>,
    required: true,
  }, */
  type: {
    type: Object as PropType<ProductsTabType>,
    required: true,
  },
  mode: {
    type: Object as PropType<ProductsTabMode>,
    required: true,
  },
});

const tabsTitle: ComputedRef<string> = computed(() => {
  switch (props.type) {
    case ProductsTabType.Actual:
      return 'Сейчас актуально';

    case ProductsTabType.NewProducts:
      return 'Новые продукты';

    case ProductsTabType.Popular:
      return 'Популярные';
  }
  return '';
});

const categories: ComputedRef<any[]> = computed(() => {
  return [
    {
      title: 'Кулеры для процессоров',
      subtext: 'lala',
      background: '#A0D4B5',
      img: 'https://uejykeyievkzdshnqwmd.supabase.co/storage/v1/object/public/catalog/Catalog/Coolers/idcooling.webp?t=2023-03-26T10%3A04%3A40.623Z',
    },
    {
      title: 'Процессоры',
      subtext: 'lala',
      background: '#BFDDEB',
      img: 'https://uejykeyievkzdshnqwmd.supabase.co/storage/v1/object/public/catalog/Catalog/CPU/intel?t=2023-03-26T10%3A29%3A47.789Z',
    },
    {
      title: 'Материнские платы',
      subtext: 'lala',
      background: '#A7E0DA',
      img: 'https://uejykeyievkzdshnqwmd.supabase.co/storage/v1/object/public/catalog/Catalog/Motherboards/asus.webp?t=2023-03-26T09%3A55%3A04.858Z',
    },
    {
      title: 'Корпуса',
      subtext: 'lala',
      background: '#A0D4B5',
      img: 'https://uejykeyievkzdshnqwmd.supabase.co/storage/v1/object/public/catalog/Catalog/Cases/zalman?t=2023-03-26T10%3A06%3A54.475Z',
    },
    {
      title: 'Мониторы',
      subtext: 'lala',
      background: '#BFDDEB',
      img: 'https://uejykeyievkzdshnqwmd.supabase.co/storage/v1/object/public/catalog/Catalog/Monitors/aoc.webp?t=2023-03-26T10%3A07%3A34.145Z',
    },
  ];
});

const productStore = useProductStore();
const tabValue = ref<ProductTypeEnum | string>('All');
const isLoading: ComputedRef<boolean> = computed(() => productStore.loading);
const products: ComputedRef<ProductEntity[]> = computed(() => {
  console.log(tabValue.value);
  switch (tabValue.value) {
    case 'All':
      return take(shuffle(productStore.getProductsList().data), 5);

    case ProductTypeEnum.CPU:
      return take(productStore.getProductsCPU().data, 5);

    case ProductTypeEnum.GPU:
      return take(productStore.getProductsGPU().data, 5);

    case ProductTypeEnum.Motherboard:
      return take(productStore.getProductsMOTHERBOARDS().data, 5);

    case ProductTypeEnum.SSD:
      return take(productStore.getProductsSSD().data, 5);

    case ProductTypeEnum.HDD:
      return take(productStore.getProductsHDD().data, 5);

    case ProductTypeEnum.Cooler:
      return take(productStore.getProductsCOOLER().data, 5);

    case ProductTypeEnum.Case:
      return take(productStore.getProductsCASE().data, 5);

    case ProductTypeEnum.PowerSupply:
      return take(productStore.getProductsPOWERSUPPLY().data, 5);

    case ProductTypeEnum.RAM:
      return take(productStore.getProductsRAM().data, 5);

    default:
      return [];
  }
});

const updateTab = async (e: ProductTypeEnum | string) => {
  tabValue.value = e;
  if (e === 'All') {
    await productStore.list();
  } else {
    await productStore.productsByCategory(e as ProductTypeEnum);
  }
};

onMounted(async () => {
  await productStore.list();
});
</script>
<style scoped>
.title {
  margin-bottom: 0;
}
.title .n-text {
  margin-left: 12px;
  font-size: 1rem;
}
.slider {
  margin-top: 12px;
}
.slider .n-card {
  height: 100%;
}
</style>
