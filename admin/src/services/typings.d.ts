/* eslint-disable @typescript-eslint/no-unused-vars */
import { User as UserType } from './user/type';
import { Auth as AuthType } from './auth/type';
import { Tag as TagType } from './tag/type';
import { Category as CategoryType } from './category/type';
import { Article as ArticleType } from './article/type';

declare global {
  /** 全局API */
  namespace API {
    type PageParams = {
      size: number;
      page: number;
    };

    type Success = {};

    export import User = UserType;

    export import Auth = AuthType;

    export import Tag = TagType;

    export import Category = CategoryType;

    export import Article = ArticleType;
  }
}
