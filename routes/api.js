// Dependencies
const route = require('express').Router();
const saveNote = require('../server.js');

// Get route for retrieving notes
route.get("/notes", function (req, res) {
    saveNote
            .getNotes()
            .then(notes => res.json(notes))
            .catch(err => res.status(500).json(err));
});

// Post route for submitting notes
route.post("/notes", (req, res) => {
    saveNote
            .addNote(req.body)
            .then((note) => res.json(note))
            .catch(err => res.status(500).json(err));
});

module.exports.route;