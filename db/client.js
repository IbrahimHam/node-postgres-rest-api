const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
    connectionString: process.env.CONNECTION_STRING
});

module.exports = db;


