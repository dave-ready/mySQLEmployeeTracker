USE employee_tracker_db



INSERT INTO department (name) VALUES ("Sales"),
INSERT INTO department (name) VALUES ("Engineering"),
INSERT INTO department (name) VALUES ("Legal"),
INSERT INTO department (name) VALUES ("Finance"),

INSERT INTO role_info (title, salary, department_id) VALUES ('Attorney', 70000, 3),
INSERT INTO role_info (title, salary, department_id) VALUES ('Full Stack Developer', 85000, 2),
INSERT INTO role_info (title, salary, department_id) VALUES ('Controller', 60000, 4),
INSERT INTO role_info (title, salary, department_id) VALUES ('Financial Controls Specialist', 70000, 4),
INSERT INTO role_info (title, salary, department_id) VALUES ('Paralegal', 40000, 3);
INSERT INTO role_info (title, salary, department_id) VALUES ('Sales Manager', 80000, 1),
INSERT INTO role_info (title, salary, department_id) VALUES ('Accounts Payable Specialist', 55000, 4),
INSERT INTO role_info (title, salary, department_id) VALUES ('Sales Associate', 55000, 1),


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Pete', 'Shelley', 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Dough', 2, 2),
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Janet', 'Kay', 3, 4),
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mary', 'Wilson', 4, 2),
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Lou', 'Ferrigno', 5, 1),
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Millie', 'Small', 6, NULL),
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Shane', 'Macgowan', 6, NULL),
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Harry', 'Dean', 7, 1),
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Debbie', 'Harry', 8, 4),
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Joe', 'Blow', 9, 2),
    
    
    

