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
          :options="SSDManufacturer"
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
        label="Модель"
        path="productModel"
      >
        <n-input
          v-model:value="model.productModel"
          placeholder="Например, 980 Pro"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Стоимость (₽)"
        path="price"
      >
        <n-input-number
          v-model:value="model.price"
          :min="0"
          :step="500"
          placeholder="Например, 11 650"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="3"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Форм-фактор"
        path="productSSDFormFactor"
      >
        <n-select
          v-model:value="model.productSSDFormFactor"
          placeholder="Выберите"
          :options="SSDFormFactor"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Тип флеш-памяти"
        path="productFlashMemoryType"
      >
        <n-select
          v-model:value="model.productFlashMemoryType"
          placeholder="Выберите"
          :options="SSDFlashMemoryType"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Объем накопителя, Гб"
        path="productMemoryCapacity"
      >
        <n-input-number
          v-model:value="model.productMemoryCapacity"
          :min="0"
          :step="120"
          placeholder="Например, 1000"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="3"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Интерфейс"
        path="productInterface"
      >
        <n-select
          v-model:value="model.productInterface"
          placeholder="Выберите"
          :options="SSDInterface"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Скорость чтения, МБ/сек"
        path="productReadSpeed"
      >
        <n-input-number
          v-model:value="model.productReadSpeed"
          :min="0"
          :step="500"
          placeholder="Например, 7000"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Скорость записи, МБ/сек"
        path="productWriteSpeed"
      >
        <n-input-number
          v-model:value="model.productWriteSpeed"
          :min="0"
          :step="500"
          placeholder="Например, 5000"
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
  FormRules,
  FormInst,
  FormValidationError,
  useMessage,
  NGrid,
  NFormItemGridItem,
  NUpload,
  NUploadDragger,
  NText,
  NP,
  UploadFileInfo,
  NSpin,
} from 'naive-ui';
import { supabase } from '@/lib';
import { useProductStore } from '@/store';
import { ManufacturerEnum, ProductsModeEnum, ProductTypeEnum } from '@/@enums';
import { ProductEntity } from '@/@types';
import { Search, AddOutline, ArchiveOutline } from '@vicons/ionicons5';
import { format } from 'date-fns';
import { Amount } from 'amount-ts';
import { RowData } from 'naive-ui/es/data-table/src/interface';
import { cloneDeep } from 'lodash';

const productStore = useProductStore();
const isLoading: ComputedRef<boolean> = computed(() => productStore.loading);
const rules: FormRules = {
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
  productModel: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать модель диска',
  },

  productMemoryCapacity: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать объем',
  },
  productInterface: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать интерфейс',
  },
  productSSDFormFactor: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать форм-фактор',
  },
  productFlashMemoryType: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать тип памяти',
  },
  productReadSpeed: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать скорость чтения',
  },
  productWriteSpeed: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать скорость записи',
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
  type: ProductTypeEnum.SSD,
  category: 1,
  productSKU: null,
  price: null,
  manufacture: null,
  isAvailable: true,
  description: null,
  image: '',
  productModel: null,

  productMemoryCapacity: null,
  productInterface: null,
  productSSDFormFactor: null,
  productFlashMemoryType: null,
  productReadSpeed: null,
  productWriteSpeed: null,
};

const model = ref(cloneDeep(formModel));

const SSDManufacturer: ComputedRef<{ label: string; value: number }[]> =
  computed(() => [
    { label: 'Samsung', value: ManufacturerEnum.Samsung },
    { label: 'Intel', value: ManufacturerEnum.Intel },
    { label: 'AMD', value: ManufacturerEnum.AMD },
    { label: 'Gigabyte', value: ManufacturerEnum.Gigabyte },
    { label: 'Kingston', value: ManufacturerEnum.Kingston },
    { label: 'WD', value: ManufacturerEnum.WD },
    { label: 'Crucial', value: ManufacturerEnum.Crucial },
    { label: 'SanDisk', value: ManufacturerEnum.SanDisk },
  ]);

const SSDFlashMemoryType: ComputedRef<{ label: string; value: string }[]> =
  computed(() => [
    { label: 'TLC', value: 'TLC' },
    { label: 'MLC', value: 'MLC' },
    { label: 'SLC', value: 'SLC' },
    { label: 'QLC', value: 'QLC' },
  ]);

const SSDInterface: ComputedRef<{ label: string; value: string }[]> = computed(
  () => [
    { label: 'mSATA', value: 'mSATA' },
    { label: 'PCI-E 4.0 x4', value: 'PCI-E 4.0 x4' },
    { label: 'PCI-E x2', value: 'PCI-E x2' },
    { label: 'PCI-E x4', value: 'PCI-E x4' },
    { label: 'PCI-E x8', value: 'PCI-E x8' },
    { label: 'SATA', value: 'SATA' },
    { label: 'SATA-3', value: 'SATA-3' },
  ]
);

const SSDFormFactor: ComputedRef<{ label: string; value: string }[]> = computed(
  () => [
    { label: 'SATA', value: 'SATA' },
    { label: 'mSATA', value: 'mSATA' },
    { label: 'M.2', value: 'M.2' },
  ]
);

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
