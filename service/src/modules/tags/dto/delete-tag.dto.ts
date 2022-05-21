import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteTagDto {
  @ApiProperty({ description: '标签id' })
  @IsNotEmpty({ message: '标签id不能为空' })
  tagId: string;
}
