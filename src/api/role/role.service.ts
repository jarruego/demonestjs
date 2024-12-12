import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../repository/role.repository';
import { faker } from '@faker-js/faker';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findDefaultOrCreate() {
    const def = await this.roleRepository.findOneRandom();
    if (def) return def.id;

    return await this.createDemoRole();
  }

  async createDemoRole() {
    return (
      await this.roleRepository.create({
        name: faker.science.chemicalElement().name,
      })
    ).insertedId;
  }

  async findRoleById(roleId: number) {
    return await this.roleRepository.findRoleById(roleId);
  }
}
