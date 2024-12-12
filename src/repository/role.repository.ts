import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { DB_PROVIDER } from '../database/database.module';
import { rolesTable, RolesTableInsert } from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class RoleRepository {
  constructor(
    @Inject(DB_PROVIDER) private readonly databaseService: DatabaseService,
  ) {}

  async findOne() {
    return (
      await this.databaseService.query().select().from(rolesTable).limit(1)
    )?.[0];
  }
  async findOneRandom() {
    const roles = await this.databaseService.query().select().from(rolesTable);
    const randomIndex = Math.floor(Math.random() * roles.length);
    return roles[randomIndex];
  }

  async create(role: RolesTableInsert) {
    return (
      await this.databaseService
        .query()
        .insert(rolesTable)
        .values([role])
        .returning({ insertedId: rolesTable.id })
    )[0];
  }

  async findRoleById(roleId: number) {
    return await this.databaseService
      .query()
      .select()
      .from(rolesTable)
      .where(eq(rolesTable.id, roleId));
  }
}
