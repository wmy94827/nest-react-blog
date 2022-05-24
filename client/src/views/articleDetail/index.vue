<script setup lang="ts">
import { useRequest } from "@/utils/hooks";
import { useRoute } from "vue-router";
import { Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import { getArticleDetail } from "@/services/article";
import { Spin } from "ant-design-vue";

import "juejin-markdown-themes/dist/juejin.css"; // md theme
import "bytemd/dist/index.css";
import "highlight.js/styles/github.css";
const plugins = [
  breaks(), // 换行
  frontmatter(), // 文章头部信息
  gfm(), // 公共格式化语法
  math(), // 数学公式
  mediumZoom(), // 缩放预览图片
  mermaid(), // 图表
  highlight(),
];
const route = useRoute();
const articleId = route.params.articleId as string;
const { data: detail, loading } = useRequest(async () => {
  return await getArticleDetail(articleId);
});
</script>
<template>
  <Spin :spinning="loading">
    <div class="detail">
      <div class="title">{{ detail?.title }}</div>
      <Viewer :plugins="plugins" :value="detail?.content" />
    </div>
  </Spin>
</template>

<style scoped lang="less">
.detail {
  background-color: var(--component-background);
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 30px;

  .title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }
}
</style>
