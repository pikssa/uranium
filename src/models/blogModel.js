const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required:true
    },
    tags: [String],
    category: {
        type: String,
        required: true
    },
    subCategory: [String],
    publishedAt: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });


module.exports = mongoose.model('Blog', blogSchema)