const { Pool } = require('pg');

// Configure your PostgreSQL connection here
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db',
  password: 'password',
  port: 5432,  // Default PostgreSQL port
});

module.exports = pool;
