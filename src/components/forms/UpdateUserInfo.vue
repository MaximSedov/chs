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
        label="Имя"
        path="name"
      >
        <n-input
          v-model:value="model.name"
          placeholder="Например, Иван"
          maxlength="30"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Email"
        path="email"
      >
        <n-input
          v-model:value="model.email"
          disabled
          placeholder="Например, ivan@gmail.com"
          maxlength="50"
        />
      </n-form-item-gi>
    </n-grid>

    <n-grid
      :cols="2"
      :x-gap="12"
    >
      <n-form-item-gi
        label="Телефон"
        path="phone"
      >
        <n-input
          v-model:value="model.phone"
          v-custom-mask="`+7 (###) ###-##-##`"
          placeholder="Например, + 7 999 999 99 99"
        />
      </n-form-item-gi>
      <n-form-item-gi
        label="Адрес доставки"
        path="address"
      >
        <n-input
          v-model:value="model.address"
          placeholder="Например, г. Тула, ул. Рязанская, д. 1"
          maxlength="200"
        />
      </n-form-item-gi>
    </n-grid>
    <div style="display: flex; justify-content: end">
      <n-button
        :disabled="isLoading"
        type="primary"
        @click="submitForm"
      >
        Обновить
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
  NH2,
} from 'naive-ui';
import { supabase } from '@/lib';
import { useProductStore } from '@/store';
import { ProductsModeEnum } from '@/@enums';
import { ProductEntity } from '@/@types';
import { Search, AddOutline, ArchiveOutline } from '@vicons/ionicons5';
import { format } from 'date-fns';
import { Amount } from 'amount-ts';
import { RowData } from 'naive-ui/es/data-table/src/interface';
import { cloneDeep } from 'lodash';
import { mask as vCustomMask } from 'vue-the-mask';
import { useCartStore, useUserStore } from '@/store';
import { GetProductFormattedPrice } from '@/helpers';
import { ShortUserModel } from '@/@types';

const productStore = useProductStore();
const userStore = useUserStore();
const isLoading: ComputedRef<boolean> = computed(() => userStore.loading);
const rules: FormRules = {
  name: {
    type: 'string',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Необходимо указать имя получателя',
  },
  email: {
    type: 'string',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Необходимо указать электронную почту',
  },
  address: {
    type: 'string',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Необходимо уазать адрес доставки',
  },
  phone: {
    type: 'string',
    required: true,
    trigger: ['blur', 'input'],
    message: 'Необходимо указать телефон',
    validator: (rule: FormItemRule, value: string) => {
      return value.length === 18;
    },
  },
};

const currentUserName: ComputedRef<string> = computed(
  () => userStore.current?.name ?? ''
);
const currentUserEmail: ComputedRef<string> = computed(
  () => userStore.current?.email ?? ''
);
const currentUserPhone: ComputedRef<string> = computed(
  () => userStore.current?.phone ?? ''
);
const currentUserAddress: ComputedRef<string> = computed(
  () => userStore.current?.address ?? ''
);
const formData = {
  name: currentUserName.value,
  address: currentUserAddress.value,
  phone: currentUserPhone.value,
  email: currentUserEmail.value,
} as ShortUserModel;

const model = ref(cloneDeep(formData));

const formRef = ref<FormInst | null>(null);
const message = useMessage();

const submitForm = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        const result = await userStore.updateUserInfo(model.value);
        if (!result) {
          message.error('При изменении информации профиля возникла ошибка!');
        } else {
          message.success('Информация профиля успешно обновлена');
        }
      }
    }
  );
};
</script>

<style scoped></style>
