const mysql = require("mysql2/promise");

const connectionDetails = {
  host: "mysql-database.czccwe4oeg4q.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
  database: "benjaminDB",
};

let connection;

async function initDatabase() {
  const connection = await mysql.createConnection(connectionDetails);

  await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        job VARCHAR(255) NOT NULL
      )
    `);

  const [rows] = await connection.query(`
      SELECT COUNT(*) AS count FROM users
    `);

  if (rows[0].count === 0) {
    await connection.query(`
        INSERT INTO users (name, age, job) VALUES 
        ('John Doe', 30, 'Software Engineer'),
        ('Jane Doe', 25, 'Data Analyst'),
        ('Mike Smith', 35, 'Project Manager')
      `);
  }
  await connection.end();
}

async function fetchAllUsers() {
  const connection = await mysql.createConnection(connectionDetails);
  const [users] = await connection.query("SELECT * FROM users");
  await connection.end();

  return users;
}

module.exports.initDatabase = initDatabase;
module.exports.fetchAllUsers = fetchAllUsers;
