<template>
  <n-layout>
    <n-layout-content content-style="padding: 12px;padding-inline:24px;">
      <n-h2>Пользователи</n-h2>
      <admin-users-table />
    </n-layout-content>
  </n-layout>
  <n-back-top
    :right="40"
    :visibility-height="500"
  />
</template>
<script setup lang="ts">
import {
  NResult,
  NCard,
  NTab,
  NTabPane,
  NTabs,
  NText,
  NCarousel,
  NImage,
  NBadge,
  NBackTop,
} from 'naive-ui';
import { AdminUsersTable } from '@/components';
</script>
<style scoped>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
