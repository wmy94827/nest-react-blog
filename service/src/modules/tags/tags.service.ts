import {
  ApiErrCode,
  ApiException,
} from './../../core/exceptions/api.exception';
import { Injectable } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto, ListTagDto } from './dto';
import { isNull } from '../../../utils';
import { Like, Not, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const { tagName } = createTagDto;
    const exist = await this.tagRepository.findOne({
      where: { tagName, deleteFlag: 0 },
    });
    if (exist) {
      throw new ApiException(ApiErrCode.TAG_EXIST);
    }
    const newTag = await this.tagRepository.create(createTagDto);
    await this.tagRepository.save(newTag);
    return {};
  }

  async findAll(query: ListTagDto) {
    const { size = 10, page = 1, tagName } = query;
    const search = {
      tagName: isNull(tagName) ? undefined : Like(`%${tagName}%`),
      deleteFlag: 0, // 查询未删除的
    };

    const startSize = (Number(page) - 1) * Number(size) ?? 0;
    const [tagList, total] = await this.tagRepository.findAndCount({
      where: search, // 查询条件
      skip: startSize, // 跳过多少条
      take: size, // 获取多少条
      order: {
        createTime: 'DESC', // 排序 按照时间倒序
      },
    });
    return {
      tagList,
      total,
    };
  }

  async findOne(tagId: string) {
    const exist = await this.tagRepository.findOne({
      where: { tagId, deleteFlag: 0 },
    });
    if (exist) {
      return exist;
    }
    throw new ApiException(ApiErrCode.TAG_NOT_EXIST);
  }

  async update(tagId: string, updateTagDto: UpdateTagDto) {
    const existName = await this.tagRepository.findOne({
      where: {
        tagName: updateTagDto.tagName,
        deleteFlag: 0,
        tagId: Not(tagId),
      },
    });
    if (existName) {
      // 名称已存在
      throw new ApiException(ApiErrCode.TAG_NAME_EXIST);
    }
    const exist = await this.tagRepository.findOne({
      where: { tagId },
    });
    if (!exist) {
      throw new ApiException(ApiErrCode.TAG_NOT_EXIST);
    } else {
      await this.tagRepository.update(
        tagId,
        this.tagRepository.merge(exist, updateTagDto),
      );
      return {};
    }
  }

  async remove(tagId: string) {
    const exist = await this.tagRepository.findOne({
      where: { tagId },
    });
    if (!exist) {
      // 没有找到
      throw new ApiException(ApiErrCode.TAG_NOT_EXIST);
    } else {
      await this.tagRepository.update(
        tagId,
        this.tagRepository.merge(exist, { deleteFlag: 1 }),
      );
      return {};
    }
  }
}
