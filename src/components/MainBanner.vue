<template>
  <n-carousel
    show-arrow
    autoplay
  >
    <img
      class="carousel-img"
      src="../assets/MainBanner/1.jpg"
    >
    <img
      class="carousel-img"
      src="../assets/MainBanner/2.jpg"
    >
    <img
      class="carousel-img"
      src="../assets/MainBanner/3.jpg"
    >
  </n-carousel>
</template>
<script setup lang="ts">
import { LayoutDefault } from '@/layouts';
import type { DrawerPlacement } from 'naive-ui';
import { computed, ref, ShallowRef } from 'vue';
import { NCarousel } from 'naive-ui';
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
} from '@vicons/ionicons5';
import { defineComponent, h, Component } from 'vue';
import type { MenuOption } from 'naive-ui';
const active = ref(false);
const selectedKey = ref('0');
const activate = () => {
  active.value = !active.value;
};
</script>
<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
