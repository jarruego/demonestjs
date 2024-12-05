import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
/*
El módulo de usuario (UserModule) proporciona una API RESTful para administrar usuarios.
El módulo de rol (RoleModule) proporciona una API RESTful para administrar roles.
*/
@Module({
  imports: [RoleModule, UserModule],
})
export class ApiModule {}
