import type { ComputedRef } from 'vue';
import { computed } from 'vue';

/* import type { GroupEntity } from "@/@types"; */
/* import { useI18n } from '@/i18n'; */

import { useAppStore } from '@/store';
import { ProductEntity } from '@/@types';
import { OrderStatusEnum, ProductTypeEnum, UserRoleEnum } from '@/@enums';
import { Amount } from 'amount-ts';

export const GetProductShortDescription = (product: ProductEntity): string => {
  switch (product.type.id) {
    case ProductTypeEnum.CPU:
      return [
        product.productSocket,
        product.productNumberOfCores + ' ядер',
        product.productClockSpeed + ' МГц',
        product.productTechnologicalProcess + ' нм',
        product.productHeatOutput + ' Вт',
      ].join(', ');

    case ProductTypeEnum.GPU:
      return [
        product.productInterface,
        product.productClockSpeed + ' МГц',
        'память ' + product.productMemoryCapacity + ' Гб ',
        product.productBandwidth + ' ГБ/c',
        product.productMemoryBus,
        'HDMI x' + product.productHDMIConnectors,
        'DisplayPort x' + product.productDPConnectors,
      ].join(', ');

    case ProductTypeEnum.Motherboard:
      break;

    default:
      return '';
  }
  return '';
};

export const GetProductFormattedTitle = (
  product: ProductEntity,
  withType?: boolean
): string => {
  if (withType) {
    return [
      product.type?.title,
      product?.productGPUCoreManufacture?.title,
      product.manufacture?.title,
      product?.productLine,
      product?.productModel,
    ].join(' ');
  } else {
    return [
      product.manufacture?.title,
      product?.productGPUCoreManufacture?.title,
      product?.productLine,
      product?.productModel,
    ].join(' ');
  }
};

export const GetProductFormattedPrice = (productPrice: number): string => {
  const formatter: Amount = new Amount({
    thousand: ' ',
    suffix: ' ₽',
    decimals: 0,
  });

  return formatter.to(productPrice);
};

export const GetUserRoleInString = (roleId: UserRoleEnum): string => {
  switch (roleId) {
    case UserRoleEnum.Default:
      return 'Пользователь';
    case UserRoleEnum.Manager:
      return 'Менеджер';
    case UserRoleEnum.Admin:
      return 'Администратор';
  }
};

export const GetOrderStatusInString = (status: OrderStatusEnum): string => {
  switch (status) {
    case OrderStatusEnum.Created:
      return 'Ожидает подтверждения';
    case OrderStatusEnum.Processing:
      return 'В обработке';
    case OrderStatusEnum.Confirmed:
      return 'Подтвержден';
    case OrderStatusEnum.Shipped:
      return 'Передан в доставку';
    case OrderStatusEnum.Canceled:
      return 'Отменен';
  }
};
