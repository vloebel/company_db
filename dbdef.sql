DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db
USE company_db
DROP TABLE IF EXISTS department
DROP TABLE IF EXISTS role
DROP TABLE IF EXISTS employee

CREATE TABLE department (
  id INT (11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  UNIQUE (id),
  PRIMARY KEY (id)
);

/* note: a foreign key in one table 
references the primary key in another */
CREATE TABLE role (
  id INT (11) AUTO_INCREMENT NOT NULL,--fk on dept(id)
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL NOT NULL DEFAULT 0.00
  department_id INT  --references department (id)
  UNIQUE (id),
  PRIMARY KEY (id)
  CONSTRAINT fk_department
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT (11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT FK , -- fk on role(id)
  manager_id INT, -- fk on id in this table?
  UNIQUE (id),    
  PRIMARY KEY (id)  
  CONSTRAINT fk_role_id 
    FOREIGN KEY (role_id) 
    REFERENCES role(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL 
);
