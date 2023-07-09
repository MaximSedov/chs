import { OrderStatusEnum, ProductTypeEnum } from '@/@enums';
import { ProductEntityCount } from './catalog';

export type OrderData = {
  id: number;
  createdAt: string;
  products: ProductEntityCount[];
  status: OrderStatusEnum;
  address: string;
  email: string;
  phone: string;
  userName: string;
  userId: string;
  managerId: string;
  cost: number;
};
