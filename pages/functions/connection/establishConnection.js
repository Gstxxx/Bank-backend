import mysql from "mysql2/promise";

export async function establishConnection() {
  return await mysql.createConnection({
    host: "mysql",
    user: "admin",
    password: "root123",
    database: "app_db",
  });
}
