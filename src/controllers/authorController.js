const authorModel = require("../models/authorModel")
const AuthorModel = require("../models/authorModel")

const createAuthor = async function (req, res) {
    let author = req.body
    if (!author.title) { res.status(400).send({ status: false, message: "title is required" }) }

    if (!author.firstName) { res.status(400).send({ status: false, message: "author first name is required" }) }

    if (!author.lastName) { res.status(400).send({ status: false, message: "author last name is required" }) }

    if (!author.email) { res.status(400).send({ status: false, message: "email is required" }) }

    if (!author.password) { res.status(400).send({ status: false, message: "password is required" }) }

    if( authorModel.title.enum.indexOf(author.title)==-1){ res.status(400).send({ status: false, message: "title should be Mr,Miss,Mrs" }) }

    if (typeof author.firstName !== "string") { res.status(400).send({ status: false, message: "author first name must be in string" }) }

    if (typeof author.lastName !== "string") { res.status(400).send({ status: false, message: "author last name must be in string" }) }

    if (typeof author.password !== "string") { res.status(400).send({ status: false, message: "password name must be in string" }) }


    let pattern = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/

    if (!pattern.test(author.email)) { res.status(400).send({ status: false, message: "email is not valid" }) }

    else {
        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({ data: authorCreated })
    }
}




const getAuthorsData = async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({ data: authors })
}

module.exports.createAuthor = createAuthor
module.exports.getAuthorsData = getAuthorsData



