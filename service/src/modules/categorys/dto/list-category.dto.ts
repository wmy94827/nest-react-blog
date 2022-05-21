import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FindLimitDto } from '../../../dto/find-limit-dto';

export class ListCategoryDto extends PartialType(FindLimitDto) {
  @ApiProperty({ description: '分类名称' })
  categoryName?: string;
}
