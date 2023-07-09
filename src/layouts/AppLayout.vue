<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed, markRaw, ref, ShallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { LayoutDefault, LayoutMain, LayoutAdmin } from '@/layouts';

const route = useRoute();

const layout: ShallowRef = computed(() => {
  switch (route.meta.layout) {
    case 'LayoutMain':
      return LayoutMain;
    case 'LayoutDefault':
      return LayoutDefault;
    case 'LayoutAdmin':
      return LayoutAdmin;
    default:
      return LayoutDefault;
  }
});
</script>
