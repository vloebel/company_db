INSERT INTO department
(name) values 
('Administration'),
('Engineering'),
('Sales and Marketing');


INSERT INTO role
(title, salary, department_id) values 
('Admin', '32000.00', '1' ),
('Engineer', '40000.00', '2'),
('Database', '40000.00', '2'),
('Sales', '22000.00', '3'),
('Manager', '75000.00', '1');

INSERT INTO employee
(first_name, last_name, role_id, manager_id) values 
('Sasha','Brown','4', '2'),
('Rafat','Abonaur','1','0'),
('Linda','Wu','3','2');
('Jackson','Baretta','1','2');
('Peregrin','Nguyen','2','6');
('Cory','Lawrence','1','0');
