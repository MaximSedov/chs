<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    label-placement="top"
    require-mark-placement="right-hanging"
    label-width="auto"
    :disabled="isLoading"
  >
    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Производитель"
        path="manufacture"
      >
        <n-select
          v-model:value="model.manufacture"
          placeholder="Выберите"
          :options="CPUManufacturer"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Код производителя"
        path="productSKU"
      >
        <n-input
          v-model:value="model.productSKU"
          placeholder="Например, CM8071504555317"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Линейка"
        path="productLine"
      >
        <n-select
          v-model:value="model.productLine"
          placeholder="Выберите"
          :options="model.manufacture === 1 ? CPULineIntel : CPULineAMD"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Модель"
        path="productModel"
      >
        <n-input
          v-model:value="model.productModel"
          placeholder="Например, 13700k или 5800x"
        />
      </n-form-item-gi>
    </n-grid>

    <n-form-item
      label="Socket"
      path="productSocket"
    >
      <n-select
        v-model:value="model.productSocket"
        placeholder="Выберите"
        :options="model.manufacture === 1 ? CPUSocketIntel : CPUSocketAMD"
      />
    </n-form-item>

    <n-form-item
      label="Стоимость (₽)"
      path="price"
    >
      <n-input-number
        v-model:value="model.price"
        :min="0"
        :step="500"
        placeholder="Например, 11 650"
      />
    </n-form-item>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Количество ядер"
        path="productNumberOfCores"
      >
        <n-input-number
          v-model:value="model.productNumberOfCores"
          :min="2"
          :max="128"
          :step="2"
          placeholder="Например, 6"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Количество потоков"
        path="productNumberOfThreads"
      >
        <n-input-number
          v-model:value="model.productNumberOfThreads"
          :min="2"
          :max="128"
          :step="2"
          placeholder="Например, 12"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Тактовая частота (МГц)"
        path="productClockSpeed"
      >
        <n-input-number
          v-model:value="model.productClockSpeed"
          :min="1000"
          :step="10"
          placeholder="Например, 2500"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Техпроцесс (нм)"
        path="productTechnologicalProcess"
      >
        <n-input-number
          v-model:value="model.productTechnologicalProcess"
          :min="2"
          :step="2"
          placeholder="Например, 10"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Макс. рабочая температура (°C)"
        path="productMaximumOperatingTemperature"
      >
        <n-input-number
          v-model:value="model.productMaximumOperatingTemperature"
          :min="45"
          :step="5"
          placeholder="Например, 100"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Тепловыделение (Вт)"
        path="productHeatOutput"
      >
        <n-input-number
          v-model:value="model.productHeatOutput"
          :min="45"
          :step="5"
          placeholder="Например, 117"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="4"
      :x-gap="12"
    >
      <n-form-item-gi
        span="3"
        label="Описание"
        path="description"
      >
        <n-input
          v-model:value="model.description"
          placeholder="Краткое описание продукта"
          type="textarea"
          :autosize="{
            minRows: 3.67,
            maxRows: 3.67,
          }"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Изображение"
        path="image"
      >
        <n-spin :show="fileIsLoading">
          <n-upload
            v-model:file-list="fileList"
            list-type="image-card"
            directory-dnd
            :max="1"
            accept="image/*"
            @update-file-list="onNewFile($event)"
          >
            <n-upload-dragger>
              <n-text> Выбор изображения </n-text>
            </n-upload-dragger>
          </n-upload>
        </n-spin>
      </n-form-item-gi>
    </n-grid>

    <n-form-item
      label="Доступен к продаже"
      path="isAvailable"
    >
      <n-switch v-model:value="model.isAvailable" />
    </n-form-item>

    <div style="display: flex; justify-content: space-between">
      <n-button
        :disabled="isLoading"
        strong
        secondary
        type="tertiary"
        @click="resetForm()"
      >
        Очистить поля
      </n-button>
      <n-button
        :disabled="isLoading || fileIsLoading"
        type="primary"
        @click="submitForm"
      >
        Сохранить новый продукт
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import {
  NButton,
  NInput,
  NForm,
  NFormItem,
  NSelect,
  NFormItemGi,
  NInputNumber,
  NSwitch,
  FormRules,
  FormInst,
  FormValidationError,
  useMessage,
  NGrid,
  NUpload,
  NUploadDragger,
  NText,
  UploadFileInfo,
  NSpin,
} from 'naive-ui';
import { useProductStore } from '@/store';
import { ProductsModeEnum, ProductTypeEnum } from '@/@enums';
import { ProductEntity } from '@/@types';
import { cloneDeep } from 'lodash';

const productStore = useProductStore();
const isLoading: ComputedRef<boolean> = computed(() => productStore.loading);
const rules: FormRules = {
  productModel: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните модель процессора',
  },
  image: {
    type: 'string',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Загрузите изображение',
  },
  productSKU: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните код производителя',
  },
  description: {
    required: false,
  },
  manufacture: {
    required: true,
    type: 'number',
    trigger: ['blur', 'change'],
    message: 'Необходимо выбрать производителя',
  },
  price: {
    required: true,
    type: 'number',
    trigger: ['blur', 'change'],
    message: 'Необходимо указать стоимость',
  },
  productLine: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо выбрать линейку процессора',
  },
  productSocket: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо выбрать сокет процессора',
  },
  productNumberOfCores: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Заполните количество ядер',
  },
  productNumberOfThreads: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Заполните количество потоков',
  },
  productClockSpeed: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Заполните тактовую частоту процессора',
  },
  productTechnologicalProcess: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Заполните техпроцесс',
  },
  productMaximumOperatingTemperature: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Заполните максимальную рабочую температуру',
  },
  productHeatOutput: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Заполните типичное тепловыделение',
  },
};

