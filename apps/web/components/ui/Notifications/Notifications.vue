<template>
  <div data-testid="notifications" class="sticky ml-auto w-50 right-2 max-w-[450px] z-[51] top-[10px]">
    <div v-for="notification of notifications" class="my-2" :key="notification.id">
      <UiNotificationsBaseNotification :strong="false" :notification="notification"></UiNotificationsBaseNotification>
    </div>
  </div>
</template>
<script setup lang="ts">
const { data: notifications } = useNotification();
</script>
