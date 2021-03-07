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
  // returns everthing from role plus the linked department name
  displayRoleData() {
    return this.connection.promise().query(
      `SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      LEFT JOIN department ON role.department_id = department.id
      `);
  }
  
  selectAllEmployees() {
    return this.connection.promise().query(
      `SELECT id, first_name, last_name 
          FROM employee`);
  }

  //Returns employee ids, first names, last names, 
  //job titles, departments, salaries, and managers
  displayEmployeeData() {
    return this.connection.promise().query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, 
      role.salary, CONCAT(e.first_name, ' ', e.last_name) AS manager
      FROM employee 
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department  ON role.department_id = department.id
      LEFT JOIN employee AS e ON employee.manager_id = e.id`
    );
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