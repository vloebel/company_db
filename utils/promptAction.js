const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql2');
const db = require('../db');
/////////////////////////////////////
// function promptAction
//  * prompts for the next action on on the database

//////////////////////////////////////////////
// to destructure - see lecture 1:48
const promptAction = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "newAction",
      message: "Use arrow keys to select:",
      choices: [
        "View Employees",
        "View Departments",
        "View Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Information",
        "Add Employee Role",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit"
      ],
    },
  ]).then(inquirerData => {
    switch (inquirerData.newAction) {
      case "View Employees":
        viewEmp();
        return ;
      case "View Roles":
          viewRole();
          return;
      case "View Departments":
        viewDept();
        return;

      case "Add Employee":
        console.log("creating query: addEmployee();");
        return;

      case "Remove Employee":
        console.log("creating query: removeEmployee();");
        return;

      case "Update Employee Information":
        console.log("creating query: updateEmployeeInfo();");

      case "Add Employee Role":
        console.log("creating query: addEmployeeRole();");

      case "Update Employee Role":
        console.log("creating query: updateEmployeeRole();");

      case "Update Employee Manager":
        console.log("creating query: updateEmployeeManager();");

      case "Exit":
      default:
        return;
    }
  });
};

function viewEmp(){
  db.selectAllEmployees()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
      promptAction();
  })
}

function viewDept(){
  db.selectAllDepartments()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
  })
}

module.exports = promptAction; 