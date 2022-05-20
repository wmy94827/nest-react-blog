/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Article {
  type ArticleItem = {
    articleId: string;
    title: string;
    content: string;
    readingNum: number;
    summary: string;
    category: {
      categoryName: string;
      categoryId: string;
    };
    tags: {
      tagName: string;
      tagId: string;
    }[];
    coverImage: string;
    createTime: string;
    updateTime: string;
  };

  type ListResult = {
    articleList: ArticleItem[];
    total: number;
  };

  type CreateParams = {
    content: string;
    title: string;
    categoryId: string;
    tagIds: string[];
    summary: string;
    coverImage: string;
  };

  type EditParams = CreateParams & {
    articleId: string;
  };

  type ListParams = API.PageParams & {
    categoryId?: string;
    tagIds?: string[];
    title?: string;
  };

  type ArticleDetailResult = ArticleItem & {};
}
