const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    bookName: {
        type: String,
        require: true
    },
    authorName: String,
    tags: [String],
    totalPages: Number,
    stockAvailable: Boolean,
    year: { type: Number, default: 2021 },

    prices: {
        INR: String,
        europePrice: String,
    },

}, { timestamps: true });



//     firstName: String,
//     lastName: String,
//     mobile: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     emailId: String,
//     gender: {
//         type: String,
//         enum: ["male", "female", "LGBTQ"] //"falana" will give an error
//     },
//     age: Number,
//     // isIndian: Boolean,
//     // parentsInfo: {
//     //     motherName: String,
//     //     fatherName: String,
//     //     siblingName: String
//     // },
//     // cars: [ String  ]
// }, { timestamps: true });
  //{   $or : {"totalPages":{ $gt: 200},"stockAvailable": true}}
    //{  "prices.INR" :{ $in: ["200","150", 82]}}
        //{$or: [ {authorName : "Ruskin Bond" } , {  "year": 2021 }] }
    //.select({"bookName":1,"authorName":1,_id: 0})
   // {  "year": 2021 }

module.exports = mongoose.model('User', userSchema) //users



// String, Number
// Boolean, Object/json, array