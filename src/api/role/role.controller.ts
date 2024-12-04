import { Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create-demo')
  async createDemo() {
    return await this.roleService.createDemoRole();
  }
}
