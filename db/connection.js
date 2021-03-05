const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'bootcamp',
  password: 'bootcamp',
  database: 'company_db'
});

connection.connect(function (err) {
  if (err) {
    throw err;
  }
})

module.exports = connection;