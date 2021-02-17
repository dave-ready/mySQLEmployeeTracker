INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Legal'),
    ('Finance');
    

INSERT INTO role_info (title, salary, department_id) VALUES
    ('Attorney', 70000, 3),
    ('Full Stack Developer', 85000, 2),
    ('Controller', 60000, 4),
    ('Financial Controls Specialist', 70000, 4),
    ('Paralegal', 40000, 3);
    ('Sales Broker', 80000, 1),
    ('Accounts Payable Specialist', 55000, 4),
    ('Sales Associate', 55000, 1),
    
    
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Joe', 'Blow', 1, 2),
    ('John', 'Dough', 2, 1),
    ('Janet', 'Kay', 3, 4),
    ('Shane', 'Macgowan', 4, 3),
    ('Mary', 'Wilson', 5, 2),
    ('Lou', 'Ferrigno', 6, 1),
    ('Harry', 'Dean', 7, 1),
    ('Debbie', 'Harry', 8, 4);
    
    
SELECT * FROM employee_tracker_db.employee;

SELECT * FROM employee_tracker_db.role_info;

SELECT * FROM employee_tracker_db.department;
   
