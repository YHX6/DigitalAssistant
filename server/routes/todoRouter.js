const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const User = require('../models/user');

// Create a new todo
router.post('/create', async (req, res) => {
    try {
        const { email, content } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send('用户信息不存在！');
        }
        const newTodo = await Todo.create({ email, content });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Read all todos for a user
router.get('/:email', async (req, res) => {
    try {
        const todos = await Todo.findAll({ where: { email: req.params.email } });
        if (todos.length === 0) {
            return res.status(404).send('无待办事项存在！');
        }
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a todo by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { content } = req.body;
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).send('待办事项不存在！');
        }
        todo.content = content;
        await todo.save();
        res.status(200).send('修改成功！');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a todo by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).send('待办事项不存在！');
        }
        await todo.destroy();
        res.status(200).send('删除成功！');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
