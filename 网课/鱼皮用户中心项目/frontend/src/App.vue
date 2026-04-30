<script setup lang="ts">
import BasicLayout from './layout/BasicLayout.vue';
import { useLoginUserStore } from '@/store/useLoginUserStore';

const loginUserStore = useLoginUserStore();
loginUserStore.fetchLoginUser()

</script>

<template>
  <BasicLayout />
</template>

<style scoped></style>
