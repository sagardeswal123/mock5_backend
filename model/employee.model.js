const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    department : String,
    salary : Number
},{
    versionKey : false
});

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = {
    employeeModel
}



// - First Name
// - Last Name
// - Email
// - Department (Select Tag with Tech, Marketing, and Operations as options)
// - Salary