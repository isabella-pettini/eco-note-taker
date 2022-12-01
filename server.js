// Dependencies 
const fs = require('fs');
const api = require('./routes/api.js');
const html = require('./routes/html.js');
const express = require('express');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON & urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/', html);

app.use(express.static('public'));


app.listen(PORT, () => 
    console.log(`APP Listening at http://localhost:${PORT}`)
);

