import { PlentysystemsModuleType, plentysystemsModule } from '@plentymarkets/shop-sdk';
import { initSDK, buildModule } from '@vue-storefront/sdk';
import { createSharedComposable } from '@vueuse/core';

export const plentySdkExtension: any = {
  subscribers: {
    plentysystems_before: (params: any) => {
      if (process.server) {
        const headers = useRequestHeaders(['cookie']);
        console.log('useRequestHeaders', headers);
        console.log('params', params)
      }
    },
  }
};

export const useSdk = createSharedComposable(() => {
  
  const sdkConfig = {
    plentysystems: buildModule<PlentysystemsModuleType>(plentysystemsModule, {
      apiUrl: process.env.API_ENDPOINT
        ? `${process.env.API_ENDPOINT}/plentysystems`
        : 'http://localhost:8181/plentysystems',
    },
    plentySdkExtension),
  };

  return initSDK<typeof sdkConfig>(sdkConfig);
});


