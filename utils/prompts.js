const promptTeam = require  ('./src/promptTeam');
const generateHTML = require('./src/generateHTML');
const { writeMarkup, copyCSS } = require('./src/writeFiles');

//  Department mockup
[
  { 'deptId': '1', 'name': 'administration' },
  { 'deptId': '2', 'name': 'engineering' },
  { 'deptId': '3', 'name': 'sales and marketing' },
  { 'deptId': '4', 'name' :'personnel' },
]; 
[
  { 'roleId': '1', 'title': 'admin', 'salary': 31000.00, 'empDept': '4', 'deptIdLink': '1' },
  { 'roleId': '2', 'title': 'coder', 'salary': 42000.00, 'empDept': '3', 'deptIdLink': '2' },
  { 'roleId': '3', 'title': 'sales', 'salary': 53000.00, 'empDept': '1', 'deptIdLink': '3' },
  { 'roleId': '4', 'title' :'personnel', 'salary': 64000.00, 'empDept': '2', 'deptIdLink': '3'},
]; 

//  Employee mockup
const employeeMock = [
  { 'empId': '1', 'empFirstName': 'Sasha', 'empLastName': 'Brown', 'roleIdLink': '4', 'empMgr': 'null' },
  { 'empId': '2', 'empFirstName': 'Rafat', 'empLastName': 'Abonour', 'roleIdLink': '3', 'empMgr': 'null' },
  { 'empId': '3', 'empFirstName': 'Jacob', 'empLastName': 'Arthur', 'roleIdLink': '1', 'empMgr': '3' },
  { 'empId': '4', 'empFirstName':'Markus', 'empLastName': 'Wu', 'roleIdLink': '2', 'empMgr': '3'},
]; 
//  Role mockup

console.log(
  `==========  Happy Coding Company Presents  ================
  ================ HAPPY CODING MANAGER ===================               ===
    Your one stop shop for viewing and updating
      information about our departments, employee roles,
      and most importantly, our employees.
  `);


promptTeam(teamArray)
  .then(teamArray => {
    // console.log("final team is " + JSON.stringify(teamArray));
    markupString = generateHTML(teamArray); 
    writeMarkup(markupString);
    copyCSS();
    console.log(`
    ===========================================================
      Thank you for running Happy Coding Manager
    ===========================================================
    `)

  })
  
  
