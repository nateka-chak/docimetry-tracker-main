import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let connection;

async function createConnection() {
  if (!connection) {
    connection = await mysql.createConnection(dbConfig);
  }
  return connection;
}

export async function query(sql, params) {
  const conn = await createConnection();
  try {
    const [results] = await conn.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function endConnection() {
  if (connection) {
    await connection.end();
    connection = null;
  }
}