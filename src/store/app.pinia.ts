import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';
import { utcToZonedTime } from 'date-fns-tz';

import { ResponseStatusEnum, ThemeAppEnum } from '@/@enums';
import type { ResponseErrorModel } from '@/@types';

/* import { DEFAULT_LOCALE, SUPPORT_LOCALES } from '@/i18n'; */
import { ROUTES_NAME } from '@/router';
/* import { $api } from '@/services'; */
import { supabase } from '@/lib';
import { addSeconds, parseISO } from 'date-fns';
import { useUserStore } from '@/store';

export type AppState = {
  theme: ThemeAppEnum;
  token: string | null;
  expiresIn: Date | null;
  error: string | null;
  loading: boolean;
};

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState =>
    ({
      error: '',
      loading: false,
      token: null,
      expiresIn: null,
      theme: window.matchMedia?.('(prefers-color-scheme: dark)').matches
        ? ThemeAppEnum.Dark
        : ThemeAppEnum.Light,
    } as AppState),
  getters: {
    /* isAuth: (state): boolean =>
      state.userId !== null &&
      state.grantType.length > 0 &&
      state.clientSecret.length > 0 &&
      state.code.length > 0 &&
      state.companyRowId.length > 0,
    getErrors:
      (state) =>
      (type: string): string[] => {
        let _errors: string[] = [];
        state.errors
          .filter((f: ErrorMessageModel) => f.key === type)
          .forEach(function (m: ErrorMessageModel) {
            _errors = [..._errors, ...m.errors];
          });
        return _errors;
      }, */

    getLocalTheme(state): ThemeAppEnum {
      return state.theme;
    },
  },
  actions: {
    /* async homeCode(data: AuthUser): Promise<boolean> {
      this.$patch({
        errors: [],
      });
      const response = await $api.auth.homeCode(data);

      if (response.status === ResponseStatusEnum.Ok) {
        const model = response as ResponseAuthCoreTokenModel;
        const {
          accessToken,
          validUntil,
          coreId,
          companyId,
          userId,
          userRowId,
        } = model.data;

        this.$patch({
          grantType: 'homeAuthorizationCode',
          clientSecret: data.clientSecret,
          code: accessToken,
          codeValid: validUntil,
          coreId,
          companyRowId: companyId,
          userId,
          userRowId,
        });

        return true;
      }

      if (response.status === ResponseStatusEnum.Error) {
        const error = response as ResponseErrorModel;
        this.errors = cloneDeep(error.errorMessages);
      }

      return false;
    }, */
    async logIn(data: any): Promise<boolean> {
      this.error = null;
      this.loading = true;

      try {
        const response = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (response.error !== null) {
          throw response.error.message;
        }

        if (response.data.session?.access_token && response.data.user) {
          const userStore = useUserStore();
          this.token = response.data.session.access_token;
          const last = response.data.user.last_sign_in_at as string;
          this.expiresIn = addSeconds(
            parseISO(last),
            response.data.session.expires_in
          );

          const userResponse = await userStore.currentUser(
            response.data.user!.id
          );

          if (!userResponse) {
            throw 'Ошибка при авторизации. Пользователь не найден!';
          }

          /* const user = {
            id: response.data.user!.id,
            email: response.data.user!.email,
            phone: response.data.user!.phone,
            role: response.data.user!.role,
            isBlocked: false,
            isActive: false,
            name: '',
            addresses: [],
          };
          userStore.$patch({
            current: user,
          }); */
        }
        this.loading = false;
        return true;
      } catch (err) {
        console.log(err);
        this.error = err as string;
        this.loading = false;
        return false;
      }
    },
    async signUp(data: any): Promise<boolean> {
      this.error = null;
      this.loading = true;

      try {
        const response = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              name: data.name,
            },
          },
        });

        if (response.error !== null) {
          throw response.error.message;
        }

        if (response.data?.user?.identities?.length === 0) {
          this.loading = false;
          this.error = 'Такой пользователь уже существует';
          return false;
        }
        this.loading = false;
        return true;
      } catch (err) {
        console.log(err);
        this.error = err as string;
        this.loading = false;
        return false;
      }
    },
    async logOut(): Promise<boolean> {
      this.error = null;
      this.loading = true;

      try {
        const response = await supabase.auth.signOut();

        if (response.error !== null) {
          throw response.error.message;
        }

        console.log(response);

        this.loading = false;
        return true;
      } catch (err) {
        console.log(err);
        this.error = err as string;
        this.loading = false;
        return false;
      }
    },
    /* toggleTheme() {
      if (this.theme === ThemeAppEnum.Dark) {
        this.$patch({
          theme: ThemeAppEnum.Light,
        });
      } else {
        this.$patch({
          theme: ThemeAppEnum.Dark,
        });
      }
    }, */
  },
  persist: true,
});
