<script setup lang="ts">
import { ref, computed, watchEffect, watch } from "vue";
import { useRouter } from "vue-router";
import { getArticleList } from "@/services/article";
import { List, ListItem, Button } from "ant-design-vue";
import { useRequest } from "@/utils/hooks";
import { IMG_PREFIX } from "@/utils/constant";
interface Props {
  categoryId: string;
}
const router = useRouter();
const list = ref<API.Article.ArticleItem[]>([]);
const total = ref(0);
const page = ref(0);
const props = defineProps<Props>();
const { loading, run: onLoadMore } = useRequest(
  async () => {
    page.value++;
    return await getArticleList({
      categoryId: props.categoryId,
      page: page.value,
      size: 3,
    });
  },
  {
    onSuccess: (res) => {
      if (page.value === 1) {
        list.value = res.articleList ?? [];
      } else {
        list.value = [...list.value, ...res.articleList];
      }
      total.value = res.total;
    },
  }
);
watch(
  () => props.categoryId,
  () => {
    page.value = 0;
    onLoadMore();
  }
);
const listTotal = computed(() => list.value.length ?? 0);
const goDetail = (item: API.Article.ArticleItem) => {
  router.push({
    path: `/articleDetail/${item.articleId}`,
  });
};
</script>

<template>
  <div class="article-list">
    <List :loading="loading" item-layout="horizontal" :data-source="list">
      <template #loadMore>
        <div
          v-if="!loading && total > listTotal"
          class="text-center h-32px lh-32px"
        >
          <Button @click="onLoadMore" type="link">加载更多</Button>
        </div>
      </template>

      <template #renderItem="{ item }">
        <ListItem>
          <div
            class="article-item"
            :key="item.articleId"
            @click="goDetail(item)"
          >
            <img :src="`${IMG_PREFIX}${item.coverImage}`" />
            <div class="right">
              <div class="title">{{ item.title }}</div>
              <p class="desc">
                {{ item.summary }}
              </p>
            </div>
          </div>
        </ListItem>
      </template>
    </List>
  </div>
</template>

<style scoped lang="less">
.article {
  &-item {
    background: var(--component-background);
    display: flex;
    cursor: pointer;
    width: 100%;
    img {
      width: 300px;
      height: 160px;
      object-fit: cover;
    }
    .right {
      padding: 20px;
      .title {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 10px;
        color: var(--text-color);
      }
      .desc {
        font-size: 14px;
        color: var(--text-color-secondary);
      }
    }
  }
}
.article-list {
  padding-bottom: 30px;
  :deep(.ant-list-item) {
    border-bottom: none !important;
  }
}
</style>
