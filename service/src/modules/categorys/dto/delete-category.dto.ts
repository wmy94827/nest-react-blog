import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteCategoryDto {
  @ApiProperty({ description: '分类id' })
  @IsNotEmpty({ message: '分类id不能为空' })
  categoryId: string;
}
