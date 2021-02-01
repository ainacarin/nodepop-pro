'use strict';

const mongoose = require('mongoose');

//Error event
mongoose.connection.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
})

//Connection event
mongoose.connection.once('open', () => console.log('Conectado a MongoDB en', mongoose.connection.name));

mongoose.connect('mongodb://localhost/nodepop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;
