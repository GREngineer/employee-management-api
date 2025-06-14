const { v4: uuidv4 } = require('uuid');

const skills = [
    {
        id: uuidv4(),
        name: "Audit",
        description: "Financial and business inspection",
        category: "Finance"
    },
    {
        id: uuidv4(),
        name: "Marketing",
        description: "Acquire and retain customers",
        category: "Advertising"
    },
    {
        id: uuidv4(),
        name: "Accounting",
        description: "Measure economic results",
        category: "Finance"
    },
    {
        id: uuidv4(),
        name: "SEO",
        description: "Helping users find websites",
        category: "Advertising"
    }
];

module.exports = skills;