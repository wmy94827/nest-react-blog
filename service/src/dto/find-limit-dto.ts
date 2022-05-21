import { ApiProperty } from '@nestjs/swagger';

export class FindLimitDto {
  @ApiProperty({ description: 'page' })
  page?: number = 1;

  @ApiProperty({ description: 'size' })
  size?: number = 10;
}
