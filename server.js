const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const app = express();

dotenv.config();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
