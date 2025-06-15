require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Employee Management System - Your one stop solution for your employees');
});

// Register routes before listening to the server

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);

const skillRoutes = require('./routes/skillRoutes');
app.use('/skills', skillRoutes);

// Only start the server if this file is run directly (not imported for testing)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;

