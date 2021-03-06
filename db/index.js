const mysql = require('mysql2');
const connection = require('./connection');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  selectAllDepartments() {
    return this.connection.promise().query(
      `SELECT id, name 
      FROM department`);
  }
    
  selectAllRoles() {
    return this.connection.promise().query(
      `SELECT id, title, salary, department_id 
        FROM role`);
  }
  // plus role_id and manager_id
  selectAllEmployees() {
    return this.connection.promise().query(
      `SELECT id, first_name, last_name 
          FROM employee`);
  }
  
  addDepartment(name) {
    return this.connection.promise().query(
      `INSERT into department SET ?`,
      {
        name: name
      })
      .catch(err => {
        throw error;
    })
  }
    
  addRole(title, salary, department_id) {
    return this.connection.promise().query(
      `INSERT into role SET ?`,
      {
        title: title,
        salary: salary,
        department_id: department_id
      });
  }
  
  
  selectEmployeeById() {
    return this.connection.promise().query('SELECT id, first_name, last_name FROM employee WHERE id = ?;', id);
  }

}

module.exports = new DB(connection);