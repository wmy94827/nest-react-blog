import {
  ApiErrCode,
  ApiException,
} from './../../core/exceptions/api.exception';
import { Injectable } from '@nestjs/common';
import { CreateArticleDto, ListArticleDto, UpdateArticleDto } from './dto';
import { isNull } from '../../../utils/index';
import { Like, Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Category } from '../categorys/entities/category.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  // 新增文章
  async create(createArticleDto: CreateArticleDto) {
    const { categoryId } = createArticleDto;
    // 查询分类是否存在
    const exitsCategory = await this.categoryRepository.findOne({
      where: {
        categoryId,
      },
    });
    if (!exitsCategory) {
      throw new ApiException(ApiErrCode.CATEGORY_NOT_EXIST);
    }
    // 查询标签是否存在
    const exitsTag = await this.tagRepository.find({
      where: {
        tagId: In(createArticleDto.tagIds),
      },
    });
    const createInfo = this.articleRepository.create(createArticleDto);
    createInfo.category = exitsCategory;
    createInfo.tags = exitsTag;
    await this.articleRepository.save(createInfo);
    return {};
  }

  // 查询文章列表
  async findAll(query: ListArticleDto) {
    const { size = 10, page = 1, title, tagIds = [], categoryId } = query;
    const search = {
      title: isNull(title) ? undefined : Like(`%${title}%`),
      deleteFlag: 0, // 查询未删除的
      'category.categoryId': isNull(categoryId) ? undefined : categoryId, // 根据分类id查询
      tags: {
        tagId: tagIds.length > 0 ? In(tagIds) : undefined, // 根据标签id列表查询
      },
    };
    const startSize = (Number(page) - 1) * Number(size) ?? 0;
    const [articleList, total] = await this.articleRepository.findAndCount({
      join: {
        alias: 'article',
        leftJoinAndSelect: {
          tags: 'article.tags',
          category: 'article.category', // 关联分类 第一个category就是起的别名，where时候就可以使用了
        },
      },
      where: search, // 查询条件
      skip: startSize, // 跳过多少条
      take: size, // 获取多少条
      order: {
        createTime: 'DESC', // 排序 按照时间倒序
      },
    });
    return {
      articleList,
      total,
    };
  }

  async findOne(articleId: string) {
    const exist = await this.articleRepository.findOne({
      where: { articleId, deleteFlag: 0 },
      relations: ['tags', 'category'],
    });
    if (exist) {
      return exist;
    }
    // 没有找到文章
    throw new ApiException(ApiErrCode.ARTICLE_NOT_EXIST);
  }

  async update(articleId: string, updateArticleDto: UpdateArticleDto) {
    const exist = await this.articleRepository.findOne({
      where: { articleId },
    });
    if (!exist) {
      throw new ApiException(ApiErrCode.TAG_NOT_EXIST);
    } else {
      await this.articleRepository.update(
        articleId,
        this.articleRepository.merge(exist, updateArticleDto),
      );
      return {};
    }
  }

  async remove(articleId: string) {
    const exist = await this.articleRepository.findOne({
      where: { articleId },
    });
    if (!exist) {
      // 没有找到
      throw new ApiException(ApiErrCode.CATEGORY_NOT_EXIST);
    } else {
      await this.articleRepository.update(
        articleId,
        this.articleRepository.merge(exist, { deleteFlag: 1 }),
      );
      return {};
    }
  }
}
