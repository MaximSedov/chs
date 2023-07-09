import type {
  /*  UserAvatarModel,
  UserEntity,
  UserHomePageModel, */
  ProductsIdsModel,
  ProductsIdsGroupModel,
  ProductsIdsDataModel,
  ProductsIdsProfileModel,
  ProductsIdsChainModel,
  ProductsIdsChosenModel,
} from '@/@types';

export const defaultProductsIdsChosen: ProductsIdsChosenModel = {
  mentions: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  others: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
};

export const defaultProductsIds: ProductsIdsModel = {
  list: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  newest: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  CPU: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  GPU: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  MOTHERBOARD: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  COOLER: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  HDD: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  SSD: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  CASE: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  RAM: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
  POWERSUPPLY: {
    loadMoreUrl: null,
    ids: [],
  } as ProductsIdsDataModel,
};
