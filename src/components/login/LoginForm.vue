<template>
  <div class="login-form">
    <n-card
      title="CHS"
      hoverable
    >
      <n-tabs
        v-model:value="tabValue"
        class="card-tabs"
        size="large"
        animated
        style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane
          name="signin"
          tab="Вход"
        >
          <n-form
            ref="formSignInRef"
            size="large"
            :model="signInRef"
            :rules="signInRules"
            :disabled="isLoading"
          >
            <n-form-item
              path="email"
              label="Email"
            >
              <n-input
                v-model:value="signInRef.email"
                type="text"
                placeholder="Введите почтовый адрес"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item
              path="password"
              label="Пароль"
            >
              <n-input
                v-model:value="signInRef.password"
                type="password"
                placeholder="Введите пароль"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-row :gutter="[0, 24]">
              <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                  <n-button
                    type="primary"
                    block
                    secondary
                    strong
                    @click="loginValidate"
                  >
                    Войти
                  </n-button>
                </div>
              </n-col>
            </n-row>
          </n-form>
        </n-tab-pane>
        <n-tab-pane
          name="signup"
          tab="Регистрация"
        >
          <n-form
            ref="formSignUpRef"
            size="large"
            :model="signUpRef"
            :rules="signUpRules"
          >
            <n-form-item
              path="userName"
              label="Ваше имя"
            >
              <n-input
                v-model:value="signUpRef.userName"
                type="text"
                placeholder="Введите ваше имя"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item
              path="email"
              label="Email"
            >
              <n-input
                v-model:value="signUpRef.email"
                type="text"
                placeholder="Введите почтовый адрес"
                :autocomplete="false"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item
              path="password"
              label="Придумайте пароль"
            >
              <n-input
                v-model:value="signUpRef.password"
                type="password"
                placeholder="Придумайте пароль"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-row :gutter="[0, 24]">
              <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                  <n-button
                    type="primary"
                    block
                    secondary
                    strong
                    @click="registrationValidate"
                  >
                    Регистрация
                  </n-button>
                </div>
              </n-col>
            </n-row>
          </n-form>
        </n-tab-pane>
      </n-tabs>
      <n-a
        style="display: flex; justify-content: center"
        :style="`padding-top: 26px;`"
      >
        Перейти в каталог
      </n-a>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onMounted, ref } from 'vue';
import { defineComponent, h, Component } from 'vue';
import Schema from 'async-validator';
import {
  NIcon,
  NMenu,
  NForm,
  NInput,
  NCard,
  NFormItem,
  NRow,
  NCol,
  NButton,
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
  FormValidationError,
  useMessage,
  NMessageProvider,
  NAvatar,
  NImage,
  NTabs,
  NTabPane,
  NA,
  MessageReactive,
} from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { supabase } from '@/lib';
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5';

import {
  Cart16Regular,
  PeopleCall16Regular,
  ArrowStepBack16Regular,
  VehicleCarProfileRtl16Regular,
  BuildingShop16Regular,
  PeopleSettings20Regular,
} from '@vicons/fluent';
import { watch } from 'fs';
import { useAppStore, useAvailabilityStore } from '@/store';
import { ROUTES_NAME } from '@/router';
import { useRoute, useRouter } from 'vue-router';

interface SignInType {
  email: string;
  password: string;
}

interface SignUpType {
  userName: string;
  email: string;
  password: string;
}
const route = useRoute();
const router = useRouter();

const availabilityStore = useAvailabilityStore();
const appStore = useAppStore();
const formSignInRef = ref<FormInst | null>(null);
const formSignUpRef = ref<FormInst | null>(null);
const tabValue = ref<string>('signin');
const rPasswordFormItemRef = ref<FormItemInst | null>(null);
const message = useMessage();
const signInRef = ref<SignInType>({
  email: '',
  password: '',
});

const signUpRef = ref<SignUpType>({
  userName: '',
  email: '',
  password: '',
});

const isLoading: ComputedRef<boolean> = computed(() => {
  return appStore.loading;
});

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === signInRef.value.password;
}

const signInRules: FormRules = {
  email: [
    {
      required: true,
      type: 'email',
      trigger: ['input', 'blur'],
      message: 'Электронная почта не является действительной',
    },
  ],
  password: [
    {
      required: true,
      trigger: ['input', 'blur'],
      message: 'Пароль обязателен',
    },
  ],
};
const signUpRules: FormRules = {
  userName: [
    {
      required: true,
      trigger: ['input', 'blur'],
      message: 'Имя не может быть пустым',
    },
  ],
  email: [
    {
      required: true,
      type: 'email',
      trigger: ['input', 'blur'],
      message: 'Электронная почта не является действительной',
    },
  ],
  password: [
    {
      required: true,
      trigger: ['input', 'blur'],
      message: 'Пароль обязателен',
    },
  ],
};

const loginValidate = (e: MouseEvent) => {
  e.preventDefault();
  removeMessage();
  formSignInRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        message.loading('Выполняем вход', { type: 'loading', duration: 0 });
        const result = await appStore.logIn(signInRef.value);
        message.destroyAll();
        router.replace({ name: ROUTES_NAME.HOME });
        if (!result) {
          message.error(String(appStore.error));
          return;
        }
        await availabilityStore.list();
      } else {
        message.error('Проверьте правильность ввода данных');
      }
    }
  );
};

let warningMess: MessageReactive | null = null;
const removeMessage = () => {
  if (warningMess) {
    warningMess.destroy();
    warningMess = null;
  }
};

const createMessage = () => {
  if (!warningMess) {
    warningMess = message.warning(
      'Перейди по ссылке из письма, чтобы подтвердить почтовый адрес и выполнить вход',
      { closable: true, duration: 0 }
    );
  }
};
const registrationValidate = (e: MouseEvent) => {
  e.preventDefault();
  /* formSignUpRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        message.loading('Выполняем регистрацию', {
          type: 'loading',
          duration: 0,
        });
        const formData = {
          email: signUpRef.value.email,
          password: signUpRef.value.password,
          name: signUpRef.value.userName,
        };
        const result = await appStore.signUp(formData);
        message.destroyAll();
        router.replace({ name: ROUTES_NAME.HOME });
        if (!result) {
          message.error(String(appStore.error));
          return;
        } else {
          message.success('Регистрация прошла успешно!');
          createMessage();
          tabValue.value = 'signin';
        }
      } else {
        message.error('Не удалось выполнить регистрацию');
      }
    }
  ); */
  message.error('Регистрация в системе временно отключена!');
};
</script>

<style scoped>
.login-form {
  width: 25rem;
}
</style>
