'use strict';

const mongoose = require('mongoose');
const Advertisement = require('../models/Advertisement');
const Tag = require('../models/Tag');

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
}).then(async function() {
    await Advertisement.deleteMany().then(function(){
        console.log('Colección Advertisement borrada');
/*         process.exit(0); */
        return;
    }).catch(function() {
        console.log('Error al borrar colección Advertisement');
/*         process.exit(1); */
        return;
    });

    await Tag.deleteMany().then(function(){
        console.log('Colección Tag borrada');
        process.exit(0);
    }).catch(function() {
        console.log('Error al borrar colección Tag');
        process.exit(1);
    });
/*     return; */
}).catch(function() {
    console.log('Error en conexión a Nodepop');
/*     return; */
    process.exit(1);
});



module.exports = mongoose.connection;