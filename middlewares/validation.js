// Validation middleware for employees
const validateEmployee = (request, response, next) => {
    const { name, surname, skills } = request.body;

    // Check for required fields
    if (!name || !surname) {
        return response.status(400).json({
            error: 'Validation Error',
            message: 'Name and surname are required fields'
        });
    }

    // Check data types
    if (typeof name !== 'string' || typeof surname !== 'string') {
        return response.status(400).json({
            error: 'Validation Error',
            message: 'Name and surname must be strings'
        });
    }

    // Check for empty strings
    if (name.trim() === '' || surname.trim() === '') {
        return response.status(400).json({
            error: 'Validation Error',
            message: 'Name and surname cannot be empty'
        });
    }

    // Validate skills array when provided
    if (skills && !Array.isArray(skills)) {
        return response.status(400).json({
            error: 'Validation Error',
            message: 'Skills must be an array'
        });
    }

    // If all validations pass, continue to the next middleware/controller
    next();
};

// Validate skill data
const validateSkill = (request, response, next) => {
    console.log('MIDDLEWARE VALIDATION', request.body)
    const { name, description, category } = request.body;

    // Check for required fields
    if (!name || !description || !category) {
        return response.status(400).json({
            error: 'Validation Error',
            message: 'Name, description and category are required fields'
        });
    }

    // Check data types
    if (typeof name !== 'string' || typeof description !== 'string' || typeof category !== 'string') {
        return response.status(400).json({
            error: 'Validation Error',
            message: 'Name, description and category must be strings'
        });
    }

    // Check for empty strings
    if (name.trim() === '' || description.trim() === '' || category.trim() === '') {
        return response.status(400).json({
            error: 'Validation Error',
            message: 'Name, description and category cannot be empty'
        });
    }

    // If all validations pass, continue to the next middleware/controller
    next();
};

module.exports = { validateEmployee, validateSkill };