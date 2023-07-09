<template>
  <n-modal>
    <n-card
      style="width: 600px"
      title="Обновление данных профиля"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      header-style="padding:24px"
      content-style="padding:24px;"
      footer-style="padding:24px"
    >
      <update-user-info />
    </n-card>
  </n-modal>
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
  NModal,
  NCard,
  NForm,
  NFormItem,
  NSelect,
  NFormItemGi,
  NInputNumber,
  NCheckbox,
  NCheckboxGroup,
  NRadio,
  NRadioButton,
  NRadioGroup,
  NSlider,
  FormItemRule,
  NSwitch,
  NA,
} from 'naive-ui';
import { supabase } from '@/lib';
import { useProductStore } from '@/store';
import { ProductsModeEnum, ProductTypeEnum } from '@/@enums';
import { ProductEntity } from '@/@types';
import { Search, AddOutline } from '@vicons/ionicons5';
import { format } from 'date-fns';
import { Amount } from 'amount-ts';
import { RowData } from 'naive-ui/es/data-table/src/interface';
import { AddCPUForm, AddGPUForm, UpdateUserInfo } from '@/components';
</script>
