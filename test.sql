DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;
DROP TABLE IF EXISTS Persons;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS employee;

CREATE TABLE Persons (
  Personid INTEGER(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  UNIQUE (Personid),
  PRIMARY KEY (Personid)
);

CREATE TABLE Orders (
   OrderID int NOT NULL,
   OrderNumber int NOT NULL,
   PersonID int,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
);
