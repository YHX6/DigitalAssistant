const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const User = require('../models/user');  // Assuming user model is in the same folder

// Create a new note
router.post('/create', async (req, res) => {
    try {
        const { email, content } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const newNote = new Note({ email, content });
        await newNote.save();
        // res.status(201).send('Note created successfully');
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Read all notes for a user
router.get('/:email', async (req, res) => {
    try {
        const notes = await Note.find({ email: req.params.email });
        if (notes.length === 0) {
            return res.status(404).send('No notes found for this user');
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
        const note = await Note.findByIdAndUpdate(req.params.id, { content }, { new: true, runValidators: true });
        if (!note) {
            return res.status(404).send('Note not found');
        }
        res.status(200).send('Note updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a note by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }
        res.status(200).send('Note deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
