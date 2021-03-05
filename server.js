const mysql = require('mysql2');
const db = require('./db');
promptAction = require('./utils/promptAction')

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