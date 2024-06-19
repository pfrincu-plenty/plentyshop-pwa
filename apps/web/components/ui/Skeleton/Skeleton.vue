<template>
    <span v-if="loading" class="animate-pulse" :class="classes">
    </span>
    <slot v-else></slot>
    </template>

<script setup lang="ts">
import { SkeletonProps } from './types';
defineProps<SkeletonProps>();

</script>