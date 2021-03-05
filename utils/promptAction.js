const inquirer = require('inquirer');
const consoleTable = require('console.table');
const pressAnyKey = require('press-any-key');
// const mysql = require('mysql2');
const db = require('../db');
const connection = require('../db/connection');
// const { listenerCount } = require('mysql2/typings/mysql/lib/Pool');
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

// calls db method to display department table
function viewDept() {
  db.selectAllDepartments()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
    })
    .then(() =>
      promptAction()
    );
}
// calls db method to display role table
function viewRoles() {
  db.selectAllRoles()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
    })
    .then(() =>
      promptAction()
    );
}
// calls db method to display employee table
function viewEmp() {
  db.selectAllEmployees()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
    })
  .then(() =>
    promptAction()
  );
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
        // console.log("\n");
        // console.table(data);
        promptAction()
      })
  })
}

function addRole() {
  let newName, newSalary, newDepartment;
  inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "New role title:",
      validate: inputStr => {
        if (inputStr) return true;
        else return false;
      }
    },
    {
      type: "input",
      name: "salary",
      message: "Salary in dollars:)",
      validate: inputStr => {
        if (inputStr) {
          if (/^[0-9]+$/.test(inputStr)) {
            return true;
          } else {
            console.log(`\n Salary in dollars, for example, 25000:`);
            return false;
          }
          // no input  
        } else return false;
      }
    },

  ]).then(deptData => {
    newName = deptData.roleName;
    newSalary = deptData.salary;

    console.log(`New dept info name = ${deptData.roleName} sal = ${deptData.salary}`);

    db.selectAllDepartments()
      .then(([depts]) => {
        //------------------------------
        inquirer.prompt([
          {
            type: "list",
            name: "selectedDept",
            message: `\nSelect a department:`,
            choice: depts.map(d => ({ value: d.id, name: d.name }))
          }
        ])
          .then((moreData) => {
            console.log(newTitle, newSalary, moreData.id)
          })
        })


        //--------------------------------

      }) //deptData


      .then(() => promptAction());
      
  }


function addEmp() {
  db.selectAllRoles()
    .then(([data]) => {
      console.log("\n");
      pressAnyKey()
        .then(() => {
          promptAction();
        });
    })
}

function updateEmpRole() {
  console.log("updating employee role");
}

module.exports = promptAction; 