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
          :options="GPUManufacturer"
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
        label="Производитель видеоядра"
        path="productGPUCoreManufacture"
      >
        <n-select
          v-model:value="model.productGPUCoreManufacture"
          placeholder="Выберите"
          :options="GPUCoreManufacturer"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Серия"
        path="productLine"
      >
        <n-select
          v-model:value="model.productLine"
          placeholder="Выберите"
          :options="
            model.productGPUCoreManufacture === ManufacturerEnum.AMD
              ? GPULineAMD
              : GPULineNvidia
          "
        />
      </n-form-item-gi>
    </n-grid>

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
        label="Интерфейс"
        path="productInterface"
      >
        <n-select
          v-model:value="model.productInterface"
          placeholder="Выберите"
          :options="GPUInterfaces"
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
        label="Тип памяти"
        path="productMemoryType"
      >
        <n-select
          v-model:value="model.productMemoryType"
          placeholder="Выберите"
          :options="GPUMemoryTypes"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Объем памяти (ГБ)"
        path="productMemoryCapacity"
      >
        <n-input-number
          v-model:value="model.productMemoryCapacity"
          :min="2"
          :step="2"
          placeholder="Например, 8"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Шина памяти (бит)"
        path="productMemoryBus"
      >
        <n-select
          v-model:value="model.productMemoryBus"
          placeholder="Выберите"
          :options="GPUMemoryBus"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Пропускная способность (ГБ/с)"
        path="productBandwidth"
      >
        <n-input-number
          v-model:value="model.productBandwidth"
          :min="10"
          :step="10"
          placeholder="Например, 128"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Кодовое название графического процессора"
        path="productCodeNameOfGraphicsProcessor"
      >
        <n-select
          v-model:value="model.productCodeNameOfGraphicsProcessor"
          placeholder="Выберите"
          filterable
          :options="GPUCodeNameOfGraphicsProcessor"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Частота графического процессора (МГц)"
        path="productClockSpeed"
      >
        <n-input-number
          v-model:value="model.productClockSpeed"
          :min="1000"
          :step="10"
          placeholder="Например, 2500"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Реком. мощность БП (Вт)"
        path="productRecommendedPowerSupplyCapacity"
      >
        <n-input-number
          v-model:value="model.productRecommendedPowerSupplyCapacity"
          :min="250"
          :step="25"
          placeholder="Например, 560"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Разъём дополнительного питания (Пин)"
        path="productOptionalPowerConnector"
      >
        <n-select
          v-model:value="model.productOptionalPowerConnector"
          placeholder="Выберите"
          :options="GPUOptionalPowerConnectors"
          clearable
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Количество поддерживаемых мониторов"
        path="productNumberOfMonitors"
      >
        <n-input-number
          v-model:value="model.productNumberOfMonitors"
          :min="1"
          :step="1"
          placeholder="Например, 2"
        />
      </n-form-item-gi>

      <n-form-item-gi
        label="Максимальное формируемое разрешение (px)"
        path="productMaxResolution"
      >
        <n-select
          v-model:value="model.productMaxResolution"
          placeholder="Выберите"
          :options="GPUMaxResolution"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Количество HDMI коннекторов"
        path="productHDMIConnectors"
      >
        <n-input-number
          v-model:value="model.productHDMIConnectors"
          :min="0"
          :step="1"
          placeholder="Например, 1"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Количество DisplayPort коннекторов"
        path="productDPConnectors"
      >
        <n-input-number
          v-model:value="model.productDPConnectors"
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
        label="Ширина (мм)"
        path="productSizeWidth"
      >
        <n-input-number
          v-model:value="model.productSizeWidth"
          :min="1"
          :step="10"
          placeholder="Например, 280"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Высота (мм)"
        path="productSizeHeight"
      >
        <n-input-number
          v-model:value="model.productSizeHeight"
          :min="1"
          :step="10"
          placeholder="Например, 117"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Глубина (мм)"
        path="productSizeDepth"
      >
        <n-input-number
          v-model:value="model.productSizeDepth"
          :min="1"
          :step="10"
          placeholder="Например, 41"
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
  productLine: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо выбрать серию видеокарты',
  },
  productClockSpeed: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Заполните тактовую частоту видеокарты',
  },
  productTechnologicalProcess: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Заполните техпроцесс',
  },
  productGPUCoreManufacture: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Выберите производителя видеоядра',
  },
  productMemoryType: {
    type: 'string',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Выберите тип памяти',
  },
  productMemoryCapacity: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните объем памяти',
  },
  productInterface: {
    type: 'string',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Выберите интерфейс',
  },
  productBandwidth: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните пропускную способность',
  },
  productMemoryBus: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Выберите шину памяти',
  },
  productCodeNameOfGraphicsProcessor: {
    type: 'string',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Выберите кодовое название',
  },
  productRecommendedPowerSupplyCapacity: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните рекомендую мощность БП',
  },
  productOptionalPowerConnector: {
    type: 'string',
    required: false,
    trigger: ['blur', 'input'],
    message: 'Выберите кол-во доп. питания',
  },
  productMaxResolution: {
    type: 'string',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Выберите максимальное поддерживаемое разрешение',
  },
  productNumberOfMonitors: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните количество поддерживаемых мониторов',
  },
  productSizeWidth: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните ширину',
  },
  productSizeHeight: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните высоту',
  },
  productSizeDepth: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните глубину',
  },
  productHDMIConnectors: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните кол-во HDMI коннекторов',
  },
  productDPConnectors: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Заполните кол-во DP коннекторов',
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
  type: ProductTypeEnum.GPU,
  category: 1,
  productSKU: null,
  price: null,
  manufacture: null,
  isAvailable: true,
  description: null,
  image: '',
  productLine: null,

  productGPUCoreManufacture: null,
  productClockSpeed: null,
  productTechnologicalProcess: null,
  productMemoryType: null,
  productMemoryCapacity: null,
  productBandwidth: null,
  productInterface: null,
  productMemoryBus: null,
  productCodeNameOfGraphicsProcessor: null,
  productRecommendedPowerSupplyCapacity: null,
  productOptionalPowerConnector: null,
  productMaxResolution: null,
  productNumberOfMonitors: null,
  productSizeWidth: null,
  productSizeHeight: null,
  productSizeDepth: null,
  productHDMIConnectors: null,
  productDPConnectors: null,
};

