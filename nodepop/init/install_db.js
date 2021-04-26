'use strict';

const mongoose = require('mongoose');
const Advertisement = require('../models/Advertisement');

const data = require('./data.json');

//Error event
mongoose.connection.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
})

//Connection event
mongoose.connection.once('open', () => console.log(`Conectado a MongoDB en ${mongoose.connection.name} database`));

//Connection and populate with data
mongoose.connect('mongodb://localhost/nodepoppro', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async function() {
    await Advertisement.deleteMany().then(async function(){
        console.log('Colección Advertisement borrada');
        await Advertisement.insertMany(data.advertisements).then(function() {
            console.log('Colección Advertisement poblada');
            return;
        })
        process.exit(0);
    }).catch(function() {
        console.log('Error al borrar colección Advertisement.');
        process.exit(1); 
    });
}).catch(function() {
    console.log('Error en conexión a Nodepop database');
    process.exit(1);
});

module.exports = mongoose.connection;