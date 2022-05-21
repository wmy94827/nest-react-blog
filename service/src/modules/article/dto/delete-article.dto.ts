import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteArticleDto {
  @ApiProperty({ description: '文章id' })
  @IsNotEmpty({ message: '文章id不能为空' })
  articleId: string;
}
