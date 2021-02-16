//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const fs = require("fs");
const util = require("util");
const cTable = require("console.table");
require("dotenv").config();

const PORT = process.env.PORT || 3306;


const connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "employee_tracker_db"
  });

  console.log(process.env.PASSWORD)


connection.connect(function(err){
    if (err) throw err;
    promptUser();
    console.log("Database connection is now online on port: " + PORT);
})


async function promptUser() {
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

          ]).then(function(response){
            switch (response.menu){
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

    var employeeRoles = await roles();
    var managers = await managers();
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
            choices: employeeRoles
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'employeeManager',
            choices: employeeManagers
        },

    ]).then(async function(response) {
      //console.log(response.firstName, response.lastName, response.employeeRole, response.employeeManager);
      let role_ID = await new Promise(function(resolve, reject) {
          connection.query("SELECT * FROM role_info WHERE title = ?", {employeeRole: response.employeeRole}, 
          function(err, response) {
            if (err) reject(err);
            resolve(response[0].id);
      });
  });
      let manager_ID = await new Promise(function(resolve, reject) {
          connection.query("SELECT * FROM employee WHERE first_name = ?", {employeeManager: response.employeeManager}, 
          function(err, response) {
            if (err) reject(err);
            resolve(response[0].id);
      });
      console.log(manager_ID);
      console.log(role_ID)
  });
      
      connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES", { firstName: response.firstName, lastName: response.lastName, role_ID, manager_ID},
          async function(err, response) {
            if (err) throw err;
            let employees = await employees();
            console.table(response);
            promptUser();
      });
  });
};


async function roles() {


};

async function managerss() {


};

async function employees() {


};


async function addDepartment() {
    inquirer
      .prompt([
        {
            type: 'list',
            message: "In what Department does the employee work?",
            name: 'employeeDepartment',
            choices: ['Sales', 'Engineering', 'Legal', 'Finance']
        }
    ]).then(function(response) {
        connection.query("INSERT INTO department SET ?", {employeeDepartment: response.employeeDepartment}, 
            function(err){
                if (err) throw err
                console.table(response);
                promptUser();
        });
   });

};


async function addRole() {
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
            
        },
    ]).then(function(response){
        connection.query("INSERT INTO role_info SET ?", { employeeRole: response.employeeRole, 
                                                          employeeSalary: response.employeeSalary },
            function(err){
                if (err) throw err;
                console.table(response)
                promptUser();
        })
    })

};

async function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name FROM employee", function(err, res){
    if(err) reject(err);
    resolve(res);
   
    }),
    promptUser(); 
};


async function viewDepartment() {
    connection.query("SELECT * FROM department", function(err, response) {
        if (err) throw err,
        console.table(response);
        }),
        promptUser();
    };


async function viewRole(){
    connection.query("SELECT * FROM role_info", function(err, response) {
        if (err) throw err
        console.table(response)
        });
        promptUser();
}


async function selectRole(){

};


async function updateEmployee() {
    connection.query("SELECT * FROM employee", 
    function(err, response) {
        if (err) throw err   
        console.table(response);

        })

    connection.query("SELECT * FROM role_info", 
    function(err, response) {
        if (err) throw err 
        console.log(err); 
        console.table(response);
        
        })

    }


    
function endSession() {

  connection.end()

};




