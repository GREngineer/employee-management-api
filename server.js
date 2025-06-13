require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Employee Management System - Your one stop solution for your employees');
});

// Register employee routes before listening to the server
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

