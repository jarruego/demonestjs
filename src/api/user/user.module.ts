import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from '../../repository/user.repository';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
/*
Este módulo gestiona la lógica relacionada con los usuarios. 
Importa el módulo de roles y define el controlador y los proveedores 
de servicios y repositorios de usuarios.
*/
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [RoleModule],
  exports: [UserService, UserRepository]
})
export class UserModule {}
