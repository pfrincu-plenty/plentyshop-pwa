<template>
  <div class="shadow-lg md:rounded-md md:border md:border-neutral-100" data-testid="order-summary">
    <div class="flex justify-between items-end py-2 px-4 md:px-6 md:pt-6 md:pb-4">
      <p class="typography-headline-4 font-bold md:typography-headline-3">{{ t('orderSummary') }}</p>
      <p class="typography-text-base font-medium" data-testid="total-in-cart">
        {{ t('itemsInCart', cartItemsCount) }}
      </p>
    </div>

    <div class="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
      <div v-if="orderPropertiesWithVatAdditionalCosts.length > 0" class="mb-4">
        <div
          class="flex justify-between typography-text-base w-full"
          v-for="property in orderPropertiesWithVatAdditionalCosts"
          :key="cartGetters.getBasketItemOrderParamPropertyId(property)"
        >
          <p class="flex flex-col gap-2 grow pr-2">{{ cartGetters.getBasketItemOrderParamName(property) }}</p>
          <p class="flex flex-col gap-2 text-right">
            {{ n(cartGetters.getBasketItemOrderParamPrice(property), 'currency') }}
          </p>
        </div>

        <UiDivider class="mt-4 w-auto" />
      </div>

      <div class="flex gap-2 flex-col pb-4">
        <div class="w-full flex items-center">
          <p class="w-1/2" data-testid="subtotal-label">{{ t('itemsSubtotal') }}</p>
          <p class="w-1/2 font-medium text-right" data-testid="subtotal">
            <UiSkeleton :loading="props.loading" classes="flex h-3 bg-gray-300 rounded">
              {{ n(totals.subTotal, 'currency') }}
            </UiSkeleton>
          </p>
        </div>
        <div class="w-full flex items-center">
          <p class="w-1/2" data-testid="shipping-label">{{ t('delivery') }}</p>
          <p class="w-1/2 font-medium text-right" data-testid="subtotal">
            <UiSkeleton :loading="props.loading" classes="flex h-3 bg-gray-300 rounded">
              {{ getShippingAmount(cartGetters.getShippingPrice(props.cart)) }}
            </UiSkeleton>
          </p>
        </div>

        <div v-if="cartGetters.getCouponDiscount(props.cart)" class="w-full flex items-center">
          <p class="w-1/2" data-testid="coupon-label">{{ t('coupon.name') }}</p>
          <p class="w-1/2 font-medium text-right" data-testid="coupon-value">
            <UiSkeleton :loading="props.loading" classes="flex h-3 bg-gray-300 rounded">
              {{ n(cartGetters.getCouponDiscount(props.cart), 'currency') }}
            </UiSkeleton>
          </p>
        </div>

        <div v-for="(vat, index) in totals.vats" :key="index" class="w-full flex items-center">
          <p class="w-1/2" data-testid="vat-label">{{ t('estimatedTax') }} {{ cartGetters.getTotalVatValue(vat) }}%</p>
          <p class="w-1/2 text-right" data-testid="vat">
            <UiSkeleton :loading="props.loading" classes="flex w-full h-4 bg-gray-300 rounded">
              {{ n(cartGetters.getTotalVatAmount(vat), 'currency') }}
            </UiSkeleton>
          </p>
        </div>

      </div>

      <div v-if="orderPropertiesWithoutVat.length > 0" class="mb-4">
        <UiDivider class="mb-4" />
        <div
          class="flex justify-between typography-text-base w-full"
          v-for="property in orderPropertiesWithoutVat"
          :key="cartGetters.getBasketItemOrderParamPropertyId(property)"
        >
          <p class="flex flex-col gap-2 grow pr-2">{{ cartGetters.getBasketItemOrderParamName(property) }}</p>
          <p class="flex flex-col gap-2 text-right">
            {{ n(cartGetters.getBasketItemOrderParamPrice(property), 'currency') }}
          </p>
        </div>
        <UiDivider class="mt-4 w-auto" />
      </div>

      <div class="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4">
        <p data-testid="total-label">{{ t('total') }}</p>
        <p data-testid="total" class="w-1/2 flex justify-end space-x-4">
          <UiSkeleton :loading="props.loading" classes="w-1/2 bg-gray-300 rounded">
            {{ n(totals.total, 'currency') }}
          </UiSkeleton>
        </p>
      </div>
      <UiDivider class="w-auto" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cartGetters } from '@plentymarkets/shop-api';
import type { OrderSummaryPropsType } from '~/components/OrderSummary/types';

const props = defineProps<OrderSummaryPropsType>();
const { t, n } = useI18n();

const totals = computed(() => {
  const totalsData = cartGetters.getTotals(props.cart);
  return {
    total: totalsData.total,
    subTotal: totalsData.subtotal,
    vats: totalsData.totalVats,
  };
});

const getShippingAmount = (amount: number) => {
  return amount === 0 ? t('shippingMethod.free') : n(Number(amount), 'currency');
};

const cartItemsCount = computed(() => props.cart?.items?.reduce((price, { quantity }) => price + quantity, 0) ?? 0);
const orderPropertiesWithoutVat = computed(() => cartGetters.getOrderPropertiesWithoutVat(props.cart));
const orderPropertiesWithVatAdditionalCosts = computed(() =>
  cartGetters.getOrderPropertiesAdditionalCostsWithVat(props.cart),
);
</script>
