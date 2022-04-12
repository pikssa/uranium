const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    bookName: {
        type: String,
        unique: true,
        required: true},
    authorName: String,
    catogary: String,
    year: Number,
   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users



// String, Number
// Boolean, Object/json, array