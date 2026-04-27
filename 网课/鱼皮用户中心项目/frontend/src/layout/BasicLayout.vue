<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue';

</script>

<template>
  <div id="BasicLayout">
    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
     <a-layout>
        <a-layout-header class="header">
          <GlobalHeader />
        </a-layout-header>
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
        <a-layout-footer class="footer">
          <a href="http://mtedium.cn" target="_blank">
            Blog by mtedium
          </a>
        </a-layout-footer>
      </a-layout>
    </a-space>
  </div>
</template>

<style scoped>
#BasicLayout .header {
  background: white;
  margin-bottom: 16px;
  color: unset;
  padding-inline: 20p;
}


#BasicLayout .content {
  padding: 20px;
  margin-bottom: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
}

#BasicLayout .footer {
  background-color: bisque;
  text-align: center;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px;
}
</style>
