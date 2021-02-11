//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const fs = require("fs");
const util = require("util");
const cTable = require("console.table");
const env = require(".env");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: ".env",
    database: "employeeTracker_DB"
  });

  const PORT = process.env.PORT || 3306;

  app.listen(PORT, () =>
  console.log(`Server is now listening on: http://localhost:${PORT}`)
);

  async function promptUser() {
    inquirer
       .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: [
                "view All Employees",
                "view All Employees By Department",
                "view All Employees By Role",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee",
                "End Session"

              ]};

          ]).then(function(res){
            switch (res.options){
                case "view All Employees":
                    viewEmployees();
                break; 

                case "view All Employees By Department":
                    viewDepartment();
                break;

                case "view All Employees By Role":
                    viewRole();
                break;

                case "Add Employee":
                    addEmployee();
                break;

                case "Add Department":
                    addDepartment();
                break;

                case "Add Role":
                    addRole();
                break;

                case "Update Employee":
                    updateEmployee();
                break;

                default:
                    endSession();
            };
        });
};

function viewEmployees() {
    return new Promise(function (resolve, reject){
    connection.query("SELECT employee.first_name, employee.last_name FROM employee", function(err, res){
        if(err) throw err;
        
    });
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
            choices: managers
        },
    ])

};


function viewDepartment() {


};


function viewRole() {

};



function addDepartment() {

};


function addRole() {

};


function updateEmployee() {

};

function endSession() {

  connection.end()

};




