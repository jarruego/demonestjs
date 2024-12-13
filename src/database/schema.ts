import {
  boolean,
  integer,
  pgTable,
  PgTableWithColumns,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { UserModel } from 'src/models/user/user.model';

// Users

export const usersTable = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 64 }).notNull(),
  lastName: varchar({ length: 255 }),
  age: integer().default(0).notNull(),
  password: varchar({length: 255}).notNull(),

  roleId: integer()
    .notNull()
    .references(() => rolesTable.id),
});

export type UsersTableSelect = InferSelectModel<typeof usersTable>;
export type UsersTableInsert = InferInsertModel<typeof usersTable>;
export type UsersTableUpdate = Omit<Partial<UsersTableSelect>, 'id'>;

// Role

export const rolesTable = pgTable('roles', {
  id: serial().primaryKey(),
  name: varchar({ length: 16 }).notNull().unique(),
  isVip: boolean('vip').default(false).notNull(),
});

export type RolesTableSelect = InferSelectModel<typeof rolesTable>;
export type RolesTableInsert = InferInsertModel<typeof rolesTable>;
export type RolesTableUpdate = Omit<Partial<RolesTableSelect>, 'id'>;
