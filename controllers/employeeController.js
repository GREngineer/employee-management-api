const employees = require('../models/employeeModel');
const { v4: uuidv4 } = require('uuid');

const empNotFoundMessage = 'Employee not found';

// Controller function to get all employees
const getAllEmployees = (request, response) => {
    response.json(employees);
};

// Function to create a new employee
const createEmployee = (request, response) => {
    // Get the employee data from the request body
    const newEmployee = request.body;
    // Generate unique id
    const employeeId = uuidv4();
    // Add to array
    const createdEmployee = { ...newEmployee, id: employeeId };
    employees.push(createdEmployee);
    // Send back newly created employee with success status
    response.status(201).json(createdEmployee);
};

// Function to update existing employee
const updateEmployee = (request, response) => {
    // Get employee id from URL
    const employeeId = request.params.id;
    // Get the updated data from request body
    const updatedData = request.body;
    // Find employee in array
    const employeeIndex = employees.findIndex(emp => emp.id === employeeId);
    // Return error when employee doesn't exist
    if (employeeIndex === -1) {
        return response.status(404).json({ message: empNotFoundMessage });
    }
    // Update emplooyee while keeping original id
    employees[employeeIndex] = { ...employees[employeeIndex], ...updatedData, id: employeeId };
    // Send back updated employee
    response.json(employees[employeeIndex]);
};

// Employee deletion function
const deleteEmployee = (request, response) => {
    const employeeId = request.params.id;
    const employeeIndex = employees.findIndex(emp => emp.id === employeeId);
    if (employeeIndex === -1) {
        return response.status(404).json({ message: empNotFoundMessage });
    }
    // Remove employee from array
    employees.splice(employeeIndex, 1);
    // Return success message
    response.status(200).json({ message: 'Employee deleted successfully' });
};

// Search employees by name (partial match)
const searchEmployeesByName = (request, response) => {
    const searchName = request.params.name.toLowerCase();
    const matchingEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchName)
    );
    response.json(matchingEmployees);
};

// Search employees by surname (partial match)
const searchEmployeesBySurname = (request, response) => {
    const searchSurname = request.params.surname.toLowerCase();
    const matchingEmployees = employees.filter(emp =>
        emp.surname.toLowerCase().includes(searchSurname)
    );
    response.json(matchingEmployees);
};

// Search employees by skill (find employees who have a specific skill)
const searchEmployeesBySkill = (request, response) => {
    const searchSkill = request.params.skill.toLowerCase();
    const matchingEmployees = employees.filter(emp =>
        emp.skills && emp.skills.some(skill =>
            skill.toLowerCase().includes(searchSkill)
        )
    );
    response.json(matchingEmployees);
};

module.exports = { 
    getAllEmployees, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee,
    searchEmployeesByName,
    searchEmployeesBySurname,
    searchEmployeesBySkill
}; 