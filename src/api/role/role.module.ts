import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleRepository } from '../../repository/role.repository';
import { RoleController } from './role.controller';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository], // Lo exportamos para que en el UserModule se pueda hacer el import
})
export class RoleModule {}
