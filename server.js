// Dependencies 
const express = require('express');
const fs = require('fs');
const api = require('./routes/api');
const html = require('./routes/html');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

// PORT
const PORT = process.env.PORT || 3001;
// Express server
const app = express();

// Middleware for parsing JSON & urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/', html);

app.use(express.static('public'));

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

    read() {
        return readNote('db/db.json', 'utf8');
    }

    retrieveNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Please enter a Title or Text.');
        }
        
        const newNote = { title, text, id: uuidv4() };

        return this.retrieveNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }
};

app.listen(PORT, () => 
    console.log(`APP Listening at http://localhost:${PORT}`)
);

module.exports = new Save()