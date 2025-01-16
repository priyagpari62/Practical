const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create a Task
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, assignedTo } = req.body;
        const assignedUser = await User.findById(assignedTo);
        if (!assignedUser) return res.status(404).json({ error: 'Assigned user not found' });

        const task = new Task({
            title,
            description,
            assignedTo,
            assignedBy: req.user.id,
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Tasks Assigned to a User
router.get('/assigned-to-me', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id }).populate('assignedBy', 'username email');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
