import { sql } from "drizzle-orm";
import {
  datetime,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const activities = mysqlTable("activities", {
  id: int("id").autoincrement().primaryKey().notNull(),
  userName: varchar("user_name", { length: 100 }).notNull(),
  station1: datetime("station1", { mode: "string" }).default(sql`NULL`),
  station2: datetime("station2", { mode: "string" }).default(sql`NULL`),
  station3: datetime("station3", { mode: "string" }).default(sql`NULL`),
  station4: datetime("station4", { mode: "string" }).default(sql`NULL`),
  station5: datetime("station5", { mode: "string" }).default(sql`NULL`),
  createdAt: datetime("created_at", { mode: "date" }).default(sql`NULL`),
  updatedAt: datetime("updated_at", { mode: "date" }).default(sql`NULL`),
});

export const adminUsers = mysqlTable("admin_users", {
  id: int("id").autoincrement().primaryKey().notNull(),
  userName: varchar("username", { length: 50 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
