import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { faker } from '@faker-js/faker';
import { UsersTableInsert } from '../../database/schema';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
  ) {}

  async createUser(user: UsersTableInsert) {
    return await this.userRepository.createUser(user);
  }

  async createDemoUser() {
    return await this.createUser({
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      roleId: await this.roleService.findDefaultOrCreate(),
    });
  }

  async findAllUsersName() {
    const results = await this.userRepository.findAllUsersName();
    return results.map((result) => result.nameField);
  }

  async findAllAdultUsers() {
    return await this.userRepository.findAllAdultUsers();
  }

  async findAllAdultUsersByNameLength(len: number) {
    return await this.userRepository.findAllAdultUsersByNameLength(len);
  }

  async findAllUsersWithRole() {
    return await this.userRepository.findAllUsersWithRole();
  }
}
