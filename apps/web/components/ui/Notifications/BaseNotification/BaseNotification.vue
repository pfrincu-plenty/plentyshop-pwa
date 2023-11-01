<template>
  <UiAlert :variant="notification.type" :size="size" :strong="strong">
    <p class="py-2 mr-2">{{ notification.message }}</p>
    <button
      v-if="notification?.action?.onClick"
      @click="notification?.action?.onClick"
      type="button"
      :class="[
        'py-1.5 px-3 md:py-2 md:px-4 rounded-md ml-auto font-medium focus-visible:outline focus-visible:outline-offset',
        buttonClasses,
      ]"
    >
      {{ notification?.action?.text }}
    </button>
    <button
      type="button"
      @click="notification.dismiss"
      class="p-1.5 md:p-2 ml-2 rounded-md focus-visible:outline focus-visible:outline-offset"
      :class="[{ 'ml-auto': !notification?.action?.text }, buttonClasses]"
      aria-label="Close negative alert"
    >
      <SfIconClose class="hidden md:block" />
      <SfIconClose size="sm" class="block md:hidden" />
    </button>
  </UiAlert>
</template>
<script setup lang="ts">
import { SfIconClose } from '@storefront-ui/vue';
import { BaseNotificationProps } from './types';

const props = defineProps<BaseNotificationProps>();

const buttonClasses = computed(() => [
  props.strong ? 'text-white font-medium rounded-none' : 'rounded-md font-normal',
  {
    [`text-primary-800 ${props.strong ? 'bg-primary-600' : 'bg-primary-100'}`]: props.notification.type === 'primary',
    [`text-secondary-800 ${
      props.strong
        ? 'text-secondary-700 hover:bg-secondary-200 active:bg-secondary-300 hover:text-secondary-800 active:text-secondary-900'
        : 'bg-secondary-100'
    }`]: props.notification.type === 'secondary',
    [`text-negative-700 ${
      props.strong
        ? 'hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900'
        : 'bg-negative-100'
    }`]: props.notification.type === 'negative',
    [`text-neutral-900 border border-neutral-200 ${
      props.strong
        ? 'hover:bg-neutral-200 active:bg-neutral-300 hover:text-neutral-800 active:text-neutral-900'
        : 'bg-neutral-100'
    }`]: props.notification.type === 'neutral',
  },
]);
</script>
