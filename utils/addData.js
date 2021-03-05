const inquirer = require('inquirer');
const consoleTable = require('console.table');
const pressAnyKey = require('press-any-key');
const db = require('../db');
const connection = require('../db/connection');
const { viewDept, viewRoles, viewEmp } = require('./viewData');
const promptAction = require('./promptAction');


// const promptDeptName = () => {
//   return inquirer.prompt([
//     {
//       type: "input",
//       name: "deptName",
//       message: "Enter Department Name:",
//       validate: inputStr => {
//         if (inputStr) return true;
//         else return false;
//       }
//     }
//   ]);
// }

addDept = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "Enter Department Name:",
      validate: inputStr => {
        if (inputStr) return true;
        else return false;
      }
    }
  ])
    .then(promptData => {
      db.addDepartment(promptData.deptName)
        .then(([data]) => {
          console.log("\n");
          console.table(data);
          // press any key to continue
          pressAnyKey()
            .then(() => {
              promptAction();
            });
        })
    })
}

function addRole() {
  let newName, newSalary, newDepartment;
  inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the title of this role?",
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
            console.log(`\n Please enter salary as a whole number in dollars, for example, 25000:`);
            return false;
          }
          // no input  
        } else return false;
      }
    },

  ]).then(deptData => {
    newName = deptData.roleName;
    newSalary = deptData.salary;
    // let user select from a list of departments
    db.selectAllDepartments()
      .then(([data]) => {
        console.log("after selecting depts data is ", {data});
        inquirer.prompt([
          {
            type: 'list',
            name: department,
            message: 'Add role to which department?',
            choices: [data],
          }
        ]).then(moreDeptData => {
          newDepartment = moreDeptData.department;
          console.log(newName, newSalary, newDepartment);
        }
        );
      }); //then db.selectAllDepartments
  });//then deptData
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

module.exports = { addDept, addRole, addEmp}; 