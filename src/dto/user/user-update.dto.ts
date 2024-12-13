import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsOptional
} from 'class-validator';
import { UserModel } from 'src/models/user/user.model';
import { UserDTO } from './user.dto';

export class UserUpdateDTO extends UserDTO { 
  @ApiProperty()
  // @IsPositive() // En caso de que queramos que sea positivo, sin límite de edad
  @Min(0)
  @Max(130)
  @IsNumber()
  @IsOptional()
  declare age: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  declare roleId: number;
}
