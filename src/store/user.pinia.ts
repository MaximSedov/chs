import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';

/* import type { FeedTypeEnum, UsersModeEnum } from '@/@enums'; */
import { ResponseStatusEnum } from '@/@enums';
/* import type {
  ErrorMessageModel,
  PasswordSaveModel,
  PasswordSettingsModel,
  ResponseErrorModel,
  ResponsePasswordPolicyModel,
  ResponsePasswordRestoreModel,
  ResponseUserModel,
  ResponseUsersModel,
  SupportModel,
  UserCurrentModel,
  UserEntity,
  UserProfileUpdateModel,
  PhoneMobileVisibleUpdateModel,
  PhoneConfirmModel,
  ResponsePhoneChangeModel,
  ResponseUserAvatarModel,
  UserAvatarModel,
} from '@/@types'; */
/* import { defaultUser } from '@/models';
import { $api } from '@/services';
 */
import type { EntityState } from '@/store';
import { ShortUserModel, UserModel } from '@/@types';
import { supabase } from '@/lib';
interface UserState extends EntityState<UserModel> {
  current: UserModel | null;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    data: [],
    error: null,
    loading: false,
    current: null,
  }),
  getters: {
    /* getId: (state): number => state.current?.id ?? 0,
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
      },
    getUserProfile:
      (state) =>
      (id: number): UserEntity => {
        const index = state.data.findIndex(
          (user: UserEntity) => user.id === id
        );

        if (~index) {
          return state.data[index];
        }
        return cloneDeep(defaultUser);
      },
    getUserAliasById: (state) => (id: number) => {
      return state.data.filter((n: UserEntity) => n.id === id)[0].mainAlias;
    }, */
  },
  actions: {
    async currentUser(userId: string): Promise<boolean> {
      this.error = null;
      this.loading = true;

      try {
        const response = await supabase
          .from('users')
          .select('*')
          .eq('id', userId);

        if (response.error !== null) {
          throw response.error.message;
        }

        if (response.data.length > 0) {
          const userData = response.data[0] as UserModel;
          const userStore = useUserStore();

          const user = {
            id: userData.id,
            email: userData.email,
            phone: userData.phone,
            roleId: userData.roleId,
            isBlocked: false,
            name: userData.name,
            address: userData.address,
          } as UserModel;
          this.current = user;
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
    async updateUserInfo(data: ShortUserModel): Promise<boolean> {
      this.error = null;
      this.loading = true;

      try {
        const response = await supabase
          .from('users')
          .update(data)
          .eq('id', this.current?.id);

        if (response.error !== null) {
          throw response.error.message;
        }

        const user = {
          email: data.email,
          phone: data.phone,
          name: data.name,
          address: data.address,
        } as UserModel;
        this.$patch({
          current: user,
        });
        this.loading = false;
        return true;
      } catch (err) {
        console.log(err);
        this.error = err as string;
        this.loading = false;
        return false;
      }
    },
  },
  persist: true,
});
