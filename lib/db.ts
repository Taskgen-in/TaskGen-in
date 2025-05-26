// lib/db.js (for JS) or db.ts (for TS)
import mysql from 'mysql2/promise';

// export const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'task', // Change as needed
//   waitForConnections: true,
//   connectionLimit: 10,
// });

export const pool = mysql.createPool({
  host: '43.204.234.124',
  user: 'admin',
  password: 'Mind%^%^',
  database: 'task', // Change as needed
  waitForConnections: true,
  connectionLimit: 10,
});
