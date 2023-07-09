import type { ResponseStatusEnum, StatisticsWidgetEnum } from '@/@enums';
/* import type { ErrorMessageModel } from '@/@types'; */
export * from './user';
export * from './catalog';
export * from './cart';
export * from './orders';
export * from './availability';

export type ResponseSuccessModel = {
  status: ResponseStatusEnum;
};

export type ResponseErrorModel = {
  status: ResponseStatusEnum;
  errorType: string;
  errorMessages: [];
};

export type StatisticsWidgetModel = {
  type: StatisticsWidgetEnum;
  title: string;
  headerButton: { title: string; color: string | any };
  shortData: {
    title: string;
    content: number | string | any;
    type: string | any;
  }[];
  footerData: { title: string; content: number };
};
