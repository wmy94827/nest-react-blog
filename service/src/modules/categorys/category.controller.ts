import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  ListCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto,
} from './dto';
import { Auth } from '../../core/decorator/auth.decorator';
import { UserRoleEnum } from '../../user/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('分类')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '创建分类' })
  @Auth([UserRoleEnum.Admin])
  @Post('create')
  create(@Body() createTagDto: CreateCategoryDto) {
    return this.categoryService.create(createTagDto);
  }

  @ApiOperation({ summary: '获取分类列表' })
  @Get('list')
  findAll(@Query() query: ListCategoryDto) {
    return this.categoryService.findAll(query);
  }

  @ApiOperation({ summary: '获取分类详情' })
  @Get('detail')
  findOne(@Query() query: DeleteCategoryDto) {
    return this.categoryService.findOne(query.categoryId);
  }

  @ApiOperation({ summary: '编辑分类' })
  @Auth([UserRoleEnum.Admin])
  @Put('edit')
  update(
    @Body('categoryId') id: string,
    @Body() updateTagDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateTagDto);
  }

  @ApiOperation({ summary: '删除分类' })
  @Auth([UserRoleEnum.Admin])
  @Delete('delete')
  remove(@Query() query: DeleteCategoryDto) {
    return this.categoryService.remove(query.categoryId);
  }
}
