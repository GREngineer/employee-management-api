const skills = require('../models/skillModel');
const { v4: uuidv4 } = require('uuid');

const skillNotFound = 'Skill not found';

// Controller to get all skills
const getAllSkills = (request, response) => {
    response.json(skills);
};

// Create new skill
const createSkill = (request, response) => {
    const newSkill = request.body;
    const skillId = uuidv4();
    const createdSkill = { ...newSkill, id: skillId };
    skills.push(createdSkill);
    response.status(201).json(createdSkill);
};

// Update existing skill
const updateSkill = (request, response) => {
    const skillId = request.params.id;
    const updatedSkill = request.body;
    const skillIndex = skills.findIndex(skill => skill.id === skillId);
    if (skillIndex === -1) {
        return response.status(404).json({ message: skillNotFound });
    }
    skills[skillIndex] = { ...skills[skillIndex], ...updatedSkill, id: skillId };
    response.json(skills[skillIndex]);
};

// Delete skill
const deleteSkill = (request, response) => {
    const skillId = request.params.id;
    const skillIndex = skills.findIndex(skill => skill.id === skillId);
    if (skillIndex === -1) {
        return response.status(404).json({ message: skillNotFound });
    }
    skills.splice(skillIndex, 1);
    response.status(200).json({ message: 'Skill deleted successfully' });
};

module.exports = { getAllSkills, createSkill, updateSkill, deleteSkill };