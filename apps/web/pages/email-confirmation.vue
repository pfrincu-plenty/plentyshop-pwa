<template>
  <div class="w-full p-8 overflow-x-auto text-center">
    {{ $t('emailConfirmation.newsletterOptInMessage') }}
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  pageType: 'static',
});
</script>
