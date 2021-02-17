USE employee_tracker_db

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
    ('Sales Manager', 80000, 1),
    ('Accounts Payable Specialist', 55000, 4),
    ('Sales Associate', 55000, 1),
    
    
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
	('Pete', 'Shelley', 1, 3);
    ('John', 'Dough', 2, ),
    ('Janet', 'Kay', 3, 4),
    ('Mary', 'Wilson', 4, 2),
    ('Lou', 'Ferrigno', 5, 1),
    ('Millie', 'Small', 6, NULL),
    ('Shane', 'Macgowan', 6, NULL),
    ('Harry', 'Dean', 7, 1),
    ('Debbie', 'Harry', 8, 4),
    ('Joe', 'Blow', 9, 2),
    
    
    

