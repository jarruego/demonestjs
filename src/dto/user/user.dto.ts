import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

/*
Este DTO (Data Transfer Object) define la estructura de los datos 
que se esperan en las solicitudes relacionadas con usuarios.
*/
export class UserDTO {
  @ApiProperty()
  @MaxLength(32)
  @MinLength(2)
  @IsString()
  declare name: string;

  @ApiProperty()
  @MaxLength(32)
  @MinLength(2)
  @IsString()
  @Optional()
  declare lastName?: string;

  @ApiProperty()
  // @IsPositive() // En caso de que queramos que sea positivo, sin límite de edad
  @Min(0)
  @Max(130)
  @IsNumber()
  @Optional()
  declare age: number;

  @IsPositive()
  @IsNumber()
  declare roleId: number;
}
