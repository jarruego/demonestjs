import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from '../../repository/user.repository';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [RoleModule],
})
export class UserModule {}
