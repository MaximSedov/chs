<template>
  <n-space
    vertical
    :size="12"
  >
    <n-space>
      <n-input
        v-model:value="searchText"
        type="text"
        placeholder="Код, наименование"
        :loading="isLoading && searchText.length > 0"
      >
        <template #prefix>
          <n-icon :component="Search" />
        </template>
      </n-input>
      <n-button @click="load">
        Поиск
      </n-button>
      <n-button
        type="primary"
        strong
        @click="addProduct()"
      >
        <template #icon>
          <n-icon>
            <add-outline />
          </n-icon>
        </template>
        Новый товар
      </n-button>
    </n-space>

    <n-data-table
      ref="dataTableInstRef"
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
      :loading="isLoading"
      :row-props="rowProps"
    />
  </n-space>
  <admin-add-product-modal v-model:show="addProductModal" />
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineComponent, h, onMounted, ref } from 'vue';
import {
  NButton,
  NSpace,
  NDataTable,
  NInput,
  NIcon,
  NTag,
  NAvatar,
} from 'naive-ui';
import { supabase } from '@/lib';
import { useProductStore } from '@/store';
import { ProductsModeEnum } from '@/@enums';
import { ProductEntity } from '@/@types';
import { Search, AddOutline } from '@vicons/ionicons5';
import { format } from 'date-fns';
import { Amount } from 'amount-ts';
import { RowData } from 'naive-ui/es/data-table/src/interface';
import { AdminAddProductModal } from '@/components';
import { GetProductFormattedPrice, GetProductFormattedTitle } from '@/helpers';

const productStore = useProductStore();

const formatter: Amount = new Amount({
  thousand: ' ',
  suffix: ' ₽',
  decimals: 0,
});

const columns = [
  {
    title: 'ID',
    key: 'id',
    sorter: (row1: any, row2: any) => row1.id - row2.id,
    minWidth: 50,
  },
  {
    title: '',
    key: 'image',
    width: 40,
    render(row: any) {
      return h(NAvatar, {
        src: row?.image ? row.image : '',
        size: 'large',
        lazy: true,
        objectFit: 'contain',
      });
    },
  },
  {
    title: 'Код производителя',
    key: 'productSKU',
    minWidth: 150,
  },
  {
    title: 'Создано',
    key: 'createdAt',
    render(row: any) {
      return format(new Date(row.createdAt), 'dd-MM-yyyy HH:mm');
    },
  },
  {
    title: 'Наименование',
    key: 'title',
    render(row: any) {
      return GetProductFormattedTitle(row, true);
    },
  },
  {
    title: 'Цена',
    key: 'price',
    sorter: (row1: any, row2: any) => row1.price - row2.price,
    render(row: any) {
      return GetProductFormattedPrice(row.price);
    },
  },
  {
    title: 'Категория',
    key: 'category',
    render(row: any) {
      return row.category?.title;
    },
  },
  {
    title: 'Доступен для продаж',
    key: 'isAvailable',
    render(row: any) {
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: row.isAvailable ? 'success' : 'error',
          bordered: false,
        },
        {
          default: () => (row.isAvailable ? 'Да' : 'Нет'),
        }
      );
    },
  },
  /* {
    title: 'Описание',
    key: 'description',
    defaultSortOrder: false,
    width: 350,
    sorter: {
      compare: (a: any, b: any) => a.chinese - b.chinese,
      multiple: 3,
    },
  }, */
  /* {
      title: 'Address',
      key: 'address',
      filterOptions: [
        {
          label: 'London',
          value: 'London',
        },
        {
          label: 'New York',
          value: 'New York',
        },
      ],
      filter(value, row) {
        return ~row.address.indexOf(value);
      },
    }, */
] as any;

/*  const tableData = [
    {
      key: 0,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      chinese: 98,
      math: 60,
      english: 70,
    },
  ]; */

const isLoading: ComputedRef<boolean> = computed(() => productStore.loading);

const tableData: ComputedRef<ProductEntity[]> = computed(() => {
  const { data } = productStore.getProductsList();
  return data;
});

const dataTableInstRef = ref(null);
const searchText = ref('');
const pagination = ref({ pageSize: 50 });

/* const filterAddress = () => {
  dataTableInstRef.value.filter({
    address: ['London'],
  });
};

const sortName = () => {
  dataTableInstRef.value.sort('name', 'ascend');
};

const clearFilters = () => {
  dataTableInstRef.value.filter(null);
};

const clearSorter = () => {
  dataTableInstRef.value.sort(null);
}; */

const load = async () => {
  await productStore.list();
  /* const { data: products, error  } = await supabase.from('products').select()
    console.log(products) */
};

const rowProps = (row: RowData) => ({
  style: 'cursor: pointer;',
  onClick: rowClick,
});

const rowClick = () => {
  console.log('click');
};

const addProductModal = ref<boolean>(false);

const addProduct = () => {
  addProductModal.value = true;
};

onMounted(async () => {
  await productStore.list();
});
</script>
