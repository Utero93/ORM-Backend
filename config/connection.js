// Import mysql2
const mysql = require('mysql2');

// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nirvana93!',
  database: 'company_db',
});

// export module
module.exports = db;