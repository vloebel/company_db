const inquirer = require('inquirer');
const consoleTable = require('console.table');
const pressAnyKey = require('press-any-key');
// const mysql = require('mysql2');
const db = require('../db');
const connection = require('../db/connection');


// calls db method to display department table
function viewDept() {
  db.selectAllDepartments()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
      // press any key to continue
      pressAnyKey()
        .then(() => {
          promptAction();
        });
    })
}
// calls db method to display role table
function viewRoles() {
  db.selectAllRoles()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
      pressAnyKey()
        .then(() => {
          promptAction();
        });
    })
}
// calls db method to display employee table
function viewEmp() {
  db.selectAllEmployees()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
      pressAnyKey()
        .then(() => {
          promptAction();
        });
    });
}

module.exports = {viewDept, viewRoles, viewEmp}; 