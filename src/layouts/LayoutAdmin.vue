<template>
  <main>
    <admin-main-menu>
      <slot />
    </admin-main-menu>
  </main>
</template>

<script lang="ts" setup>
import { AdminMainMenu } from '@/components';
</script>

<style scoped>
main {
  height: 100vh;
}
</style>
