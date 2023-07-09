<template>
  <n-message-provider>
    <n-config-provider>
      <app-layout />
    </n-config-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import {
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
  NConfigProvider,
} from 'naive-ui';
import { AppLayout } from '@/layouts';
import { supabase } from './lib';
import { useProductStore, useOrdersStore } from '@/store';

const productStore = useProductStore();
const orderStore = useOrdersStore();
const products = supabase
  .channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'products' },
    async (payload) => {
      console.log('Change received!', payload);
      await productStore.list();
    }
  )
  .subscribe();

const orders = supabase
  .channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'orders' },
    async (payload) => {
      console.log('Change received!', payload);
      await orderStore.ordersList();
    }
  )
  .subscribe();
</script>

<style scoped></style>
