const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');
require('dotenv').config();
const path = require('path');

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "client", "dist")));

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Failed to connect to MongoDB');
        console.log(err);
    }
}

connectToDb();

app.use('/api/auth', require('./routes/authRouter.js'));

// Applying the express-jwt middleware to protect the '/api/main' routes
app.use('/api/main', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));

// Workout routes - only accessible if authenticated
app.use('/api/main/workout', require('./routes/workoutRouter.js'));

// Error handling middleware - handling specific error status codes
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ errMsg: 'Invalid token' });
    } else {
        console.error(err);
        res.status(err.status || 500).send({ errMsg: err.message });
    }
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client", "dist", "index.html")));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
