import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty({ message: '文章名称不能为空' })
  title: string;

  @ApiProperty({ description: '内容' })
  @IsNotEmpty({ message: '文章内容不能为空' })
  content: string;

  @ApiProperty({ description: '标签Id' })
  @IsNotEmpty({ message: '标签不能为空' })
  tagIds: [];

  @ApiProperty({ description: '分类Id' })
  @IsNotEmpty({ message: '分类不能为空' })
  categoryId: string;

  @ApiProperty({ description: '封面' })
  @IsNotEmpty({ message: '封面不能为空' })
  coverImage: string;

  @ApiProperty({ description: '内容概览' })
  @IsNotEmpty({ message: '内容概览不能为空' })
  summary: string;
}
