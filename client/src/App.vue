<script setup lang="ts">
import { useSettingStore } from "./store/modules/setting";
const settingStore = useSettingStore();
</script>

<template>
  <div
    id="app"
    :class="`${settingStore.theme === 'dark' ? 'theme-dark' : 'theme-primary'}`"
  >
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  background: var(--page-background);
  color: var(--text-color);
}
*,
ul,
p,
ol {
  margin: 0;
  padding: 0;
}
.container {
  max-width: 1226px;
  margin: 0 auto;
}
</style>
