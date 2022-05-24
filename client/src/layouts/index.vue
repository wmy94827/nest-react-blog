<script setup lang="ts">
import { Switch, Select, Space } from "ant-design-vue";
import { ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useSettingStore } from "@/store/modules/setting";
import themeJson from "juejin-markdown-themes/dist/index.json";
const router = useRouter();

const settingStore = useSettingStore();
const markdownTheme = ref("channing-cyan");
const checked = ref(settingStore.theme === "dark");
watch(checked, (newValue) => {
  settingStore.setTheme(newValue ? "dark" : "light");
});
watchEffect(() => {
  const styleElement = document.createElement("style");
  styleElement.type = "text/css";
  const themeValue = markdownTheme.value as "juejin"; // 防止ts themeJson[themeValue]报错
  styleElement.innerText = themeJson[themeValue].style;
  styleElement.id = "theme";
  const oldDom = document.querySelector("#theme");
  oldDom?.remove();
  document.head.appendChild(styleElement);
});
const themeOptions = Object.keys(themeJson)?.map((val) => ({
  label: val,
  value: val,
}));
const goHome = () => {
  router.push("/home");
};
</script>

<template>
  <div class="box">
    <div class="header">
      <div class="container flex items-center justify-between">
        <ul class="flex">
          <li class="active" @click="goHome">首页</li>
        </ul>
        <div class="">
          <Space>
            <Switch
              v-model:checked="checked"
              :checked="true"
              checked-children="暗黑主题"
              un-checked-children="默认主题"
            />
            <span class="label">展示主题:</span>
            <Select
              class="w-200px"
              v-model:value="markdownTheme"
              :options="themeOptions"
              placeholder="请选择文章主题"
            ></Select>
          </Space>
        </div>
      </div>
    </div>
    <div class="container pt-60px">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="less">
.box {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
}
.header {
  position: fixed;
  left: 0;
  top: 0;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--header-background);
  border-bottom: 1px solid var(--page-border-color);
  z-index: 100;
  ul {
    height: 100%;
    li {
      color: var(--text-color-secondary);
      cursor: pointer;
      height: 100%;
      padding: 0 10px;
      margin-right: 20px;
      &:hover {
        color: var(--primary-color);
      }
    }
    .active {
      color: var(--primary-color);
    }
  }
  .label {
    color: var(--text-color-secondary);
  }
}
</style>
