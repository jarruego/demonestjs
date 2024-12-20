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

/*
Este DTO (Data Transfer Object) define la estructura de los datos 
que se esperan en las solicitudes relacionadas con usuarios.
*/
export class UserDTO implements UserModel {
  @ApiProperty()
  @MaxLength(32)
  @MinLength(2)
  @IsString()
  declare name: string;

  @ApiProperty()
  @MaxLength(32)
  @MinLength(2)
  @IsString()
  @IsOptional()
  declare lastName?: string;

  @ApiProperty()
  // @IsPositive() // En caso de que queramos que sea positivo, sin límite de edad
  @Min(0)
  @Max(130)
  @IsNumber()
  @IsOptional()
  declare age: number;

  @IsPositive()
  @IsNumber()
  declare roleId: number;

  @IsString()
  declare password: string;
}
