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
  
  addEmployee(fname, lname, role, mgr) {
    return this.connection.promise().query(
      `INSERT into employee SET ?`,
      {
        first_name: fname,
        last_name: lname,
        role_id: role,
        manager_id: mgr
      });
  }
  updateEmployeeRole(id, role) {
    return this.connection.promise().query(
      `UPDATE employee WHERE ? SET ?`,
      [{
        id: id
      },
      {
        role_id: role
      }]);
  }
}     

module.exports = new DB(connection);