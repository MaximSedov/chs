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
          placeholder="Например, Fury Beast Black"
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
          placeholder="Например, 8300"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="3"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Общий объем комплекта, Гб"
        path="productMemoryCapacity"
      >
        <n-input-number
          v-model:value="model.productMemoryCapacity"
          :min="0"
          :step="2"
          placeholder="Например, 16"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Количество модулей в комплекте"
        path="productNumberOfModules"
      >
        <n-input-number
          v-model:value="model.productNumberOfModules"
          :min="0"
          :step="1"
          placeholder="Например, 2"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Объем одного модуля, Гб"
        path="productModuleCapacity"
      >
        <n-input-number
          v-model:value="model.productModuleCapacity"
          :min="0"
          :step="1"
          placeholder="Например, 2"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="3"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Тип памяти"
        path="productMemoryType"
      >
        <n-select
          v-model:value="model.productMemoryType"
          placeholder="Выберите"
          :options="RAMMemoryType"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Тактовая частота, МГц"
        path="productClockSpeed"
      >
        <n-input-number
          v-model:value="model.productClockSpeed"
          :min="0"
          :step="400"
          placeholder="Например, 3600"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Проп. способ., Мб/c"
        path="productBandwidth"
      >
        <n-input-number
          v-model:value="model.productBandwidth"
          :min="0"
          :step="1000"
          placeholder="Например, 25000"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="3"
      :x-gap="12"
    >
      <n-form-item-gi
        label="CAS Latency (CL) "
        path="productMemoryCL"
      >
        <n-input-number
          v-model:value="model.productMemoryCL"
          :min="0"
          :step="1"
          placeholder="Например, 16"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="RAS to CAS Delay (tRCD)"
        path="productMemoryTRCD"
      >
        <n-input-number
          v-model:value="model.productMemoryTRCD"
          :min="0"
          :step="1"
          placeholder="Например, 18"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Row Precharge Delay (tRP)"
        path="productMemoryTRP"
      >
        <n-input-number
          v-model:value="model.productMemoryTRP"
          :min="0"
          :step="1"
          placeholder="Например, 18"
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
    message: 'Необходимо указать модель памяти',
  },

  productClockSpeed: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать тактовую частоту',
  },
  productMemoryCapacity: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать объем',
  },
  productModuleCapacity: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать объем модуля',
  },
  productNumberOfModules: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать количество модулей',
  },
  productBandwidth: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать пропускную способность',
  },
  productMemoryType: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать тип памяти',
  },
  productMemoryCL: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать задержку CAS (CL)',
  },
  productMemoryTRCD: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать задержку RAS до CAS (tRCD)',
  },
  productMemoryTRP: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать задержку предварительной зарядки строки (tRP)',
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
  type: ProductTypeEnum.RAM,
  category: 1,
  productSKU: null,
  price: null,
  manufacture: null,
  isAvailable: true,
  description: null,
  image: '',
  productModel: null,

  productClockSpeed: null,
  productMemoryType: null,
  productMemoryCapacity: null,
  productModuleCapacity: null,
  productNumberOfModules: null,
  productBandwidth: null,
  productMemoryCL: null,
  productMemoryTRCD: null,
  productMemoryTRP: null,
};

const model = ref(cloneDeep(formModel));

const SSDManufacturer: ComputedRef<{ label: string; value: number }[]> =
  computed(() => [
    { label: 'Samsung', value: ManufacturerEnum.Samsung },
    { label: 'Corsair', value: ManufacturerEnum.Corsair },
    { label: 'AMD', value: ManufacturerEnum.AMD },
    { label: 'Kingston', value: ManufacturerEnum.Kingston },
    { label: 'Crucial', value: ManufacturerEnum.Crucial },
    { label: 'SanDisk', value: ManufacturerEnum.SanDisk },
  ]);

const RAMMemoryType: ComputedRef<{ label: string; value: string }[]> = computed(
  () => [
    { label: 'DDR3', value: 'DDR3' },
    { label: 'DDR4', value: 'DDR4' },
    { label: 'DDR5', value: 'DDR5' },
  ]
);

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
