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
          :options="PSManufacturer"
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
          placeholder="Например, Ion+ 2"
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
        label="Стандарт"
        path="productStandart"
      >
        <n-select
          v-model:value="model.productStandart"
          placeholder="Выберите"
          :options="PSStandart"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Сертификат"
        path="productСertificate"
      >
        <n-select
          v-model:value="model.productСertificate"
          placeholder="Выберите"
          :options="PSCertificate"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Мощность, Вт"
        path="productCapacity"
      >
        <n-input-number
          v-model:value="model.productCapacity"
          :min="200"
          :step="50"
          placeholder="Например, 650"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="3"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Количество разъёмов 4+4-pin CPU"
        path="productNumberOfCPUConnectors"
      >
        <n-input-number
          v-model:value="model.productNumberOfCPUConnectors"
          :min="0"
          :step="1"
          placeholder="Например, 1"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Количество разъёмов 6+2-pin PCI-E"
        path="productNumberOfPCIEConnectors"
      >
        <n-input-number
          v-model:value="model.productNumberOfPCIEConnectors"
          :min="0"
          :step="1"
          placeholder="Например, 1"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Количество разъёмов 15-pin SATA"
        path="productNumberOfSATAConnectors"
      >
        <n-input-number
          v-model:value="model.productNumberOfSATAConnectors"
          :min="0"
          :step="1"
          placeholder="Например, 1"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Отстёгивающиеся кабели"
        path="productDetachableCables"
      >
        <n-switch v-model:value="model.productDetachableCables" />
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
    message: 'Необходимо указать модель блока питания',
  },

  productStandart: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать стандарт блока питания',
  },
  productCapacity: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать мощность блока питания',
  },
  productСertificate: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать сертификат блока питания',
  },
  productNumberOfCPUConnectors: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать количество разъёмов 4+4-pin CPU',
  },
  productNumberOfPCIEConnectors: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать количество разъёмов 6+2-pin PCI-E',
  },
  productNumberOfSATAConnectors: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать количество разъёмов 15-pin SATA',
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
  type: ProductTypeEnum.PowerSupply,
  category: 1,
  productSKU: null,
  price: null,
  manufacture: null,
  isAvailable: true,
  description: null,
  image: '',
  productModel: null,

  productStandart: null,
  productCapacity: null,
  productСertificate: null,
  productDetachableCables: false,
  productNumberOfCPUConnectors: null,
  productNumberOfPCIEConnectors: null,
  productNumberOfSATAConnectors: null,
};

const model = ref(cloneDeep(formModel));

const PSManufacturer: ComputedRef<{ label: string; value: number }[]> =
  computed(() => [
    { label: 'Thermaltake', value: ManufacturerEnum.Thermaltake },
    { label: 'Corsair', value: ManufacturerEnum.Corsair },
    { label: 'Zalman', value: ManufacturerEnum.Zalman },
    { label: 'Be Quiet', value: ManufacturerEnum.BeQuiet },
    { label: 'Fractal Design', value: ManufacturerEnum.FractalDesign },
    { label: 'Chieftec', value: ManufacturerEnum.Chieftec },
  ]);

const PSStandart: ComputedRef<{ label: string; value: string }[]> = computed(
  () => [
    { label: 'ATX12V', value: 'ATX12V' },
    { label: 'ATX12V 2.0', value: 'ATX12V 2.0' },
    { label: 'ATX12V 2.01', value: 'ATX12V 2.01' },
    { label: 'ATX12V 2.1', value: 'ATX12V 2.1' },
    { label: 'ATX12V 2.2', value: 'ATX12V 2.2' },
    { label: 'ATX12V 2.3', value: 'ATX12V 2.3' },
    { label: 'ATX12V 2.31', value: 'ATX12V 2.31' },
    { label: 'ATX12V 2.4', value: 'ATX12V 2.4' },
    { label: 'ATX12V 2.41', value: 'ATX12V 2.41' },
    { label: 'ATX12V 2.51', value: 'ATX12V 2.51' },
    { label: 'ATX12V 2.52', value: 'ATX12V 2.52' },
    { label: 'ATX12V 2.53', value: 'ATX12V 2.53' },
    { label: 'ATX12V 2.92', value: 'ATX12V 2.92' },
    { label: 'ATX12V 3.0', value: 'ATX12V 3.0' },
    { label: 'SFX12V', value: 'SFX12V' },
  ]
);

const PSCertificate: ComputedRef<{ label: string; value: string }[]> = computed(
  () => [
    { label: 'Нет', value: 'Нет' },
    { label: 'Bronze', value: 'Bronze' },
    { label: 'Gold', value: 'Gold' },
    { label: 'Platinum', value: 'Platinum' },
    { label: 'Standart', value: 'Standart' },
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
