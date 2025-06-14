const express = require('express');
const router = express.Router();
const { 
    getAllEmployees, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee, 
    searchEmployeesByName, 
    searchEmployeesBySurname, 
    searchEmployeesBySkill 
} = require('../controllers/employeeController');

router.get('/', getAllEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

// Search routes
router.get('/search/name/:name', searchEmployeesByName);
router.get('/search/surname/:surname', searchEmployeesBySurname);
router.get('/search/skill/:skill', searchEmployeesBySkill);

module.exports = router;