require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Employee Management System - Your one stop solution for your employees');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