const model = ref(cloneDeep(formModel));

const GPUCoreManufacturer: ComputedRef<{ label: string; value: number }[]> =
  computed(() => [
    { label: 'AMD', value: ManufacturerEnum.AMD },
    { label: 'NVIDIA', value: ManufacturerEnum.Nvidia },
  ]);

const GPUManufacturer: ComputedRef<{ label: string; value: number }[]> =
  computed(() => [
    { label: 'MSI', value: ManufacturerEnum.MSI },
    { label: 'Gigabyte', value: ManufacturerEnum.Gigabyte },
    { label: 'Palit', value: ManufacturerEnum.Palit },
  ]);

const GPULineNvidia: ComputedRef<
  { label: string; value: string; manufacture: any }[]
> = computed(() => [
  {
    label: 'GeForce GTX 1050 Ti',
    value: 'GeForce GTX 1050 Ti',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce GTX 1650',
    value: 'GeForce GTX 1650',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce GTX 1660',
    value: 'GeForce GTX 1660',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce GTX 1660 Ti',
    value: 'GeForce GTX 1660 Ti',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 2060',
    value: 'GeForce RTX 2060',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 2060 Super',
    value: 'GeForce RTX 2060 Super',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 3050',
    value: 'GeForce RTX 3050',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 3060',
    value: 'GeForce RTX 3060',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 3060 Ti',
    value: 'GeForce RTX 3060 Ti',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 3070',
    value: 'GeForce RTX 3070',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 3070 Ti',
    value: 'GeForce RTX 3070 Ti',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 3080',
    value: 'GeForce RTX 3080',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 3090',
    value: 'GeForce RTX 3090',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 3090 Ti',
    value: 'GeForce RTX 3090 Ti',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 4070',
    value: 'GeForce RTX 4070',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 4070 Ti',
    value: 'GeForce RTX 4070 Ti',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 4080',
    value: 'GeForce RTX 4080',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 4080 Ti',
    value: 'GeForce RTX 4080 Ti',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
  {
    label: 'GeForce RTX 4090',
    value: 'GeForce RTX 4090',
    manufacture: { id: ManufacturerEnum.Nvidia, title: 'NVIDIA' },
  },
]);

const GPULineAMD: ComputedRef<
  { label: string; value: string; manufacture: any }[]
> = computed(() => [
  {
    label: 'Radeon RX 550',
    value: 'Radeon RX 550',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 560',
    value: 'Radeon RX 560',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 6400',
    value: 'Radeon RX 6400',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 6500 XT',
    value: 'Radeon RX 6500 XT',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 6600',
    value: 'Radeon RX 6600',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 6650 XT',
    value: 'Radeon RX 6650 XT',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 6700',
    value: 'Radeon RX 6700',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 6700 XT',
    value: 'Radeon RX 6700 XT',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 6800',
    value: 'Radeon RX 6800',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 6800 XT',
    value: 'Radeon RX 6800 XT',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 6900',
    value: 'Radeon RX 6900',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 6900 XT',
    value: 'Radeon RX 6900 XT',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 7900 XT',
    value: 'Radeon RX 7900 XT',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
  {
    label: 'Radeon RX 7900 XTX',
    value: 'Radeon RX 7900 XTX',
    manufacture: { id: ManufacturerEnum.AMD, title: 'AMD' },
  },
]);

const GPUMemoryTypes: ComputedRef<{ label: string; value: string }[]> =
  computed(() => [
    { label: 'DDR3', value: 'DDR3' },
    { label: 'DDR4', value: 'DDR4' },
    { label: 'GDDR5', value: 'GDDR5' },
    { label: 'GDDR6', value: 'GDDR6' },
    { label: 'GDDR6X', value: 'GDDR6X' },
  ]);

const GPUInterfaces: ComputedRef<{ label: string; value: string }[]> = computed(
  () => [
    { label: 'PCI Express 2.0', value: 'PCI Express 2.0' },
    { label: 'PCI Express 3.0', value: 'PCI Express 3.0' },
    { label: 'PCI Express 4.0', value: 'PCI Express 4.0' },
  ]
);

const GPUMemoryBus: ComputedRef<{ label: string; value: number }[]> = computed(
  () => [
    { label: '64', value: 64 },
    { label: '96', value: 96 },
    { label: '128', value: 128 },
    { label: '160', value: 160 },
    { label: '192', value: 192 },
    { label: '256', value: 256 },
    { label: '320', value: 320 },
    { label: '384', value: 384 },
  ]
);

const GPUCodeNameOfGraphicsProcessor: ComputedRef<
  { label: string; value: string }[]
> = computed(() => [
  { label: 'AD102', value: 'AD102' },
  { label: 'GA102', value: 'GA102' },
  { label: 'GA104', value: 'GA104' },
  { label: 'GA106', value: 'GA106' },
  { label: 'GA107', value: 'GA107' },
  { label: 'GA108', value: 'GA108' },
  { label: 'TU102', value: 'TU102' },
  { label: 'TU104', value: 'TU104' },
  { label: 'TU106', value: 'TU106' },
  { label: 'TU116', value: 'TU116' },
  { label: 'TU117', value: 'TU117' },
  { label: 'TU118', value: 'TU118' },
  { label: 'TU119', value: 'TU119' },
  { label: 'TU120', value: 'TU120' },
  { label: 'TU124', value: 'TU124' },
  { label: 'TU142', value: 'TU142' },
  { label: 'TU104-400A-A1', value: 'TU104-400A-A1' },
  { label: 'GA104-300', value: 'GA104-300' },
  { label: 'GA106-302', value: 'GA106-302' },
  { label: 'GA107-303', value: 'GA107-303' },
  { label: 'GA107-306', value: 'GA107-306' },
  { label: 'GA107-400', value: 'GA107-400' },
  { label: 'GA107M', value: 'GA107M' },
  { label: 'GA108-302', value: 'GA108-302' },
  { label: 'GA108M', value: 'GA108M' },
  { label: 'TU102-875-A1', value: 'TU102-875-A1' },
  { label: 'TU102-875M-B', value: 'TU102-875M-B' },
  { label: 'TU102-875M-A', value: 'TU102-875M-A' },
  { label: 'TU102-850-A1', value: 'TU102-850-A1' },
  { label: 'TU102-850M-B', value: 'TU102-850M-B' },
  { label: 'TU102-850M-A', value: 'TU102-850M-A' },
  { label: 'GV100', value: 'GV100' },
  { label: 'GV102', value: 'GV102' },
  { label: 'GV104', value: 'GV104' },
  { label: 'GV106', value: 'GV106' },
  { label: 'GP100', value: 'GP100' },
  { label: 'GP102', value: 'GP102' },
  { label: 'GP104', value: 'GP104' },
  { label: 'GP106', value: 'GP106' },
  { label: 'GP107', value: 'GP107' },
  { label: 'GP108', value: 'GP108' },
  { label: 'GM100', value: 'GM100' },
  { label: 'GM200', value: 'GM200' },
  { label: 'GM204', value: 'GM204' },
  { label: 'GM206', value: 'GM206' },
  { label: 'GM107', value: 'GM107' },
  { label: 'GM108', value: 'GM108' },
  { label: 'TU116-300-A1', value: 'TU116-300-A1' },
  { label: 'TU116-400-A1', value: 'TU116-400-A1' },
  { label: 'TU116-550-A1', value: 'TU116-550-A1' },
  { label: 'TU116-650-A1', value: 'TU116-650-A1' },
  { label: 'TU116M', value: 'TU116M' },
  { label: 'TU117-300-A1', value: 'TU117-300-A1' },
  { label: 'TU117-400-A1', value: 'TU117-400-A1' },
  { label: 'TU117M', value: 'TU117M' },
  { label: 'TU118-300-A1', value: 'TU118-300-A1' },
  { label: 'TU118-400-A1', value: 'TU118-400-A1' },
  { label: 'TU118M', value: 'TU118M' },
  { label: 'TU119-300-A1', value: 'TU119-300-A1' },
  { label: 'TU119-400-A1', value: 'TU119-400-A1' },
  { label: 'TU119M', value: 'TU119M' },
  { label: 'TU104-300A-K1-A1', value: 'TU104-300A-K1-A1' },
  { label: 'TU104-400A-K1-A1', value: 'TU104-400A-K1-A1' },
  { label: 'TU104M', value: 'TU104M' },
  { label: 'TU102-300-K1-A1', value: 'TU102-300-K1-A1' },
  { label: 'TU102M', value: 'TU102M' },
  { label: 'Navi 21', value: 'Navi 21' },
  { label: 'Navi 22', value: 'Navi 22' },
  { label: 'Navi 23', value: 'Navi 23' },
  { label: 'Navi 24', value: 'Navi 24' },
  { label: 'Navi 31', value: 'Navi 31' },
]);

const GPUOptionalPowerConnectors: ComputedRef<
  { label: string; value: string }[]
> = computed(() => [
  { label: '6', value: '6' },
  { label: '2x6', value: '2x6' },
  { label: '8', value: '8' },
  { label: '2x8', value: '2x8' },
  { label: '6+8', value: '6+8' },
  { label: '3x8', value: '3x8' },
  { label: '16', value: '16' },
]);

const GPUMaxResolution: ComputedRef<{ label: string; value: string }[]> =
  computed(() => [
    { label: '2560x1600', value: '2560x1600' },
    { label: '3840x2160', value: '3840x2160' },
    { label: '4096x2160', value: '4096x2160' },
    { label: '5120x2880', value: '5120x2880' },
    { label: '7680x4320', value: '7680x4320' },
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
