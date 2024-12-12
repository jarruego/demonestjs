import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RoleDTO {
  @ApiProperty()
  @IsNumber()
  declare id: number;

  @ApiProperty()
  @IsString()
  declare name: string;
}
