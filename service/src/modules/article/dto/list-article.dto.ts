import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FindLimitDto } from '../../../dto/find-limit-dto';

export class ListArticleDto extends PartialType(FindLimitDto) {
  @ApiProperty({ description: '标题' })
  title?: string;

  @ApiProperty({ description: '标签id列表' })
  tagIds: string[];

  @ApiProperty({ description: '分类id' })
  categoryId: string;
}
