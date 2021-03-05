const inquirer = require('inquirer');
const consoleTable = require('console.table');
const pressAnyKey = require('press-any-key');
const { viewDept, viewRoles, viewEmp } = require('./viewData');
const { addDept, addRole, addEmp } = require('./addData');

const db = require('../db');
const connection = require('../db/connection');

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
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Exit"
      ],
    },
  ]).then(inquirerData => {
    switch (inquirerData.newAction) {
      case "View Departments":
        viewDept();
        return;
      case "View Roles":
        viewRoles();
        return;
      case "View Employees":
        viewEmp();
        return;
      case "Add Department":
        addDept();
        return;
      case "Add Role":
        addRole();
        return;
      case "Add Employee":
        addEmp();
        return;
      case "Update Employee Role":
        updateEmpRole();
      case "Exit":
        connection.end();
        return;
    }
  });
};


function updateEmpRole() {
  console.log("updating employee role");
}

module.exports = promptAction; 