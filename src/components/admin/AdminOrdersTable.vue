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
    </n-space>

    <n-data-table
      ref="dataTableInstRef"
      :columns="columns"
      :data="ordersData"
      :pagination="pagination"
      :loading="isLoading"
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
  NDropdown,
} from 'naive-ui';
import { supabase } from '@/lib';
import { useProductStore, useOrdersStore, useUserStore } from '@/store';
import { OrderStatusEnum, ProductsModeEnum } from '@/@enums';
import { OrderData, ProductEntity } from '@/@types';
import { Search, AddOutline } from '@vicons/ionicons5';
import { format } from 'date-fns';
import { Amount } from 'amount-ts';
import { RowData } from 'naive-ui/es/data-table/src/interface';
import { AdminAddProductModal, OrderProductGrid } from '@/components';
import {
  GetProductFormattedPrice,
  GetProductFormattedTitle,
  GetOrderStatusInString,
} from '@/helpers';

const productStore = useProductStore();
const orderStore = useOrdersStore();
const userStore = useUserStore();
const currentUserId: ComputedRef<string> = computed(
  () => userStore.current?.id ?? ''
);
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
    type: 'expand',
    expandable: (row: any) => true,
    renderExpand: (row: any) => {
      return h(OrderProductGrid, { order: row });
    },
  },
  /* {
      title: 'Код производителя',
      key: 'productSKU',
      minWidth: 150,
    }, */
  {
    title: 'Создано',
    key: 'createdAt',
    render(row: any) {
      return format(new Date(row.createdAt), 'dd-MM-yyyy HH:mm');
    },
  },
  {
    title: 'Кол-во товаров',
    key: 'products',
    render(row: any) {
      return row.products.length;
    },
  },
  {
    title: 'Стоимость',
    key: 'cost',
    sorter: (row1: any, row2: any) => row1.cost - row2.cost,
    render(row: any) {
      return GetProductFormattedPrice(row.cost);
    },
  },
  {
    title: 'ID клиента',
    key: 'userId',
    render(row: any) {
      return row.userId;
    },
  },
  {
    title: 'Email',
    key: 'email',
    render(row: any) {
      return row.email;
    },
  },
  {
    title: 'ID менеджера',
    key: 'managerId',
    render(row: any) {
      return row.managerId;
    },
  },
  {
    title: 'Статус',
    key: 'status',
    render(row: any) {
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: getStatusTextType(row.status),
          bordered: false,
        },
        {
          default: () => GetOrderStatusInString(row.status),
        }
      );
    },
  },
  {
    title: 'Действие',
    key: 'action',
    render(row: any) {
      return h(
        NDropdown,
        {
          trigger: 'hover',
          options: options(row),
          disabled:
            row.managerId !== null && currentUserId.value !== row.managerId,
          onSelect: (e) => handleSelect(e, row.id),
        },
        [
          h(
            NButton,
            {
              size: 'small',
              disabled:
                row.managerId !== null && currentUserId.value !== row.managerId,
              type:
                currentUserId.value === row.managerId ? 'primary' : 'default',
              onClick: () => console.log('click'),
            },
            {
              default: () =>
                row.managerId !== null && currentUserId.value !== row.managerId
                  ? 'Другой менеджер'
                  : currentUserId.value === row.managerId
                  ? 'Управление'
                  : 'Управлять',
            }
          ),
        ]
        /* {
            size: 'small',
            onClick: () => console.log('click')
          },
          { default: () => 'Управлять' } */
      );
    },
  },
  /* {
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
    }, */
] as any;

const isLoading: ComputedRef<boolean> = computed(() => productStore.loading);

const ordersData: ComputedRef<any> = computed(() => {
  const data = orderStore.getOrdersList();
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
  await orderStore.ordersList();
  /* const { data: products, error  } = await supabase.from('products').select()
      console.log(products) */
};

/* const rowProps = (row: RowData) => ({
    style: 'cursor: pointer;',
    onClick: rowClick,
  }); */

/*  const rowClick = () => {
    console.log('click');
  }; */

const options = (row: OrderData) => {
  return [
    {
      label: 'Взять заказ в работу',
      key: 'goWork',
      disabled: currentUserId.value === row.managerId,
    },
    {
      label: 'Отменить работу по заказу',
      key: 'cancelWork',
      disabled: currentUserId.value !== row.managerId,
    },

    {
      label: 'Сменить статус',
      key: 'changeStatus',
      disabled: currentUserId.value !== row.managerId,
      children: [
        {
          label: 'Подтвержден',
          key: OrderStatusEnum.Confirmed,
        },
        {
          label: 'В обработке',
          key: OrderStatusEnum.Processing,
        },
        {
          label: 'Доставлен',
          key: OrderStatusEnum.Shipped,
        },
        {
          label: 'Отменен',
          key: OrderStatusEnum.Canceled,
        },
      ],
    },
  ];
};

const handleSelect = async (key: string | number, orderId: number) => {
  console.log(key);
  switch (key) {
    case 'goWork':
      await orderStore.assignManagerToOrder(orderId, currentUserId.value);
      break;

    case 'cancelWork':
      await orderStore.unassignManagerFromOrder(orderId);
      break;

    case OrderStatusEnum.Confirmed:
    case OrderStatusEnum.Processing:
    case OrderStatusEnum.Shipped:
    case OrderStatusEnum.Canceled:
      await orderStore.changeOrderStatus(orderId, key);
      break;

    default:
      break;
  }
};

const addProductModal = ref<boolean>(false);

const addProduct = () => {
  addProductModal.value = true;
};

const getStatusTextType = (type: OrderStatusEnum) => {
  switch (type) {
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
};

onMounted(async () => {
  await orderStore.ordersList();
});
</script>
