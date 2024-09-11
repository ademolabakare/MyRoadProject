const { Pool } = require('pg');

// Configure your PostgreSQL connection here
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'road_condition_db',
  password: 'adebabalola',
  port: 5432,  // Default PostgreSQL port
});

module.exports = pool;
