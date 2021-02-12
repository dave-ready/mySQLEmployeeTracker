DROP DATABASE IF EXISTS employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role_info (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX department_index (department_id),
  CONSTRAINT department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_index (role_id),
  CONSTRAINT role_info FOREIGN KEY (role_id) REFERENCES role_info(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX manager_index (manager_id),
  CONSTRAINT manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

INSERT INTO department
    (name)

VALUES
    ('Sales'),
    ('Engineering'),
    ('Legal'),
    ('Finance');
    

INSERT INTO role_info
    (title, salary, department_id)

VALUES
    ('Attorney', 70000, 3),
    ('Full Stack Developer', 85000, 2),
    ('Controller', 60000, 4),
    ('Financial Controls Specialist', 70000, 4),
    ('Paralegal', 40000, 3);
    ('Sales Broker', 80000, 1),
    ('Accounts Payable Specialist', 55000, 4),
    ('Sales Associate', 55000, 1),
    
    
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)

VALUES
    ('Joe', 'Blow', 1, 2),
    ('John', 'Dough', 2, 1),
    ('Janet', 'Kay', 3, NULL),
    ('Shane', 'Macgowan', 4, 3),
    ('Mary', 'Wilson', 5, NULL),
    ('Lou', 'Ferrigno', 6, NULL),
    ('Harry', 'Dean', 7, 1),
    ('Debbie', 'Harry', 8, 4);
    
    
SELECT * FROM employee_tracker_db.employee;

SELECT * FROM employee_tracker_db.role_info;

SELECT * FROM employee_tracker_db.department;
   


