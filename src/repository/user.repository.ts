import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { rolesTable, usersTable, UsersTableInsert } from '../database/schema';
import { DB_PROVIDER } from '../database/database.module';
import { gte, sql, eq } from 'drizzle-orm';

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
    return await this.databaseService.query().select().from(usersTable);
  }

  async findAllUsersName() {
    return await this.databaseService
      .query()
      .select({ nameField: usersTable.name })
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
      .innerJoin(rolesTable, eq(usersTable.roleId, rolesTable.id));
  }
}
