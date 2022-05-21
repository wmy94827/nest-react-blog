import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @ApiProperty({ description: '标签id' })
  @IsNotEmpty({ message: '标签id不能为空' })
  tagId: string;
}
