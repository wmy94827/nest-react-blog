import fetch from '@/utils/fetch';
const prefix = '/article';

export const getArticleList = (params: API.Article.ListParams) =>
  fetch<API.Article.ListResult>({
    method: 'post',
    url: `${prefix}/list`,
    params,
    name: '获取文章列表',
  });

export const createArticle = (params: API.Article.CreateParams) =>
  fetch<API.Success>({
    method: 'post',
    url: `${prefix}/create`,
    params,
    name: '创建文章',
  });

export const getArticleDetail = (articleId: string) =>
  fetch<API.Article.ArticleDetailResult>({
    method: 'get',
    url: `${prefix}/detail`,
    params: { articleId },
    name: '文章详情',
  });

export const editArticle = (params: API.Article.EditParams) =>
  fetch<API.Success>({
    method: 'put',
    url: `${prefix}/edit`,
    params,
    name: '编辑文章',
  });

export const deleteArticle = (articleId: string) =>
  fetch<API.Success>({
    method: 'delete',
    url: `${prefix}/delete`,
    params: {
      articleId,
    },
    name: '删除文章',
  });
