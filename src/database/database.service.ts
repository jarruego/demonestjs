import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class DatabaseService {
  constructor(private readonly db: NodePgDatabase) {}

  public query() {
    return this.db;
  }
}
