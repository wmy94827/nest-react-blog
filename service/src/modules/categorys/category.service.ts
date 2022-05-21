import { ListCategoryDto } from './dto/list-category.dto';
import {
  ApiException,
  ApiErrCode,
} from './../../core/exceptions/api.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Like, Not, Repository } from 'typeorm';
import { isNull } from '../../../utils';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { categoryName } = createCategoryDto;
    const exist = await this.categoryRepository.findOne({
      where: { categoryName, deleteFlag: 0 },
    });
    if (exist) {
      throw new ApiException(ApiErrCode.CATEGORY_EXIST);
    }
    const newCategory = await this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(newCategory);
    return {};
  }

  async findAll(query: ListCategoryDto) {
    const { size = 10, page = 0, categoryName } = query;
    const search = {
      tagName: isNull(categoryName) ? undefined : Like(`%${categoryName}%`),
      deleteFlag: 0, // 查询未删除的
    };

    const startSize = (Number(page) - 1) * Number(size) ?? 0;
    const [categoryList, total] = await this.categoryRepository.findAndCount({
      where: search, // 查询条件
      skip: startSize, // 跳过多少条
      take: size, // 获取多少条
      order: {
        createTime: 'DESC', // 排序 按照时间倒序
      },
    });
    return {
      categoryList,
      total,
    };
  }

  async findOne(categoryId: string) {
    const exist = await this.categoryRepository.findOne({
      where: { categoryId, deleteFlag: 0 },
    });
    if (exist) {
      return exist;
    }
    throw new ApiException(ApiErrCode.CATEGORY_NOT_EXIST);
  }

  async update(categoryId: string, updateTagDto: UpdateCategoryDto) {
    const existName = await this.categoryRepository.findOne({
      where: {
        categoryName: updateTagDto.categoryName,
        deleteFlag: 0,
        categoryId: Not(categoryId),
      },
    });
    if (existName) {
      // 名称已存在
      throw new ApiException(ApiErrCode.CATEGORY_NAME_EXIST);
    }
    const exist = await this.categoryRepository.findOne({
      where: { categoryId, deleteFlag: 0 },
    });
    if (!exist) {
      throw new ApiException(ApiErrCode.CATEGORY_NOT_EXIST);
    } else {
      await this.categoryRepository.update(
        categoryId,
        this.categoryRepository.merge(exist, updateTagDto),
      );
      return {};
    }
  }

  async remove(categoryId: string) {
    const exist = await this.categoryRepository.findOne({
      where: { categoryId },
    });
    if (!exist) {
      // 没有找到
      throw new ApiException(ApiErrCode.CATEGORY_NOT_EXIST);
    } else {
      await this.categoryRepository.update(
        categoryId,
        this.categoryRepository.merge(exist, { deleteFlag: 1 }),
      );
      return {};
    }
  }
}
