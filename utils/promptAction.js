const inquirer = require("inquirer");

/////////////////////////////////////
// function promptAction
//  * prompts for the next action on on the database

//////////////////////////////////////////////

const promptAction = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "newAction",
      message: "Use arrow keys to select:",
      choices: [
        "View Employees",
        "View Employees by Department",
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
        console.log("creating query: viewAllEmployees()");
        return promptAction();
        
      case "View Employees by Department":
        console.log("creating query: viewEmployessByDepartment();");
        return promptAction();
      case "View Employees by Manager":
        console.log("creating query: viewEmployessByManager();");
        return promptAction();

      case "Add Employee":
        console.log("creating query: addEmployee();");
        return promptAction();

      case "Remove Employee":
        console.log("creating query: removeEmployee();");
        return promptAction();

      case "Update Employee Information":
        console.log("creating query: updateEmployeeInfo();");
        return promptAction();

      case "Add Employee Role":
        console.log("creating query: addEmployeeRole();");
        return promptAction();

      case "Update Employee Role":
        console.log("creating query: updateEmployeeRole();");
        return promptAction();

      case "Update Employee Manager":
        console.log("creating query: updateEmployeeManager();");
        return promptAction();

      case "Exit":
      default:
        return;
    }
  });
};

module.exports = promptAction; 