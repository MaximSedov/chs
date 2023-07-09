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
          :options="COOLERManufacturer"
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
          placeholder="Например, Dark Rock Pro 4"
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
      :cols="1"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Поддерживаемые сокеты"
        path="productSocket"
      >
        <n-select
          v-model:value="model.productSocket"
          multiple
          placeholder="Выберите"
          :options="COOLERSocket"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="3"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Минимальная скорость вентилятора, об/мин"
        path="productFanMinSpeed"
      >
        <n-input-number
          v-model:value="model.productFanMinSpeed"
          :min="0"
          :step="400"
          placeholder="Например, 180"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Максимальная скорость вентилятора, об/мин"
        path="productFanMaxSpeed"
      >
        <n-input-number
          v-model:value="model.productFanMaxSpeed"
          :min="0"
          :step="400"
          placeholder="Например, 180"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Уровень шума вентилятора, дБ"
        path="productFanNoiseLevel"
      >
        <n-input-number
          v-model:value="model.productFanNoiseLevel"
          :min="0"
          :step="15"
          placeholder="Например, 70"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Высота, мм"
        path="productSizeHeight"
      >
        <n-input-number
          v-model:value="model.productSizeHeight"
          :min="0"
          :step="25"
          placeholder="Например, 108"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Рассеиваемая мощность, Вт"
        path="productMaxPowerDissipation"
      >
        <n-input-number
          v-model:value="model.productMaxPowerDissipation"
          :min="0"
          :step="15"
          placeholder="Например, 180"
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

  productSocket: {
    type: 'array',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать поддеерживаемые скоеты',
  },
  productSizeHeight: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать высоту кулера',
  },
  productMaxPowerDissipation: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать максимальную рассеиваемую мощность',
  },
  productFanMinSpeed: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать минимальную скорость вентилятора',
  },
  productFanMaxSpeed: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать максимальную скорость вентилятора',
  },
  productFanNoiseLevel: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Необходимо указать уровень шума вентилятора',
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
  type: ProductTypeEnum.Cooler,
  category: 1,
  productSKU: null,
  price: null,
  manufacture: null,
  isAvailable: true,
  description: null,
  image: '',
  productModel: null,

  productSocket: null,
  productSizeHeight: null,
  productMaxPowerDissipation: null,
  productFanMinSpeed: null,
  productFanMaxSpeed: null,
  productFanNoiseLevel: null,
};

const model = ref(cloneDeep(formModel));

const COOLERManufacturer: ComputedRef<{ label: string; value: number }[]> =
  computed(() => [
    { label: 'Be Quiet', value: ManufacturerEnum.BeQuiet },
    { label: 'AeroCool', value: ManufacturerEnum.AeroCool },
    { label: 'ID-COOLING', value: ManufacturerEnum.IDCOOLING },
    { label: 'Zalman', value: ManufacturerEnum.Zalman },
    { label: 'Thermaltake', value: ManufacturerEnum.Thermaltake },
    { label: 'DeepCool', value: ManufacturerEnum.DeepCool },
  ]);

const COOLERSocket: ComputedRef<{ label: string; value: string }[]> = computed(
  () => [
    { label: 'AM4', value: 'AM4' },
    { label: 'AM5', value: 'AM5' },
    { label: 'FM2', value: 'FM2' },
    {
      label: 'LGA 1150',
      value: 'LGA 1150',
    },
    {
      label: 'LGA 1151',
      value: 'LGA 1151',
    },
    {
      label: 'LGA 1151 v2',
      value: 'LGA 1151 v2',
    },
    {
      label: 'LGA 1155',
      value: 'LGA 1155',
    },
    {
      label: 'LGA 1200',
      value: 'LGA 1200',
    },
    {
      label: 'LGA 1700',
      value: 'LGA 1700',
    },
    {
      label: 'LGA 2011-3',
      value: 'LGA 2011-3',
    },
    {
      label: 'LGA 2066',
      value: 'LGA 2066',
    },
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
