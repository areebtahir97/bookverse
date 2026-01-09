import pkg from "pg";
const { Pool } = pkg;
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

const db = new Pool({
  user: process.env.DB_USER,
  host:  process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:  Number(process.env.DB_PORT) || 5432,
  ssl: {
    rejectUnauthorized: false,
  },

});

export default db;