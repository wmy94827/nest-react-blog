import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FindLimitDto } from '../../../dto/find-limit-dto';

export class ListTagDto extends PartialType(FindLimitDto) {
  @ApiProperty({ description: '标签名' })
  tagName?: string;
}
