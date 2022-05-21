/**
 * @description 自定义业务状态码
 */
export enum ApiErrCode {
  /** 成功 */
  SUCCESS = 200,
  /** 用户未登录 */
  NOT_LOGIN = 10000,
  /** 用户已存在 */
  USER_EXIST = 10001,
  /** 用户不存在 */
  USER_NOT_EXIST = 10002,
  /** 密码错误 */
  PASSWORD_ERROR = 10003,
  /** 标签已存在 */
  TAG_EXIST = 10004,
  /** 标签不存在 */
  TAG_NOT_EXIST = 10005,
  /** 标签名称已存在 */
  TAG_NAME_EXIST = 10005_1,
  /** 分类已存在 */
  CATEGORY_EXIST = 10006,
  /** 分类不存在 */
  CATEGORY_NOT_EXIST = 10007,
  /** 分类名称已存在 */
  CATEGORY_NAME_EXIST = 10008,
  /** 文章已存在 */
  ARTICLE_EXIST = 10009,
  /** 文章不存在 */
  ARTICLE_NOT_EXIST = 10010,
}

const apiErrMsgMap = {
  [ApiErrCode.SUCCESS]: '成功',
  [ApiErrCode.NOT_LOGIN]: '用户未登录',
  [ApiErrCode.USER_EXIST]: '用户已存在',
  [ApiErrCode.USER_NOT_EXIST]: '用户不存在',
  [ApiErrCode.PASSWORD_ERROR]: '密码错误',
  [ApiErrCode.TAG_EXIST]: '标签已存在',
  [ApiErrCode.TAG_NOT_EXIST]: '标签不存在',
  [ApiErrCode.TAG_NAME_EXIST]: '标签名称已存在',
  [ApiErrCode.CATEGORY_EXIST]: '分类已存在',
  [ApiErrCode.CATEGORY_NOT_EXIST]: '分类不存在',
  [ApiErrCode.CATEGORY_NAME_EXIST]: '分类名称已存在',
  [ApiErrCode.ARTICLE_EXIST]: '文章已存在',
  [ApiErrCode.ARTICLE_NOT_EXIST]: '文章不存在',
};

export { apiErrMsgMap };
