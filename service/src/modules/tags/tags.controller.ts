import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto, ListTagDto, DeleteTagDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRoleEnum } from '../../user/entities/user.entity';
import { Auth } from '../../core/decorator/auth.decorator';

@ApiTags('标签')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: '创建标签' })
  @Auth([UserRoleEnum.Admin])
  @Post('create')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({ summary: '获取标签列表' })
  @Get('list')
  findAll(@Query() query: ListTagDto) {
    return this.tagsService.findAll(query);
  }

  @ApiOperation({ summary: '获取标签详情' })
  @Get('detail')
  findOne(@Query() query: DeleteTagDto) {
    return this.tagsService.findOne(query.tagId);
  }

  @ApiOperation({ summary: '编辑标签' })
  @Auth([UserRoleEnum.Admin])
  @Put('edit')
  update(@Body('tagId') tagId: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(tagId, updateTagDto);
  }

  @ApiOperation({ summary: '删除标签' })
  @Auth([UserRoleEnum.Admin])
  @Delete('delete')
  remove(@Query() query: DeleteTagDto) {
    return this.tagsService.remove(query.tagId);
  }
}
