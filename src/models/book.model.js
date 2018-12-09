const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    author: { type: String, required: true },
    bookFileName: { type: String, required: true },
    print: { type: String, default: false }
});

module.exports = mongoose.model('Book', BookSchema);