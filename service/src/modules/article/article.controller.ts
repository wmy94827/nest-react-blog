import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { filterXSS } from 'xss';
import { Auth } from '../../core/decorator/auth.decorator';
import {
  CreateArticleDto,
  UpdateArticleDto,
  ListArticleDto,
  DeleteArticleDto,
} from './dto';
import { UserRoleEnum } from '../../user/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '创建文章' })
  @Auth([UserRoleEnum.Admin])
  @Post('create')
  create(@Body() createArticleDto: CreateArticleDto) {
    createArticleDto.content = filterXSS(createArticleDto.content);
    createArticleDto.summary = filterXSS(createArticleDto.summary);
    return this.articleService.create(createArticleDto);
  }

  @ApiOperation({ summary: '获取文章列表' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('list')
  findAll(@Body() body: ListArticleDto) {
    return this.articleService.findAll(body);
  }

  @ApiOperation({ summary: '获取文章详情' })
  @Get('detail')
  findOne(@Query() query: DeleteArticleDto) {
    return this.articleService.findOne(query.articleId);
  }

  @ApiOperation({ summary: '更新文章' })
  @Auth([UserRoleEnum.Admin])
  @Put('edit')
  update(
    @Body('articleId') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  @ApiOperation({ summary: '删除文章' })
  @Auth([UserRoleEnum.Admin])
  @Delete('delete')
  remove(@Query() query: DeleteArticleDto) {
    return this.articleService.remove(query.articleId);
  }
}
