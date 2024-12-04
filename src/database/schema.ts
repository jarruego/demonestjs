import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, type InferInsertModel } from 'drizzle-orm';

// Users

export const usersTable = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 64 }).notNull(),
  lastName: varchar({ length: 255 }),
  age: integer().default(0).notNull(),

  roleId: integer()
    .notNull()
    .references(() => rolesTable.id),
});

export type UsersTableSelect = InferInsertModel<typeof usersTable>;
export type UsersTableInsert = InferInsertModel<typeof usersTable>;

// Role

export const rolesTable = pgTable('roles', {
  id: serial().primaryKey(),
  name: varchar({ length: 16 }).notNull().unique(),
  isVip: boolean('vip').default(false).notNull(),
});

export type RolesTableSelect = InferSelectModel<typeof rolesTable>;
export type RolesTableInsert = InferInsertModel<typeof rolesTable>;