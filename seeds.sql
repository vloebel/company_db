INSERT INTO department
(name) values 
('Administration'),
('Engineering'),
('Sales and Marketing'),
('Personnel');

INSERT INTO role
(title, salary, department_id) values 
('Admin', '32000.00', '1' ),
('Engineer', '40000.00', '2'),
('Database', '40000.00', '2'),
('Sales', '22000.00', '3'),
('Sales Engineer', '45000.00', '3'),
('Technical Writer', '38000.00','2'),
('General Manager', '75000.00', '1'),
('Human Resources', '86000.00', '4'),
('Head of Engineering', '75000.00', '2'),
('Head of Sales', '950000.00', '3');

INSERT INTO employee
(first_name, last_name, role_id, manager_id) values 
('Sasha','Brown','4', '0'),
('Rafat','Abonaur','3','0'),
('Linda','Wu','3','2');