const fileList = ref<any>([]);
const fileIsLoading = ref<boolean>(false);

const onNewFile = async (files: UploadFileInfo[]) => {
  if (files.length > 0) {
    fileIsLoading.value = true;
    const result = await productStore.uploadFile(files[0]?.file);
    if (result !== undefined && result !== null) {
      fileIsLoading.value = false;
      model.value.image = result;
    } else {
      fileList.value = [];
      fileIsLoading.value = false;
      message.error(
        'При загрузке изображения возникла ошибка, попробуйте еще раз!'
      );
    }
  }
};

const formModel = {
  type: ProductTypeEnum.CPU,
  category: 1,
  productSKU: null,
  price: null,
  manufacture: null,
  isAvailable: true,
  description: null,
  productModel: null,
  productLine: null,
  productSocket: null,
  productNumberOfCores: null,
  productNumberOfThreads: null,
  productClockSpeed: null,
  productTechnologicalProcess: null,
  productMaximumOperatingTemperature: null,
  productHeatOutput: null,
  image: '',
};

const model = ref(cloneDeep(formModel));

const CPUManufacturer: ComputedRef<{ label: string; value: number }[]> =
  computed(() => [
    { label: 'INTEL', value: 1 },
    { label: 'AMD', value: 4 },
  ]);

const CPULineAMD: ComputedRef<
  { label: string; value: string; manufacture: any }[]
> = computed(() => [
  {
    label: 'A10-Series',
    value: 'A10-Series',
    manufacture: { id: 4, title: { id: 4, title: 'AMD' } },
  },
  {
    label: 'A6-Series',
    value: 'A6-Series',
    manufacture: { id: 4, title: 'AMD' },
  },
  {
    label: 'A8-Series',
    value: 'A8-Series',
    manufacture: { id: 4, title: 'AMD' },
  },
  { label: 'Athlon', value: 'Athlon X2', manufacture: { id: 4, title: 'AMD' } },
  { label: 'Ryzen 3', value: 'Ryzen 3', manufacture: { id: 4, title: 'AMD' } },
  {
    label: 'Ryzen 3 PRO',
    value: 'Ryzen 3 PRO',
    manufacture: { id: 4, title: 'AMD' },
  },
  { label: 'Ryzen 5', value: 'Ryzen 5', manufacture: { id: 4, title: 'AMD' } },
  {
    label: 'Ryzen 5 PRO',
    value: 'Ryzen 5 PRO',
    manufacture: { id: 4, title: 'AMD' },
  },
  { label: 'Ryzen 7', value: 'Ryzen 7', manufacture: { id: 4, title: 'AMD' } },
  {
    label: 'Ryzen 7 PRO',
    value: 'Ryzen 7 PRO',
    manufacture: { id: 4, title: 'AMD' },
  },
  { label: 'Ryzen 9', value: 'Ryzen 9', manufacture: { id: 4, title: 'AMD' } },
  {
    label: 'Ryzen Threadripper',
    value: 'Ryzen Threadripper',
    manufacture: { id: 4, title: 'AMD' },
  },
  {
    label: 'Ryzen Threadripper PRO',
    value: 'Ryzen Threadripper PRO',
    manufacture: { id: 4, title: 'AMD' },
  },
]);

const CPULineIntel: ComputedRef<
  { label: string; value: string; manufacture: any }[]
> = computed(() => [
  {
    label: 'Celeron',
    value: 'Celeron',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'Celeron Dual-Core',
    value: 'Celeron Dual-Core',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'Core i3',
    value: 'Core i3',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'Core i5',
    value: 'Core i5',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'Core i7',
    value: 'Core i7',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'Core i9',
    value: 'Core i9',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'Pentium Dual-Core',
    value: 'Pentium Dual-Core',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'Pentium Gold',
    value: 'Pentium Gold',
    manufacture: { id: 1, title: 'INTEL' },
  },
]);

const CPUSocketAMD: ComputedRef<
  { label: string; value: string; manufacture: any }[]
> = computed(() => [
  { label: 'AM4', value: 'AM4', manufacture: { id: 4, title: 'AMD' } },
  { label: 'AM5', value: 'AM5', manufacture: { id: 4, title: 'AMD' } },
  { label: 'FM2', value: 'FM2', manufacture: { id: 4, title: 'AMD' } },
]);

const CPUSocketIntel: ComputedRef<
  { label: string; value: string; manufacture: any }[]
> = computed(() => [
  {
    label: 'LGA 1150',
    value: 'LGA 1150',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'LGA 1151',
    value: 'LGA 1151',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'LGA 1151 v2',
    value: 'LGA 1151 v2',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'LGA 1155',
    value: 'LGA 1155',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'LGA 1200',
    value: 'LGA 1200',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'LGA 1700',
    value: 'LGA 1700',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'LGA 2011-3',
    value: 'LGA 2011-3',
    manufacture: { id: 1, title: 'INTEL' },
  },
  {
    label: 'LGA 2066',
    value: 'LGA 2066',
    manufacture: { id: 1, title: 'INTEL' },
  },
]);

const formRef = ref<FormInst | null>(null);
const message = useMessage();

const resetForm = () => {
  formRef.value?.restoreValidation();
  fileList.value = [];
  model.value = cloneDeep(formModel);
};

const submitForm = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        const result = await productStore.addNewProduct(model.value);
        if (!result) {
          message.error(
            'При добавлении товара возникла ошибка! Возможно, такой товар уже существует'
          );
        } else {
          message.success('Новый товар успешно добавлен');
          resetForm();
        }
      }
    }
  );
};
</script>

<style scoped>
.n-input-number {
  width: 100%;
}
.n-upload-trigger.n-upload-trigger--image-card {
  height: 103px;
}
</style>
