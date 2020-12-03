// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    constructor(github){
        super();
        this.github = github;
    }

    getGithub(){

    }

    getRole(){
    // Overridden to return 'Engineer'
    }
}

module.Exports = Engineer;
