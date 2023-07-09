export * from './catalog';
export * from './user';
export * from './orders';

export const enum ResponseStatusEnum {
  Ok = 'ok',
  Error = 'error',
}

export const enum ThemeAppEnum {
  System,
  Light,
  Dark,
}

export const enum StatisticsWidgetEnum {
  Users = 'Пользователи',
  Products = 'Продукты',
  Orders = 'Заказы',
  Stocks = 'Склады',
}
