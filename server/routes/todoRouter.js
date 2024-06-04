const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const User = require('../models/user');  // Assuming user model is in the same folder


router.post('/create', async (req, res) => {
    try {
        const { email, content } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const newTodo = new Todo({ email, content });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.get('/:email', async (req, res) => {
    try {
        console.log("asdsaa")
        const todos = await Todo.find({ email: req.params.email });
        if (todos.length === 0) {
            return res.status(404).send('No to-do tasks found for this user');
        }
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const { content } = req.body;
        const todo = await Todo.findByIdAndUpdate(req.params.id, { content }, { new: true, runValidators: true });
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.status(200).send('Todo updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.status(200).send('Todo deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
