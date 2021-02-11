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


