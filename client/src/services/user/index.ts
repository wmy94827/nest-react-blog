import fetch from '@/utils/fetch';
const prefix = '/user';

export const register = (params: API.User.RegisterParams) =>
  fetch<API.User.RegisterResult>({
    method: 'post',
    url: `${prefix}/register`,
    params,
    name: '注册用户',
  });

