import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: '分类名称' })
  @IsNotEmpty({ message: '分类名称不能为空' })
  categoryName: string;
}
