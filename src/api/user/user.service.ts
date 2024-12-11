import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { faker } from '@faker-js/faker';
import { UsersTableInsert } from '../../database/schema';
import { RoleService } from '../role/role.service';

/*
Este servicio contiene la lógica de negocio para gestionar usuarios.
*/
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

  async findAllUsers() {
    const results = await this.userRepository.findAllUsers();
    return results.map((result) => ({
      id: result.id,
      name: result.name,
    }));
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

  async deleteUser(userId: number) {
    return await this.userRepository.deleteUser(userId);
  }

  async updateUser(userId: number, user: Partial<UsersTableInsert>) {
    return await this.userRepository.updateUser(userId, user);
  }

  async findUserById(userId: number) {
    return await this.userRepository.findUserById(userId);
  }
}
