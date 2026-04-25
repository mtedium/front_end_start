<template>
  <div id="GlobalHeader">
    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
  </div>
</template>


<script lang="ts" setup>
import { h, ref } from 'vue';
import {
  HomeOutlined,
  CrownOutlined,
} from '@ant-design/icons-vue';

const current = ref<string[]>(['mail']);
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/user/login',
    label: '用户登录',
    title: '用户登录',
  },
  {
    key: '/user/register',
    label: '用户注册',
    title: '用户注册',
  },
  {
    key: '/admin/userManage',
    icon: () => h(CrownOutlined),
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: 'others',
    label: h(
      'a',
      { href: 'https://mtedium.cn', target: '_blank' },
      '个人博客',
    ),
    title: '个人博客',
  },
]);
</script>

