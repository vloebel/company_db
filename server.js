const mysql = require('mysql2');


var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'bootcamp',
  password: 'bootcamp', 
  database : 'company_db',
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  afterConnection();
});

afterConnection = () => {
  connection.query('SELECT * FROM employee', function(err, res) {
    if (err) throw err;
    console.log(res);
  });
  console.log(`===================================`);
  connection.query(`SELECT * FROM employees where firstName =? `, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
  connection.end();

};

