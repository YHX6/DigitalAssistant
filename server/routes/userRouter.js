const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/create', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await User.create({ email, password });
        res.status(201).send('用户创建成功！');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update an existing user
// router.put('/update', async (req, res) => {
//     try {
//         const { email, name, phoneNumber } = req.body;
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(404).send('用户不存在！');
//         }
//         user.name = name;
//         user.password = password;
//         user.phoneNumber = phoneNumber;
//         await user.save();
//         res.status(200).send('修改成功！');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });
// Update an existing user
router.put('/update', async (req, res) => {
    try {
        const { email, name, phoneNumber } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send('用户不存在！');
        }
        if (name !== undefined) user.name = name;
        // if (password !== undefined) user.password = password;
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
        console.log(user);
        await user.save();
        res.status(200).send('修改成功！');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send('用户不存在！');
        }
        if (user.password !== password) {
            return res.status(401).send('密码错误！');
        }
        res.status(200).send('登录成功！');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Fetch user info by email
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.params.email } });
        if (!user) {
            return res.status(404).send('用户不存在！');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

