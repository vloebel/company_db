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
        return ;
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
      default: //same as Exit
        return;
    }
  });
};

function viewDept(){
  db.selectAllDepartments()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
      promptAction();
    })
}

function viewRoles(){
  db.selectAllRoles()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
      promptAction();
    })
}

function viewEmp(){
  db.selectAllEmployees()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
      promptAction();
  })
}

function addDept() {
  inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "New Department Name:",
      validate: inputStr => {
        if (inputStr) return true;
        else return false;
      }
    },
  ]).then(deptData => {
    db.addDepartment(deptData.deptName)
      .then(([data]) => {
        console.log("\n");
        console.table(data);
      });
    });
    promptAction();
}

function addEmp (){
  db.selectAllRoles()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
  })
}
function addEmp (){
  db.selectAllRoles()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
  })
}


function updateEmpRole(){
  console.log("updating employee role");
}

module.exports = promptAction; 