import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }

  return globalAny.__singletons[name];
}

function createDatabaseConnection() {
  const poolConnection = mysql.createPool({
    uri: process.env.MYSQL_URI,
  });

  return drizzle(poolConnection);
}

const db = singleton("db", createDatabaseConnection);

export default db;
