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
          :options="MOTHERBOARDManufacturer"
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
          placeholder="Например, PRIME Z690-P WIFI"
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
          placeholder="Например, 19430"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Чипсет"
        path="productChipset"
      >
        <n-select
          v-model:value="model.productChipset"
          filterable
          placeholder="Выберите"
          :options="MOTHERBOARDChipset"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Тип оперативной памяти"
        path="productMemoryType"
      >
        <n-select
          v-model:value="model.productMemoryType"
          filterable
          placeholder="Выберите"
          :options="MOTHERBOARDMemoryType"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="3"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Форм-фактор"
        path="productFormFactor"
      >
        <n-select
          v-model:value="model.productFormFactor"
          filterable
          placeholder="Выберите"
          :options="MOTHERBOARDFormFactor"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Слоты памяти"
        path="productMemorySlots"
      >
        <n-input-number
          v-model:value="model.productMemorySlots"
          :min="0"
          :step="1"
          placeholder="Например, 2"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Питание процессора"
        path="productCPUPowerConnector"
      >
        <n-select
          v-model:value="model.productCPUPowerConnector"
          filterable
          placeholder="Выберите"
          :options="MOTHERBOARDCPUPowerConnectors"
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
  productChipset: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать чипсет',
  },
  productMemoryType: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать тип оперативной памяти',
  },
  productMemorySlots: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать количество слотов ОЗУ',
  },
  productCPUPowerConnector: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать питание процессора',
  },
  productFormFactor: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать форм-фактор',
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
  type: ProductTypeEnum.Motherboard,
  category: 1,
  productSKU: null,
  price: null,
  manufacture: null,
  isAvailable: true,
  description: null,
  image: '',
  productModel: null,

  productChipset: null,
  productMemoryType: null,
  productMemorySlots: null,
  productCPUPowerConnector: null,
  productFormFactor: null,
};

const model = ref(cloneDeep(formModel));

const MOTHERBOARDManufacturer: ComputedRef<{ label: string; value: number }[]> =
  computed(() => [
    { label: 'ASRock', value: ManufacturerEnum.ASRock },
    { label: 'Asus', value: ManufacturerEnum.ASUS },
    { label: 'Gigabyte', value: ManufacturerEnum.Gigabyte },
    { label: 'MSI', value: ManufacturerEnum.MSI },
  ]);

const MOTHERBOARDChipset: ComputedRef<{ label: string; value: string }[]> =
  computed(() => [
    { label: 'Intel Z690', value: 'Intel Z690' },
    { label: 'Intel Z590', value: 'Intel Z590' },
    { label: 'Intel B560', value: 'Intel B560' },
    { label: 'Intel H570', value: 'Intel H570' },
    { label: 'Intel H510', value: 'Intel H510' },
    { label: 'Intel X299', value: 'Intel X299' },
    { label: 'Intel Z490', value: 'Intel Z490' },
    { label: 'Intel H470', value: 'Intel H470' },
    { label: 'Intel B460', value: 'Intel B460' },
    { label: 'Intel Q470', value: 'Intel Q470' },
    { label: 'AMD X570', value: 'AMD X570' },
    { label: 'AMD B550', value: 'AMD B550' },
    { label: 'AMD B650', value: 'AMD B650' },
    { label: 'AMD B660', value: 'AMD B660' },
    { label: 'AMD B6760', value: 'AMD B760' },
    { label: 'AMD A520', value: 'AMD A520' },
    { label: 'AMD TRX40', value: 'AMD TRX40' },
    { label: 'AMD WRX80', value: 'AMD WRX80' },
    { label: 'AMD X470', value: 'AMD X470' },
    { label: 'AMD X370', value: 'AMD X370' },
    { label: 'AMD B450', value: 'AMD B450' },
    { label: 'AMD A320', value: 'AMD A320' },
    { label: 'AMD TRX80', value: 'AMD TRX80' },
    { label: 'Intel Z390', value: 'Intel Z390' },
    { label: 'Intel Z370', value: 'Intel Z370' },
    { label: 'Intel H370', value: 'Intel H370' },
    { label: 'Intel B365', value: 'Intel B365' },
    { label: 'Intel B360', value: 'Intel B360' },
    { label: 'AMD X399', value: 'AMD X399' },
    { label: 'AMD X370', value: 'AMD X370' },
    { label: 'AMD A88X', value: 'AMD A88X' },
    { label: 'AMD A78', value: 'AMD A78' },
    { label: 'AMD A68H', value: 'AMD A68H' },
  ]);

const MOTHERBOARDCPUPowerConnectors: ComputedRef<
  { label: string; value: string }[]
> = computed(() => [
  { label: '6', value: '6' },
  { label: '2x6', value: '2x6' },
  { label: '4+6', value: '4+6' },
  { label: '4+8', value: '4+8' },
  { label: '4+4', value: '4+4' },
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '2x8', value: '2x8' },
  { label: '6+8', value: '6+8' },
  { label: '3x8', value: '3x8' },
  { label: '16', value: '16' },
]);

const MOTHERBOARDMemoryType: ComputedRef<{ label: string; value: string }[]> =
  computed(() => [
    { label: 'DDR3', value: 'DDR3' },
    { label: 'DDR4', value: 'DDR4' },
    { label: 'DDR5', value: 'DDR5' },
  ]);

const MOTHERBOARDFormFactor: ComputedRef<{ label: string; value: string }[]> =
  computed(() => [
    { label: 'ATX', value: 'ATX' },
    { label: 'E-ATX', value: 'E-ATX' },
    { label: 'mATX', value: 'mATX' },
    { label: 'Mini-ITX', value: 'Mini-ITX' },
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
