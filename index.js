const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

app.use(cors());

// Middleware for handling errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        message: 'Something went wrong on the server.',
        error: err.message
    });
});
const express = require('express');
const bodyParser = require('body-parser');


// POST Route for processing data with exception handling
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: 'Invalid input, expected an array.'
            });
        }

        // User details
        const userId = "john_doe_17091999";  // Static for now, can be dynamic
        const email = "john@xyz.com";
        const rollNumber = "ABCD123";

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && /^[a-zA-Z]$/.test(item));
        const lowercaseLetters = alphabets.filter(letter => letter === letter.toLowerCase());

        // Find the highest lowercase letter
        const highestLowercase = lowercaseLetters.length > 0
            ? lowercaseLetters.sort().pop()
            : null;

        // Successful response
        res.json({
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
        });
    } catch (err) {
        // Handle unexpected errors
        console.error(err);
        res.status(500).json({
            is_success: false,
            message: 'Internal server error.'
        });
    }
});

// GET Route for operation code with error handling
app.get('/bfhl', (req, res) => {
    try {
        res.json({ operation_code: 1 });
    } catch (err) {
        // Handle unexpected errors
        console.error(err);
        res.status(500).json({
            is_success: false,
            message: 'Internal server error.'
        });
    }
});

// Catch invalid routes
app.use((req, res) => {
    res.status(404).json({
        is_success: false,
        message: 'Resource not found.'
    });
});

// Set the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});








