const promptAction = require  ('../utils/promptAction');

//  Department mockup
let mockDept = [
  { 'deptId': '1', 'name': 'administration' },
  { 'deptId': '2', 'name': 'engineering' },
  { 'deptId': '3', 'name': 'sales and marketing' },
  { 'deptId': '4', 'name' :'personnel' },
]; 
//  Role mockup
let mockRole = [
  { 'roleId': '1', 'title': 'admin', 'salary': 31000.00, 'empDept': '4', 'deptIdLink': '1' },
  { 'roleId': '2', 'title': 'coder', 'salary': 42000.00, 'empDept': '3', 'deptIdLink': '2' },
  { 'roleId': '3', 'title': 'sales', 'salary': 53000.00, 'empDept': '1', 'deptIdLink': '3' },
  { 'roleId': '4', 'title' :'personnel', 'salary': 64000.00, 'empDept': '2', 'deptIdLink': '3'},
]; 
//  Employee mockup
let mockEmployee = [
  { 'empId': '1', 'empFirstName': 'Sasha', 'empLastName': 'Brown', 'roleIdLink': '4', 'empMgr': 'null' },
  { 'empId': '2', 'empFirstName': 'Rafat', 'empLastName': 'Abonour', 'roleIdLink': '3', 'empMgr': 'null' },
  { 'empId': '3', 'empFirstName': 'Jacob', 'empLastName': 'Arthur', 'roleIdLink': '1', 'empMgr': '3' },
  { 'empId': '4', 'empFirstName':'Markus', 'empLastName': 'Wu', 'roleIdLink': '2', 'empMgr': '3'},
]; 

console.log(
 `===========================================================
=============  Classy Coding Company Presents  ============
================= CLASSY COMPANY MANAGER ================== 
  Your one stop shop for viewing and updating
    information about our departments, employee roles,
    and most importantly, our classy employees.
===========================================================

  `);

promptAction()
  .then(() => {
    console.log(`
===========================================================
                  Keep it Classy!
===========================================================
`)
  }
);

