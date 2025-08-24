import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const activities = mysqlTable("activities", {
	id: int().autoincrement().notNull(),
	userName: varchar("user_name", { length: 100 }).notNull(),
	station1: datetime({ mode: 'string'}),
	station2: datetime({ mode: 'string'}),
	station3: datetime({ mode: 'string'}),
	station4: datetime({ mode: 'string'}),
	station5: datetime({ mode: 'string'}),
	createdAt: datetime("created_at", { mode: 'string'}),
	updatedAt: datetime("updated_at", { mode: 'string'}),
});
