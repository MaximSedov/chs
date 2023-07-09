import { ProductTypeEnum } from '@/@enums';

export type ProductModel = {
  id: string;
};

export type CatalogMenuOptionContentItem = {
  title: string;
};

export type CatalogMenuOptionContent = {
  title: string;
  items: CatalogMenuOptionContentItem[];
};

export type CatalogMenuOptions = {
  label: string;
  key: string;
  icon: any | null;
  content: CatalogMenuOptionContent[];
  type?: string;
  props?: any;
};

export type ProductTypeModel = {
  id: ProductTypeEnum;
  title: string;
};

export type ProductCategoryModel = {
  id: number;
  title: string;
};

export type ProductManufactureModel = {
  id: number;
  title: string;
};

export type ProductEntity = {
  category: ProductCategoryModel;
  createdAt: string;
  description: string;
  id: number;
  image: string;
  isAvailable: boolean;
  price: number;
  productSKU: string;
  title: string;
  type: ProductTypeModel;
  manufacture: ProductManufactureModel;
  productModel: string;
  productLine: string;
  productSocket: string;
  productNumberOfCores: number;
  productClockSpeed: number;
  productTechnologicalProcess: number;
  productHeatOutput: number;
  productMemoryCapacity: number;
  productInterface: string;
  productMemoryType: string;
  productBandwidth: number;

  productMemoryBus: number;

  productCodeNameOfGraphicsProcessor: string;

  productRecommendedPowerSupplyCapacity: number;

  productOptionalPowerConnector: string;

  productMaxResolution: string;

  productNumberOfMonitors: number;

  productSizeWidth: number;

  productSizeHeight: number;

  productSizeDepth: number;

  productHDMIConnectors: number;

  productDPConnectors: number;
  productGPUCoreManufacture: ProductManufactureModel;
};

export type ProductEntityCount = {
  count: number;
  data: ProductEntity;
};

export type ShortProductsModel = {
  data: ProductEntity[];
  loadMoreUrl: string | null;
};

export type ProductsIdsDataModel = {
  loadMoreUrl: string | null;
  ids: number[];
};

export type ProductsIdsGroupModel = {
  groupId: number;
  loadMoreUrl: string | null;
  ids: number[];
};

export type ProductsIdsProfileModel = {
  profileId: number;
  loadMoreUrl: string | null;
  ids: number[];
};

export type ProductsIdsChainModel = {
  chainId: number;
  loadMoreUrl: string | null;
  ids: number[];
};

export type ProductsIdsChosenModel = {
  mentions: ProductsIdsDataModel;
  others: ProductsIdsDataModel;
};

export type ProductsIdsModel = {
  list: ProductsIdsDataModel;
  newest: ProductsIdsDataModel;
  CPU: ProductsIdsDataModel;
  GPU: ProductsIdsDataModel;
  MOTHERBOARD: ProductsIdsDataModel;
  COOLER: ProductsIdsDataModel;
  CASE: ProductsIdsDataModel;
  POWERSUPPLY: ProductsIdsDataModel;
  RAM: ProductsIdsDataModel;
  HDD: ProductsIdsDataModel;
  SSD: ProductsIdsDataModel;
};
