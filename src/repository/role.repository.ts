import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { DB_PROVIDER } from '../database/database.module';
import { rolesTable, RolesTableInsert } from '../database/schema';

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

  async create(role: RolesTableInsert) {
    return (
      await this.databaseService
        .query()
        .insert(rolesTable)
        .values([role])
        .returning({ insertedId: rolesTable.id })
    )[0];
  }
}
