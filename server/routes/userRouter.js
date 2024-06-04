const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/create', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).send('用户创建成功！');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update an existing user
router.put('/update', async (req, res) => {
    try {
        const { email, name, password, phoneNumber } = req.body;
        const user = await User.findOneAndUpdate(
            { email },
            { name, password, phoneNumber },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).send('用户不存在！');
        }
        res.status(200).send('修改成功！');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('');
        }
        if (user.password !== password) {
            return res.status(401).send('Invalid password');
        }
        res.status(200).send('Login successful');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Fetch user info by email
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
