import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { faker } from '@faker-js/faker';
import { UsersTableInsert } from '../../database/schema';
import { RoleService } from '../role/role.service';
import { UserModel } from 'src/models/user/user.model';

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
      age: faker.number.int({ min: 18, max: 99 }),
      roleId: await this.roleService.findDefaultOrCreate(),
      password: "Admin1234"
    });
  }

  async findAllUsers() {
    const usersWithRoles = await this.userRepository.findAllUsersWithRole();
    return usersWithRoles.map((userWithRole) => ({
      id: userWithRole.users.id,
      name: userWithRole.users.name,
      lastName: userWithRole.users.lastName,
      age: userWithRole.users.age,
      roleId: userWithRole.roles.id,
      roleName: userWithRole.roles.name,
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
    return (await this.userRepository.findUserById(userId))[0];
  }
}
