import mysql from "mysql2/promise";

// Create a connection pool with the MySQL database
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "alumni",
  password: "root",
});

// Export the database connection pool
export default db;
