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
          :options="CASEManufacturer"
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
          placeholder="Например, Pure Base 500"
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
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Форм-фактор"
        path="productFormFactor"
      >
        <n-select
          v-model:value="model.productFormFactor"
          multiple
          placeholder="Выберите"
          :options="CASEFormFactor"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Типоразмер"
        path="productCaseSize"
      >
        <n-select
          v-model:value="model.productCaseSize"
          placeholder="Выберите"
          :options="CASECaseSize"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Максимальная длина видеокарты, мм"
        path="productMaxGPULength"
      >
        <n-input-number
          v-model:value="model.productMaxGPULength"
          :min="0"
          :step="15"
          placeholder="Например, 215"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Максимальная высота кулера, мм"
        path="productMaxCoolerHeight"
      >
        <n-input-number
          v-model:value="model.productMaxCoolerHeight"
          :min="0"
          :step="15"
          placeholder="Например, 90"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Внутренние отсеки 3.5&quot;, шт"
        path="productInternalHDDCompartments"
      >
        <n-input-number
          v-model:value="model.productInternalHDDCompartments"
          :min="0"
          :step="1"
          placeholder="Например, 2"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Внутренние отсеки 2.5&quot;, шт"
        path="productInternalSSDCompartments"
      >
        <n-input-number
          v-model:value="model.productInternalSSDCompartments"
          :min="0"
          :step="1"
          placeholder="Например, 2"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Наличие окна на боковой стенке"
        path="productWindowOnTheSidePanel"
      >
        <n-switch v-model:value="model.productWindowOnTheSidePanel" />
      </n-form-item-gi>
      <n-form-item-gi
        label="Возможность установки СВО"
        path="productCapableInstallingWRC"
      >
        <n-switch v-model:value="model.productCapableInstallingWRC" />
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
    message: 'Необходимо указать модель корпуса',
  },

  productFormFactor: {
    type: 'array',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо выбрать форм-фактор',
  },
  productCaseSize: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо выбрать типоразмер корпуса',
  },
  productInternalHDDCompartments: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать количество внутренних отсеков 3.5"',
  },
  productInternalSSDCompartments: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать количество внутренних отсеков 2.5"',
  },
  productMaxGPULength: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать максимальную длину видеокарты',
  },
  productMaxCoolerHeight: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать максимальную высоту процессорного кулера',
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
  type: ProductTypeEnum.Case,
  category: 1,
  productSKU: null,
  price: null,
  manufacture: null,
  isAvailable: true,
  description: null,
  image: '',
  productModel: null,

  productFormFactor: null,
  productCaseSize: null,
  productInternalHDDCompartments: 0,
  productInternalSSDCompartments: 0,
  productMaxGPULength: null,
  productMaxCoolerHeight: null,
  productWindowOnTheSidePanel: false,
  productCapableInstallingWRC: false,
};

const model = ref(cloneDeep(formModel));

const GPUCoreManufacturer: ComputedRef<{ label: string; value: number }[]> =
  computed(() => [
    { label: 'AMD', value: ManufacturerEnum.AMD },
    { label: 'NVIDIA', value: ManufacturerEnum.Nvidia },
  ]);

const CASEManufacturer: ComputedRef<{ label: string; value: number }[]> =
  computed(() => [
    { label: 'Thermaltake', value: ManufacturerEnum.Thermaltake },
    { label: 'Corsair', value: ManufacturerEnum.Corsair },
    { label: 'MSI', value: ManufacturerEnum.MSI },
    { label: 'DeepCool', value: ManufacturerEnum.DeepCool },
    { label: 'Zalman', value: ManufacturerEnum.Zalman },
    { label: 'Be Quiet', value: ManufacturerEnum.BeQuiet },
    { label: 'Fractal Design', value: ManufacturerEnum.FractalDesign },
  ]);

const CASECaseSize: ComputedRef<{ label: string; value: string }[]> = computed(
  () => [
    { label: 'Full-Tower', value: 'Full-Tower' },
    { label: 'Midi-Tower', value: 'Midi-Tower' },
    { label: 'Mini-Tower', value: 'Mini-Tower' },
    { label: 'Super-Tower', value: 'Super-Tower' },
    { label: 'Slim-Desktop', value: 'Slim-Desktop' },
  ]
);

const CASEFormFactor: ComputedRef<{ label: string; value: string }[]> =
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
