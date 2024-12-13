import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../../dto/user/user.dto';
import { UserUpdateDTO } from 'src/dto/user/user-update.dto';

/*
Este controlador define las rutas de la API para gestionar usuarios.
*/
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-demo')
  async createDemoUser() {
    return await this.userService.createDemoUser();
  }

  @Post()
  async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Get('all')
  async findAllUsersName() {
    return await this.userService.findAllUsers();
  }

  @Get('all-adults')
  async findAllAdultUsers() {
    return await this.userService.findAllAdultUsers();
  }

  // ParseIntPipe nos asegura que al hacer la request el parámetro 'length' será un número. Si no lo es, lanzará un error de formato.
  @Get('all-adults-by-name-length')
  async findAllAdultUsersByNameLength(
    @Query('length', new ParseIntPipe()) len: number,
  ) {
    return await this.userService.findAllAdultUsersByNameLength(len);
  }

  @Get('all-with-role')
  async findAllUsersWithRole() {
    return await this.userService.findAllUsersWithRole();
  }

  @Get(':id')
  async findUserById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.findUserById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.userService.updateUser(id, body);
  }
}
