<script setup lang="ts">
import { ref, computed } from "vue";
import { useRequest } from "@/utils/hooks";
import { getCategoryList } from "@/services/category";
import ArticleList from "./components/ArticleList.vue";
const categoryId = ref("");
const { data: categoryData } = useRequest(async () => {
  return await getCategoryList({
    page: 1,
    size: 0,
  });
});

const categoryList = computed(() => {
  const list = categoryData.value?.categoryList ?? [];
  return [
    {
      categoryId: "",
      categoryName: "全部",
    },
    ...list,
  ];
});
</script>

<template>
  <div class="container">
    <div class="category-list">
      <div
        class="item"
        v-for="item in categoryList"
        :class="categoryId === item.categoryId ? 'active' : ''"
        @click="categoryId = item.categoryId"
        :key="item.categoryId"
      >
        {{ item.categoryName }}
      </div>
    </div>
    <ArticleList :categoryId="categoryId" />
  </div>
</template>

<style scoped lang="less">
.category-list {
  display: flex;
  margin: 10px 0 20px;
  .item {
    line-height: 40px;
    color: var(--text-color-secondary);
    cursor: pointer;
    height: 100%;
    padding: 0 20px;
    &:hover {
      color: var(--primary-color);
    }
  }
  .active {
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
  }
}
</style>
