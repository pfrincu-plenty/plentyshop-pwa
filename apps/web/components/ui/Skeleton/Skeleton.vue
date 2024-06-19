<template>
    <span v-if="loading" class="animate-pulse flex h-4 leading-6 bg-gray-300 rounded" :class="classes">
    </span>
    <slot v-else></slot>
    </template>

<script setup lang="ts">
import { SkeletonProps } from './types';
defineProps<SkeletonProps>();

</script>