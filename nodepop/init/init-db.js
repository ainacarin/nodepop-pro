'user strict';

const mongoose = require('mongoose');
const Advertisement = require('../models/Advertisement');
const User = require('../models/User');

const data = require('./data.json');

async function initUsers () {

    const { deletedCount } = await User.deleteMany();
    console.log(`Deleted ${deletedCount} user${deletedCount > 1 ? 's' : ''}`);

    // cargo usuarios
    const result = await User.insertMany([

        {
            email: 'admin@example.com',
            // password: '1234'
            password: await User.hashPassword('1234')
        }

    ]);
    console.log(`Inserted: ${result.length} user${result.length > 1 ? 's' : ''}`);
};


async function initAdvertisements () {

    const { deletedCount } = await Advertisement.deleteMany();
    console.log(`Deleted ${deletedCount} advertisements`);

    // cargo usuarios
    const result = await Advertisement.insertMany(data.advertisements);
    console.log(`Inserted: ${result.length} advertisement${result.length > 1 ? 's' : ''}`);
};

async function main() {
    
    try {
        await initUsers();
        await initAdvertisements();
        mongoose.connection.close();
    } catch (error) {
        throw new Error('Error to init db');
    }
    
};

// // al ser db, uso promesas
// main().catch(error => console.log(error
// ));

//Error event
mongoose.connection.on('error', err => {
    console.log('Connection error', err);
    process.exit(1);
})

//Connection event
mongoose.connection.once('open', () => console.log(`Connected: MongoDB ${mongoose.connection.name} database`));

//Connection and populate with data
mongoose.connect('mongodb://localhost/nodepoppro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(main().catch(error => console.log(error)))
.catch(function() {
    console.log('Connection error Nodepop database');
    process.exit(1);
});