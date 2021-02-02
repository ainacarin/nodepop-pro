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

advertisementSchema.statics.list= function(data) {

    const filter = {};
    const limit = parseInt(data.limit);
    const skip = parseInt(data.skip);
    const fields = {};
    const sort = data.sort;

    const query = Advertisement.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);

    //ejecuta query
    return query.exec(); //devuelve una promesa
};

//Model
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;

