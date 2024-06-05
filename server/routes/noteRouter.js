const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const User = require('../models/user');

// Create a new note
router.post('/create', async (req, res) => {
    try {
        const { email, content } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send('用户信息不存在！');
        }
        const newNote = await Note.create({ email, content });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Read all notes for a user
router.get('/:email', async (req, res) => {
    try {
        const notes = await Note.findAll({ where: { email: req.params.email } });
        if (notes.length === 0) {
            return res.status(404).send('无笔记存在！');
        }
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a note by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { content } = req.body;
        const note = await Note.findByPk(req.params.id);
        if (!note) {
            return res.status(404).send('笔记未找到！');
        }
        note.content = content;
        await note.save();
        res.status(200).send('修改成功！');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a note by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (!note) {
            return res.status(404).send('笔记未找到！');
        }
        await note.destroy();
        res.status(200).send('删除成功！');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
