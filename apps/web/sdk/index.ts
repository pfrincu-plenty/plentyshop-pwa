import { PlentysystemsModuleType, plentysystemsModule } from '@plentymarkets/shop-sdk';
import { initSDK, buildModule } from '@vue-storefront/sdk';
import { createSharedComposable } from '@vueuse/core';

export const sapccExtension: any = {
  subscribers: {
    plentysystems_before: (test: unknown, req: unknown) => {
      console.log(test, req);
      console.log(`Before each SAPCC method do something`);
    },
    plentysystems_after: () => {
      console.log(`After each SAPCC method do something`);
    }
  }
};

export const useSdk = createSharedComposable(() => {
  const sdkConfig = {
    plentysystems: buildModule<PlentysystemsModuleType>(plentysystemsModule, {
      apiUrl: process.env.API_ENDPOINT
        ? `${process.env.API_ENDPOINT}/plentysystems`
        : 'http://localhost:8181/plentysystems',
    },
    sapccExtension),
  };

  return initSDK<typeof sdkConfig>(sdkConfig);
});


