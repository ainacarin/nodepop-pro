'use strict';

const mongoose = require('mongoose');

//Schema
const tagSchema = mongoose.Schema({
    name: { type: String, index: true }
}, {
    collection: 'tags'
});

//Model
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;