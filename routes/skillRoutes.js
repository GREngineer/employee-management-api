const express = require('express');
const router = express.Router();
const { getAllSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { validateSkill } = require('../middlewares/validation');

router.get('/', getAllSkills);
router.post('/', validateSkill, createSkill);
router.put('/:id', validateSkill, updateSkill);
router.delete('/:id', deleteSkill);

module.exports = router;