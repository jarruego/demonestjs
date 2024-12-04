CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"lastName" varchar(255),
	"age" integer DEFAULT 0 NOT NULL
);
