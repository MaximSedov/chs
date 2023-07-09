<template>
  <n-modal :close-on-esc="false">
    <n-card
      style="width: 600px"
      title="Новый продукт"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      header-style="padding:24px"
      content-style="padding:24px;"
      footer-style="padding:24px"
    >
      <template
        v-if="selectedType !== null"
        #header-extra
      >
        <n-a @click="resetType()">
          Выбрать другой тип
        </n-a>
      </template>
      <n-select
        v-if="selectedType === null"
        v-model:value="selectedType"
        placeholder="Выберите тип нового продукта"
        :options="types"
      />

      <add-CPU-form v-if="selectedType === ProductTypeEnum.CPU" />
      <add-GPU-form v-if="selectedType === ProductTypeEnum.GPU" />
      <add-CASE-form v-if="selectedType === ProductTypeEnum.Case" />
      <add-SSD-form v-if="selectedType === ProductTypeEnum.SSD" />
      <add-RAM-form v-if="selectedType === ProductTypeEnum.RAM" />
      <add-COOLER-form v-if="selectedType === ProductTypeEnum.Cooler" />
      <add-MOTHERBOARD-form
        v-if="selectedType === ProductTypeEnum.Motherboard"
      />
      <add-HDD-form v-if="selectedType === ProductTypeEnum.HDD" />
      <add-POWERSUPPLY-form
        v-if="selectedType === ProductTypeEnum.PowerSupply"
      />
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
import {
  AddCPUForm,
  AddGPUForm,
  AddCASEForm,
  AddPOWERSUPPLYForm,
  AddSSDForm,
  AddHDDForm,
  AddRAMForm,
  AddCOOLERForm,
  AddMOTHERBOARDForm,
} from '@/components';

const productStore = useProductStore();

const types: ComputedRef<{ label: string; value: ProductTypeEnum }[]> =
  computed(() => [
    { label: 'Процессор', value: ProductTypeEnum.CPU },
    { label: 'Видеокарта', value: ProductTypeEnum.GPU },
    { label: 'Кулер', value: ProductTypeEnum.Cooler },
    { label: 'Корпус', value: ProductTypeEnum.Case },
    { label: 'Блок питания', value: ProductTypeEnum.PowerSupply },
    { label: 'Материнская плата', value: ProductTypeEnum.Motherboard },
    { label: 'Оперативная память', value: ProductTypeEnum.RAM },
    { label: 'Жесткий диск', value: ProductTypeEnum.HDD },
    { label: 'SSD Накопитель', value: ProductTypeEnum.SSD },
    /* { label: 'Корпусный вентилятор', value: ProductTypeEnum.CaseCooler },
    { label: 'Термопаста', value: ProductTypeEnum.ThermalPaste },
    { label: 'Водяное охлаждение', value: ProductTypeEnum.LuquidCooling },
    { label: 'Моддинг', value: ProductTypeEnum.Modding }, */
  ]);

const selectedType = ref<any>(null);
const resetType = () => {
  selectedType.value = null;
};
</script>
