import 'dotenv/config';
import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DatabaseService } from './database.service';

export const DB_PROVIDER = 'database-service';

@Global()
@Module({
  providers: [
    {
      provide: DB_PROVIDER,
      useFactory: async () => {
        const db = drizzle(process.env.DATABASE_URL!);
        return new DatabaseService(db);
      },
    },
  ],
  exports: [DB_PROVIDER],
})
export class DatabaseModule {}
