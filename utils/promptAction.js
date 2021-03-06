const db = require('../db');
const connection = require('../db/connection');
const consoleTable = require('console.table');
const { prompt } = require('inquirer');
const dash = "-----------------------------------"


/////////////////////////////////////
// function promptAction prompts
// for the next action on the database
//////////////////////////////////////////////

const promptAction = () => {
  return prompt([
    {
      type: "list",
      name: "newAction",
      message: "Use arrow keys to select:\n",
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

function viewDept() {
  db.selectAllDepartments()
    .then(([data]) => {
      console.log(`${dash}\n DEPARTMENTS\n${dash}`);
      console.table(data);
      console.log(`${dash}\n`);
    })
    .then(() => {
      promptAction();
    })
}

function viewRoles() {
  db.selectAllRoles()
    .then(([data]) => {
      console.log(`${dash}\n ROLES\n${dash}`);
      console.table(data);
      console.log(`${dash}\n`);
    })
    .then(() => {
      promptAction();
    })
}

function viewEmp() {
  db.selectAllEmployees()
    .then(([data]) => {
      console.log(`${dash}\n EMPLOYEES\n${dash}`);
      console.table(data);
      console.log(`${dash}\n`);
    })
    .then(() => {
      promptAction();
    })
}

function addDept() {
  prompt([
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
        promptAction()
      })
  })
}

function addRole() {

  prompt([
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
        prompt([
          {
            type: "list",
            name: "selectedDept",
            message: `\nSelect a department:`,
            choices: depts.map(d => ({ value: d.id, name: d.name }))
          }
        ])
          .then((newData) => {
            db.addRole(newName, newSal, newData.selectedDept)
              .then(([data]) => {
                promptAction()
              })
          })
      })
  }) //deptData

}


function addEmp() {
  // prompt for first and last name
  var empFirstName, empLastName, empRole, empManagerId;
  prompt([
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

  ]).then(emp => {
    // force proper noun case
    empFirstName = (
      emp.firstName.charAt(0).toUpperCase() +
      emp.firstName.slice(1).toLowerCase());

    empLastName = (
      emp.lastName.charAt(0).toUpperCase() +
      emp.lastName.slice(1).toLowerCase());

    // get roles from db for user to pick from
    db.selectAllRoles()
      .then(([roles]) => {
        prompt([
          {
            type: "list",
            name: "selectedRole",
            message: `\nSelect a role for ${empFirstName} ${empLastName}:`,
            choices: roles.map(r => ({ value: r.id, name: r.title }))
          }
        ])//assign the role
          .then((inqData) => {
            empRole = inqData.selectedRole;
            console.log(empFirstName, empLastName, empRole);
          }) // list employees for user to pick manager 
          .then(() => {
            db.selectAllEmployees()
              .then(([employee]) => {
                prompt([
                  {
                    type: "list",
                    name: "selectedMgr",
                    message: `\nSelect a manager for ${newFirstName} ${newLastName}:`,
                    choices: employee.map(emp => ({ value: emp.id, name: `${emp.firstName} ${emp.lastName}` }))
                  }
                ])
                  .then((mgrData) => {
                    empManagerId = mgrData.selectedMgr;
                    console.log(newFirstName, newLastName, newRole, empManagerId);
                  })
                  .then(() => promptAction());
              })
          })
      })
  })
}

function updateEmpRole() {
  console.log("updating employee role");
}






///////////////////////////////
//     Kick it all off
//////////////////////////////

function startPrompt() {
  return (promptAction())
}


module.exports = startPrompt; 