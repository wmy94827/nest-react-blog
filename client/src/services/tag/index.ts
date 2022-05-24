import fetch from '@/utils/fetch';
const prefix = '/tags';

export const getTagList = (params: API.Tag.ListParams) =>
  fetch<API.Tag.ListResult>({
    method: 'get',
    url: `${prefix}/list`,
    params,
    name: '获取标签列表',
  });

export const createTag = (params: API.Tag.CreateParams) =>
  fetch<API.Success>({
    method: 'post',
    url: `${prefix}/create`,
    params,
    name: '创建标签',
  });

export const editTag = (params: API.Tag.CreateParams & { tagId: string }) =>
  fetch<API.Success>({
    method: 'put',
    url: `${prefix}/edit`,
    params,
    name: '删除标签',
  });

export const deleteTag = (tagId: string) =>
  fetch<API.Success>({
    method: 'delete',
    url: `${prefix}/delete`,
    params: {
      tagId,
    },
    name: '删除标签',
  });
