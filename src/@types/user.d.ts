import type { ResponseStatusEnum, UserRoleEnum } from '@/@enums';

export interface UserModel {
  id: string;
  createdAt: string;
  email: string;
  phone: string;
  roleId: UserRoleEnum;
  isBlocked: boolean;
  name: string;
  address: string;
}
export interface ShortUserModel {
  email: string;
  phone: string;
  name: string;
  address: string;
}
