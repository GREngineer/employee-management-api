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
const { validateEmployee } = require('../middlewares/validation');

router.get('/', getAllEmployees);
router.post('/', validateEmployee, createEmployee);
router.put('/:id', validateEmployee, updateEmployee);
router.delete('/:id', deleteEmployee);

// Search routes
router.get('/search/name/:name', searchEmployeesByName);
router.get('/search/surname/:surname', searchEmployeesBySurname);
router.get('/search/skill/:skill', searchEmployeesBySkill);

module.exports = router;