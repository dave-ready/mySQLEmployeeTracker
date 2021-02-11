//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const fs = require("fs");
const util = require("util");
const cTable = require("console.table");
const env = require(".env");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: ".env",
    database: "employeeTracker_DB"
  });

  async function promptUser(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
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




