const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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


function addNewEmployee() {
    inquirer.prompt(newEmployee)
    .then(data => {
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
            )
            .catch(err =>
                console.log(err)
            );
        };
    })  
    .catch(err =>
        console.log(err)
    );
};


addNewEmployee();




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
