const { removeListener } = require('./connection');
const connection = require('./connection');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  selectAllEmployees() {
    return this.connection.promise().query(
      `SELECT id, first_name, last_name 
      FROM employee`);
  }

  selectAllDepartments() {
    return this.connection.promise().query('SELECT id, name FROM department');
  }

  //id will be passed in to the method
  selectEmployeeById(id) {
    return this.connection.promise().query(
      `SELECT id, first_name, last_name 
      FROM employee 
      WHERE id = ?;`,
      id);
  }

  selectEmployeeById() {
    return this.connection.promise().query('SELECT id, first_name, last_name FROM employee WHERE id = ?;', id);
  }

  // selectEmployeeByDept() {
  //  return this.connection.promise().query(`SELECT first_name, last_name FROM employee
  //  where employee.role_id = role.id AND role.department_id = department.id AND
  //  WHERE department.id = ?,' id);
  // }

  // addEmployee() {
  //   return this.connection.promise().query('INSERT INTO employee SET ?',
  //     {
  //       first_name: employee.firstName,
  //       last_name: employee.lastName,
  //       role: employee.role,
  //       manager: employee.manager
  //     },
  //   );
  // }

  // deleteEmployee() {
  //   return this.connection.promise().query('DELETE FROM employee WHERE ?',
  //     {
  //       employee_id: id;
  //     },
  //   );
  // }
  
  //select all the employees in department x

  // employee - role_id -> role(id)  role.department_id -> department(id)

  //query method two etc

}

module.exports = new DB(connection);