import type { Ref } from 'vue';
import type { Breadcrumb, Product, ProductParams } from '@plentymarkets/shop-api';
import type { UseProductOrderProperties } from '~/composables/useProductOrderProperties';

export interface UseProductState {
  data: Product;
  loading: boolean;
  breadcrumbs: Breadcrumb[];
}

export type FetchProduct = (params: ProductParams) => Promise<Product>;
export type SetBreadcrumbs = () => void;

export interface UseProduct {
  data: Readonly<Ref<UseProductState['data']>>;
  loading: Readonly<Ref<boolean>>;
  breadcrumbs: Readonly<Ref<UseProductState['breadcrumbs']>>;
  fetchProduct: FetchProduct;
  setBreadcrumbs: SetBreadcrumbs;
  setTitle: () => void;
  properties: UseProductOrderProperties;
}

export type UseProductReturn = (slug: string) => UseProduct;
