//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const fs = require("fs");
const util = require("util");
const cTable = require("console.table");
const { resolve } = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3306;


const connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "employee_tracker_db"
  });




connection.connect(function(err){
    if (err) throw err;
    console.log("Database connection is now online on port: " + PORT);
    promptUser();
});


function promptUser() {
    inquirer
       .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: [
                "Add Employee",
                "Add Department",
                "Add Role",
                "view All Employees",
                "view All Employees By Department",
                "view All Employees By Role",
                "Update Employee Role",
                "End Session"

              ]}

          ]).then(function(data){
            switch (data.menu){
                case "Add Employee":
                    addEmployee();
                break;

                case "Add Department":
                    addDepartment();
                break;

                case "Add Role":
                    addRole();
                break;

                case "view All Employees":
                    viewEmployees();
                break; 

                case "view All Employees By Department":
                    viewDepartment();
                break;

                case "view All Employees By Role":
                    viewRole();
                break;

                case "Update Employee Role":
                    updateEmployee();

                break;

                case "End Session":
                    endSession();
                break;
            };
        });
};



async function addEmployee() {

    let employeeRoles = await roles();
    let employeeManagers = await managers();
    inquirer
      .prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'firstName',
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastName',
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'employeeRole',
            choices: selectRole()
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'employeeManager',
            choices: managers()
        }

    ]).then(async function(data) {
      let role_ID = await new Promise(function(resolve, reject) {
          connection.query("SELECT * FROM role_info WHERE title = ?", [data.employeeRole], 
          function(err, res) {
            if (err) reject(err);
            resolve(res);
      });
    
  });
      let manager_ID = await new Promise(function(resolve, reject) {
          connection.query("SELECT * FROM employee WHERE first_name = ?", [data.employeeManager], 
          function(err, res) {
            if (err) reject(err);
            //console.log(err);
            resolve(res);
      });
      
      
  });
      let employees = await employees();
      connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES", 
      { 
          first_name: data.firstName, 
          last_name: data.lastName, 
          role_id: data.employeeRole, 
          manager_id: data.employeeManager
         },
          async function(err, res) {
            if (err) throw err;
            //console.log(err);
            console.table(res);
      });
  });
  //promptUser();
};



async function roles() {
    return new Promise(function(resolve, reject) {
        let roleNames = [];
        connection.query("SELECT title FROM role_info", 
          function(err, res) {
            if(err) reject(err);
            
            for (let i = 0; i < res.length; i++) {
                roleNames.push(res[i].title)
            };
            resolve(roleNames);
        })
    })

};


async function managers() {
    return new Promise(function(resolve, reject) {
        let managerNames = [];
        connection.query("SELECT first_name FROM employee WHERE manager_id IS NULL", 
          function(err, res){
            if (err) reject(err);

            for (let i = 0; i < res.length; i++) {
                managerNames.push(res[i].first_name)
            };
            console.table(res);
            resolve(managerNames)
        });
    });
};



async function employees() {
    return new Promise(function (resolve, reject){
        let employeeNames = [];
        connection.query("SELECT first_name FROM employee", 
          function(err, res){
            if(err) reject(err);

            for (let i = 0; i < res.length; i++) {
                employeeNames.push(res[i].first_name)

            };
            console.table(res);
            resolve(employeeNames);
        });
    });
};


function addDepartment() {
    inquirer
      .prompt([
        {
            type: 'list',
            message: "In what Department does the employee work?",
            name: 'employeeDepartment',
            choices: ['Sales', 'Engineering', 'Legal', 'Finance']
        }

    ]).then(function(data) {
        connection.query("INSERT INTO department SET ?", 
        { 
            name: data.employeeDepartment 
        }, 
            function(err, res){
                if (err) throw err;
                console.table(res);
        });
   });
   promptUser();
};



function addRole() {
    inquirer
      .prompt([
        {
            type: 'input',
            message: "What is the employee's role?",
            name: 'employeeRole',
        },
        {
            type: 'input',
            message: "What is the Employee's salary?",
            name: 'employeeSalary',
            
        }],

    ).then(function(data){
        connection.query("INSERT INTO role_info SET ?", 
        { 
            title: data.employeeRole, 
            salary: data.employeeSalary 
        },
            function(err, res){
                if (err) throw err;
                console.table(res)
        })
    })
};
//promptUser();

function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role_info.title, title_role.salary, department.dep_name AS Manager FROM employee INNER JOIN title_role on title_role.id = employee.role_id INNER JOIN department on department.id = title_role.department_id LEFT JOIN employee on employee.manager_id = e.id;"),
    function(err, res){
      if(err) throw err,
      console.table(res);
      }),
      //promptUser(); 
};



function viewDepartment() {
    connection.query("SELECT * FROM department", 
    function(err, res) {
        if (err) throw err,
        console.table(res);
        }),
        promptUser();
    }



function viewRole(){
    connection.query("SELECT * FROM role_info", 
    function(err, res) {
        if (err) throw err
        console.table(res)
        });
        promptUser();
}



function selectRole() {
    let roles = [];
    connection.query("SELECT * FROM role_info", 
      function(err, res){
        if (err) throw err;
        console.log(err)
        for (let i = 0; i < res.length; i++) {
          roles.push(res[i].role_info)
        };
       
    });
    console.table(res)
};

function updateEmployee() {

    connection.query("SELECT * FROM employee", 
    function(err, res) {
        if(err) throw err;
        //console.log(err),
        console.table(res);
        })

    connection.query("SELECT * FROM role", 
    function(err, res) {
        if(err) throw err;
        //console.log(err);
        console.table(res);
    }).then
    inquirer
      .prompt([
    {
        type: "input",
        message: "Please enter the first name of the employee being updated",
        name: "employeeName"
    },
    
    {
        type: "input",
        message: "Please enter the new role id for the employee being updated",
        name: "newRole"
          
    }

  ]).then(function(data) {
      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[data.employeeName, data.newRole],
      function(err, res) {
        if (err) throw err;
        //console.log(res);
        console.table(res);
        promptUser();
      });
    });
};


function endSession() {

  connection.end()

};




