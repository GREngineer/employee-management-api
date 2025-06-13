const employees = require('../models/employeeModel');

// Controller function to get all employees
const getAllEmployees = (request, response) => {
    response.json(employees);
};

module.exports = { getAllEmployees };