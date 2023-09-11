import { PlentysystemsModuleType, plentysystemsModule } from '@plentymarkets/shop-sdk';
import { initSDK, buildModule } from '@vue-storefront/sdk';
import { createSharedComposable } from '@vueuse/core';

export const useSdk = createSharedComposable(() => {

  const apiEndpoint = process.env.API_ENDPOINT
  ? `${process.env.API_ENDPOINT}/plentysystems`
  : 'http://localhost:8181/plentysystems'

  console.log('APIendpoint', apiEndpoint)
  console.log('APIendpointEnv', process.env.API_ENDPOINT)


  const sdkConfig = {
    plentysystems: buildModule<PlentysystemsModuleType>(plentysystemsModule, {
      apiUrl: apiEndpoint,
    }),
  };

  return initSDK<typeof sdkConfig>(sdkConfig);
});
