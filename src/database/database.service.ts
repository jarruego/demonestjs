import { NodePgDatabase } from 'drizzle-orm/node-postgres';

/*
Este servicio proporciona una interfaz para interactuar con la base de datos.
*/
export class DatabaseService {
  constructor(private readonly db: NodePgDatabase) {}

  public query() {
    return this.db;
  }
}
