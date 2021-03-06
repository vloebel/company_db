const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('../db');
const connection = require('../db/connection');



/////////////////////////////////////
// function promptAction
//  * prompts for the next action on the database
//////////////////////////////////////////////
// to destructure -  1:48
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
        console.log("I am a fish")
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

function viewDept() {
  db.selectAllDepartments()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
      promptAction();
    })
}

function viewRoles() {
  db.selectAllRoles()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
    })
    promptAction();

}

function viewEmp() {
  db.selectAllEmployees()
    .then(([data]) => {
      console.log("\n");
      console.table(data);
    })
    promptAction();
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
            console.log(`\n Enter salary in dollars, for example, 25000:`);
            return false;
          }
          // no input  
        } else return false;
      }
    },

  ]).then(deptData => {
    let newName = deptData.roleName;
    let newSal = deptData.salary;

    db.selectAllDepartments()
      .then(([depts]) => {
        inquirer.prompt([
          {
            type: "list",
            name: "selectedDept",
            message: `\nSelect a department:`,
            choices: depts.map(d => ({ value: d.id, name: d.name }))
          }
        ])
          .then((newData) => {
            console.log({newData})
            console.log(newName, newSal, newData.selectedDept);
            db.addRole(newName, newSal, newData.selectedDept);
          })
      })


    //--------------------------------

  }) //deptData


    .then(() => promptAction());

}


function addEmp() {
  // prompt for first and last name
  var newFirstName, newLastName, newRole, newManagerId;
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'First Name:',
      validate: inputStr => {
        if (inputStr) {
          // validate only letters entered
          if (/^[a-zA-Z]+$/.test(inputStr)) {
            return true;
          } else {
            console.log(`\nEnglish letters only, please:`);
            return false;
          }
          // no inputStr 
        } else return false;
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Last Name:',
      validate: inputStr => {
        if (inputStr) {
          // validate only letters entered
          if (/^[a-zA-Z]+$/.test(inputStr)) {
            return true;
          } else {
            console.log(`\nEnglish letters only, please`);
            return false;
          }
          // no inputStr  
        } else return false;
      }
    },

  ]).then(empData => {
    // force proper noun case
    newFirstName = (
      empData.firstName.charAt(0).toUpperCase() +
      empData.firstName.slice(1).toLowerCase());
    newLastName = (
      empData.lastName.charAt(0).toUpperCase() +
      empData.lastName.slice(1).toLowerCase());

    // get a list of roles from db for user to pick from
    db.selectAllRoles()
      .then(([roles]) => {
        inquirer.prompt([
          {
            type: "list",
            name: "selectedRole",
            message: `\nSelect a role for ${newFirstName} ${newLastName}:`,
            choices: roles.map(r => ({ value: r.id, name: r.title }))
          }
        ])
          .then((newData) => {
            newRole = newData.selectedRole;
            console.log(newFirstName, newLastName, newRole);
          })
      }) //prompt for role
  }) //prompt for empData]git
    .then(() => {
      // get a list of employees for user to pick manager
      db.selectAllEmployees()
        .then(([employee]) => {
          inquirer.prompt([
            {
              type: "list",
              name: "selectedMgr",
              message: `\nSelect a manager for ${newFirstName} ${newLastName}:`,
              choices: employee.map(emp => ({ value: emp.id, name: `${emp.firstName} ${emp.lastName}` }))
            }
          ])
            .then((newData) => {
              newManagerId = newData.selectedMgr;
              console.log(newFirstName, newLastName, newRole, newManagerId);
            })
        })
    }) // selectAllEmployees

    //--------------------------------

    .then(() => promptAction());

}

function updateEmpRole() {
  console.log("updating employee role");
}

module.exports = promptAction; 