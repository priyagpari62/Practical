const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

dotenv.config();

async function startTaskManager(port = 5000, mongoURI = process.env.MONGO_URI) {
    const app = express();

    // Middleware
    app.use(express.json());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/tasks', taskRoutes);

    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(port, () => {
        console.log(`Task Manager API running on port ${port}`);
    });

    return app;
}

module.exports = startTaskManager;
