'use strict';

const mongoose = require('mongoose');

//Schema
const advertisementSchema = mongoose.Schema({
    name: { type: String, index: true },
    sale: { type: Boolean, index: true },
    price: { type: Number, index: true },
    image: String,
    tags: [String]
}, {
    collection: 'advertisements'
});

//Model
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;

