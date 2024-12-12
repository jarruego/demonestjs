import { Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create-demo')
  async createDemo() {
    return await this.roleService.createDemoRole();
  }

  @Get(':id')
  async findRoleById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.roleService.findRoleById(id);
  }
}
