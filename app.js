const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employees = [];

const newEmployee = [
    {
        type: 'input',
        name: 'name',
        message: 'Employee Name:'
    },
    {
        type: 'input',
        name: 'id',
        message: 'Employee ID:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Employee Email:'
    },
    {
        type: 'list',
        name: 'role',
        message: 'Please select the role for the new team member.',
        choices: ['Intern','Manager','Engineer']
    }
];

const newManager = [
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Manager Office Number:'
    }
];

const newEngineer = [
    {
        type: 'input',
        name: 'github',
        message: 'GitHub Profile Name:'
    }
];

const newIntern = [
    {
        type: 'input',
        name: 'school',
        message: 'School the intern is attending:'
    }
];


const addNewEmployee= () => {
    inquirer.prompt(newEmployee)
    .then(data => {
        // Role-specific questions to push the correct object values to the employees variable above.
        if(data.role === "Intern"){
            inquirer.prompt(newIntern)
            .then(
                employees.push(new Intern(data.name,data.id,data.email,data.school))
            )
            .catch(err => 
                console.log(err)
            );
        }else if(data.role ==="Engineer"){
            inquirer.prompt(newEngineer)
            .then(
                employees.push(new Engineer(data.name,data.id,data.email,data.github))
            )
            .catch(err => 
                console.log(err)
            );
        }else if(data.role === "Manager"){
            inquirer.prompt(newManager)
            .then(
                employees.push(new Manager(data.name,data.id,data.email,data.officeNumber))
            ).then(writeToHTML)
            .catch(err =>
                console.log(err)
            );
        };
    })
    .catch(err =>
        console.log(err)
    );   

};


const writeToHTML = (data) => {
    fs.writeFile(outputPath,render(employees), (err) =>
    err ? console.error(err) : console.log('Employee added!'))
}


addNewEmployee();



