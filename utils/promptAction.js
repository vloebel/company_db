const db = require('../db');
const connection = require('../db/connection');
const consoleTable = require('console.table');
const { prompt } = require('inquirer');
const separator = "---------------------------------------------"


///////////////////////////////////////////////////////
//  FUNCTION promptAction 
//  Node/inquirer  Command Line Interface
// -Displays the menu of available functions
// -Calls the function based on user selection
// -ON EXIT closes the database connection
///////////////////////////////////////////////////////

const promptAction = () => {
  console.log(`${separator}`)
  return prompt([
    {
      type: "list",
      name: "action",
      message: "Use arrow keys to select:\n",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Delete Employee",
        "Exit"
      ],
    },
  ]).then(inquirerData => {
    switch (inquirerData.action) {
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
        return;
      case "Delete Employee":
        deleteEmp();
        return;
      case "Exit":
        console.log(
          `===========================================================\n
                =============  Keep it Klassy!  ============\n
        ===========================================================`);
        
        connection.end();
        return;
    }
  });
};
///////////////////////////////////////////////////////
//  FUNCTION viewDept
//  -Retrieves a list of departments from the db
//    and displays for user
///////////////////////////////////////////////////////

function viewDept() {
  db.selectAllDepartments()
    .then(([data]) => {
      console.log(`${separator}\n DEPARTMENTS\n${separator}`);
      console.table(data);
      console.log(`${separator}\n`);
    })
    .then(() => {
      promptAction();
    })
}
///////////////////////////////////////////////////////
//  FUNCTION viewRoles
//  -Displays the columns from roles plus their linked
//     department names
///////////////////////////////////////////////////////

function viewRoles() {
  db.displayRoleData()
    .then(([data]) => {
      console.log(`${separator}\n ROLES\n${separator}`);
      console.table(data);
      console.log(`${separator}\n`);
    })
    .then(() => {
      promptAction();
    })
}
///////////////////////////////////////////////////////
//  FUNCTION viewEmp
//  -Displays employee information together with the
//   linked columns for department and manager
///////////////////////////////////////////////////////

function viewEmp() {
  db.displayEmployeeData()
    .then(([data]) => {
      console.log(`${separator}${separator}\n EMPLOYEES\n${separator}${separator}`);
      console.table(data);
      console.log(`${separator}\n`);
    })
    .then(() => {
      promptAction();
    })
}
///////////////////////////////////////////////////////
//  FUNCTION addDept
//  -Prompts for the name of a new department
//  -Adds new department to the db
///////////////////////////////////////////////////////

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
///////////////////////////////////////////////////////
//  FUNCTION addRole
//  -Prompts for the name of a new employee role
//  -Retrieves departments from db and prompts for 
//    selection
//  -Adds new role to the db
///////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////
//  FUNCTION addEmp
//  -Prompts for employee first and last name
//  -Retrieves roles from db for user to select for employee
//  -Retrieves employees from db for user to select as the 
//     employee's manager
//  -Adds the new employee to the db
///////////////////////////////////////////////////////

function addEmp() {
  var empFirstName, empLastName, empRole, empManagerId
  // prompt for first and last name
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
      //display roles and select one
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
          }) 
          .then(() => {
            // display employees to pick manager
            db.selectAllEmployees()
              // prompt to pick manager
              .then(([employee]) => {
                prompt([
                  {
                    type: "list",
                    name: "selectedMgr",
                    message: `\nSelect a manager for ${empFirstName} ${empLastName}:`,
                    choices: employee.map(emp => ({ value: emp.id, name: `${emp.first_name} ${emp.last_name}` }))
                  }
                ])//assign manager
                  .then((mgrData) => {
                    empManagerId = mgrData.selectedMgr;
                    //  Insert Employee into Database
                    db.addEmployee(empFirstName, empLastName, empRole, empManagerId)
                    .then (()=>
                      promptAction()
                    );
                  }) // manager assigned
              })//employees displayed and mgr selcted
          }) //role assigned
      })//role displayed and selected
  })//roles retrieved from db
}

///////////////////////////////////////////////////////
//  FUNCTION updateEmpRole
//  -Retrieves employees from db for user to select 
//  -Retrieves roles from db for user to select as the 
//     employee's new role
//  -Updates the employee in the db with the new role
///////////////////////////////////////////////////////

function updateEmpRole() {
  var empId, newRole;
  db.selectAllEmployees()
      // prompt to pick employee
    .then(([employee]) => {
      const employeeArray = employee;
      // make a list of employees to choose from in inquirer
      const inquirerChoices =
        employeeArray.map(({ id, first_name, last_name }) => (
          {
            name: `${first_name} ${last_name}`,
            value: id
          }
        ));

        prompt([
          {
            type: "list",
            name: "selectedEmp",
            message: `${separator}\nSelect an employee to update:\n${separator}`,
            choices: inquirerChoices
          }
        ])
        .then((empData) => {
          //save the Employe ID for updating
          empId = empData.selectedEmp;
          db.selectAllRoles()
            .then(([roles]) => {
              prompt([
                {
                  type: "list",
                  name: "selectedRole",
                  message: `\nSelect the new role:`,
                  choices: roles.map(r => ({ value: r.id, name: r.title }))
                }
              ])//assign the role
                .then((roleData) => {
                  newRole = roleData.selectedRole;
                  // update employee role in Database
                  db.updateEmployeeRole(newRole, empId)
                    .then(() =>
                      promptAction()
                    );
                }) // role assigned
            })//roles displayed and  selcted   

        })//roles retrieved from db
    });
}

///////////////////////////////////////////////////////
//  FUNCTION deleteEmp
//  -Retrieves employees from db for user to select 
//  -Retrieves roles from db for user to select as the 
//     employee's new role
//  -Updates the employee in the db with the new role
///////////////////////////////////////////////////////

function deleteEmp() {
  var empId;
  db.selectAllEmployees()
    // prompt to pick employee
    .then(([employee]) => {
      const employeeArray = employee;
      // make a list of employees to choose from in inquirer
      const inquirerChoices =
        employeeArray.map(({ id, first_name, last_name }) => (
          {
            name: `${first_name} ${last_name}`,
            value: id
          }
        ));

      prompt([
        {
          type: "list",
          name: "selectedEmp",
          message: `${separator}\nSelect an employee to delete:\n${separator}`,
          choices: inquirerChoices
        }
      ])
        .then((empData) => {
          empId = empData.selectedEmp;
          db.deleteEmployee(empId)
            .then(() => {
              console.log(`** Deleted ** `);
              promptAction();
            });
        });
    });
}

///////////////////////////////////////////////////////
//                 PROGRAM START                     //
///////////////////////////////////////////////////////

console.log(
`===========================================================
=============  Classy Coding Company Presents  ============
================= CLASSY COMPANY MANAGER ================== 
  Your one stop shop for viewing and updating
    information about our departments, employee roles,
    and most importantly, our classy employees.
===========================================================
  `);
  

function startPrompt() {
  return (promptAction())
}


module.exports = startPrompt; 