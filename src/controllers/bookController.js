// const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const AuthorModel = require("../models/authorModel")
const PublisherModel = require("../models/publisherModel")
const authorModel = require("../models/authorModel")

//1...............................
//question 3rd..........................
const createBook = async function (req, res) {
    let book = req.body
    let check = await AuthorModel.findOne({ _id: book.author_id })
    let check1 = await PublisherModel.findOne({ _id: book.publisher_id })
    if (book.author_id && book.publisher_id) {
        if (check === null) {
            res.send("author is not persent")
        }
        else if (check1 === null) {
            res.send("publisher is not persent")
        }
        else {
            let bookCreated = await bookModel.create(book)
            res.send({ data: bookCreated })
        }
    }
    else { res.send("detail is required") }
    // res.send({msg:check})
}
//5.........................
const updateBookData = async function (req, res) {
    //let kd = publisher_id.name
    let check1 = await PublisherModel.findOne({name: "HarperCollins"}).select('_id')
    let specificBook = await bookModel.updateMany({publisher_id : check1},{$set:{isHardCover:true}})
    res.send({ data: specificBook })

}

const updateBookPrice= async function(req,res){
    let check = await AuthorModel.find({rating:{$gt:3.5}}).select('_id')
    let bookdata=await bookModel.updateMany({author_id:check},{$inc:{price:10}})
    res.send({data:bookdata})
}

//question 4....................
const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id').populate('publisher_id')
    res.send({ data: specificBook })

}


const getBooksData = async function (req, res) {
    let books = await bookModel.find()
    res.send({ data: books })
}


//2................................................
//question 1st.......................
const createAuthor = async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({ data: authorCreated })
}

const getAuthorsData = async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({ data: authors })
}
//3..................
//question 2..................
const createPublisher = async function (req, res) {
    let publisher1 = req.body
    let publisherCreated = await PublisherModel.create(publisher1)
    res.send({ data: publisherCreated })
}

// module.exports.createAuthor = createAuthor
// module.exports.getAuthorsData = getAuthorsData

// module.exports.createBook = createBook
// module.exports.getBooksData = getBooksData
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails

module.exports ={ createPublisher,updateBookPrice,updateBookData,getBooksWithAuthorDetails,getBooksData,createBook,getAuthorsData,createAuthor} 
