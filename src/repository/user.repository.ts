import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { rolesTable, usersTable, UsersTableInsert } from '../database/schema';
import { DB_PROVIDER } from '../database/database.module';
import { gte, sql, eq } from 'drizzle-orm';

/*
Este repositorio interactúa directamente con la base de datos para 
realizar operaciones CRUD sobre los usuarios.
*/
@Injectable()
export class UserRepository {
  constructor(
    @Inject(DB_PROVIDER) private readonly databaseService: DatabaseService,
  ) {}

  async createUser(user: UsersTableInsert) {
    return await this.databaseService
      .query()
      .insert(usersTable)
      .values([user])
      .returning({ insertedId: usersTable.id });
  }

  async findAllUsers() {
    return await this.databaseService
      .query()
      .select()
      .from(usersTable)
      .orderBy(usersTable.id);
  }

  async findAllUsersName() {
    return await this.databaseService
      .query()
      .select({ id: usersTable.id, nameField: usersTable.name })
      .from(usersTable);
  }

  async findAllAdultUsers() {
    return await this.databaseService
      .query()
      .select()
      .from(usersTable)
      .where(gte(usersTable.age, 18)); // gte significa Greater Than or Equal. Hay otros como eq (equals), gt (Greater Than), lt (Less Than), lte (Less Than or Equals)
  }

  // Las queries de esta función SI SON resistentes a SQL injection. Esto se debe al uso de sql``. Jamás debemos ejecutar queries en string sin usar sql``.
  async findAllAdultUsersByNameLength(len: number) {
    const data = await this.databaseService
      .query()
      .execute(
        sql`SELECT * FROM ${usersTable} WHERE ${usersTable.age} >= 18 AND LENGTH(${usersTable.name}) = ${len};`,
      );
    return data.rows;
  }

  async findAllUsersWithRole() {
    return await this.databaseService
      .query()
      .select()
      .from(usersTable)
      .innerJoin(rolesTable, eq(usersTable.roleId, rolesTable.id))
      .orderBy(usersTable.id); // Ordenar por id
  }

  async deleteUser(userId: number) {
    return await this.databaseService
      .query()
      .delete(usersTable)
      .where(eq(usersTable.id, userId));
  }

  async updateUser(userId: number, user: Partial<UsersTableInsert>) {
    return await this.databaseService
      .query()
      .update(usersTable)
      .set(user)
      .where(eq(usersTable.id, userId));
  }

  async findUserById(userId: number) {
    const user = await this.databaseService
      .query()
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

      return user;
  }
}
