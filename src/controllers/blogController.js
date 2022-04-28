const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")

const moment = require('moment');

const valid = function (value) {
    if (typeof value !== "string" || value.trim().length == 0
    ) { return false }
    return true
}

const createBlog = async function (req, res) {
    try {
        let blogData = req.body

        if (!blogData.title) { return res.status(400).send({ status: false, message: "title is required" }) }

        if (!blogData.body) { return res.status(400).send({ status: false, message: "body is required" }) }

        if (!blogData.author_Id) { return res.status(400).send({ status: false, message: "authorid is required" }) }

        if (!blogData.category) { return res.status(400).send({ status: false, message: "category is required" }) }


        if (!valid(blogData.title)) { return res.status(400).send({ status: false, message: "title is not valid" }) }

        if (!valid(blogData.body)) { return res.status(400).send({ status: false, message: "body is not valid" }) }

        if (!valid(blogData.category)) { return res.status(400).send({ status: false, message: "category is not valid" }) }

        let sub = blogData.subCategory

        for (let i = 0; i < sub.length; i++) { if (!valid(sub[i])) { return res.status(400).send({ status: false, message: "subCategory is not valid" }) } }

        let tag = blogData.tags

        for (let i = 0; i < tag.length; i++) { if (!valid(tag[i])) { return res.status(400).send({ status: false, message: "tags is not valid" }) } }

        if (typeof blogData.isPublished !== "boolean") { return res.status(400).send({ status: false, message: "value must be in boolean" }) }
        let Id = blogData.author_Id

        let pattern = /^[0-9A-Fa-f]{24}$/

        if (!pattern.test(Id)) { return res.status(400).send({ status: false, message: "author_Id is not valid" }) }

        let blog = await authorModel.findOne({ _id: Id })

        if (blog == null) { { return res.status(400).send({ status: false, message: "author is not persent" }) } }

        req.body.publishedAt = req.body.isPublished ? moment().format('DD-MM-YYYY') : null
        let blogCreated = await blogModel.create(blogData)
        res.status(201).send({status:true, data: blogCreated })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }



}





const Bloglist = async function (req, res) {

    try {
        let id = req.query.author_Id
        let category = req.query.category
        let tag = req.query.tags
        let sub = req.query.subCategory
        let list = await blogModel.find({ isDeleted: false, isPublished: true })
        if (!list.length) { res.status(404).send({ status: false, msg: "blogs not found" }) }
      
         
            let bloglist = await blogModel.find({isDeleted: false, isPublished: true ,$or: [{ author_Id: id }, { category: category }, { tags: tag }, { subCategory: sub }] })
            if (!bloglist.length) {
                res.status(404).send({ status: false, msg: "blogs not found" })
            }

            else { res.status(200).send({ status: true, data: bloglist }) }
        
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

}


const BlogById = async function (req, res) {

    try {
        let id = req.params.blogId
        let pattern = /^[0-9A-Fa-f]{24}$/

        if (!pattern.test(id)) { res.status(400).send({ status: false, message: "blogId is not valid" }) }
        let data = req.body
        let titl = data.title
        let bdy = data.body
        let tag = data.tags
        let sub = data.subCategory
        if (!valid(titl) || !valid(bdy)) { return res.status(400).send({ status: false, message: "invalid value" }) }
        for (let i = 0; i < sub.length; i++) { if (!valid(sub[i])) { return res.status(400).send({ status: false, message: "invalid value" }) } }

        for (let i = 0; i < tag.length; i++) { if (!valid(tag[i])) { return res.status(400).send({ status: false, message: "invalid value" }) } }

        let list1 = await blogModel.findOne({ _id: id, isDeleted: false })
        if (list1 == null) { return res.status(404).send({ status: false, msg: "blog not found" }) }

        let list = await blogModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $push: { tags: tag, subCategory: sub }, title: titl, body: bdy, publishedAt: new Date(), isPublished: true }, { new: true, upsert: true })

        if (list == null) {
            res.status(404).send({ status: false, msg: "blog not found" })
        }
        else { res.status(200).send({ status: true, data: list }) }
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}

const deleteUserData = async function (req, res) {

    try {
        let blogId = req.params.blogId;
        let pattern = /^[0-9A-Fa-f]{24}$/

        if (!pattern.test(blogId)) { res.status(400).send({ status: false, message: "blogId is not valid" }) }
        let blog = await blogModel.findById(blogId)

        if (!blog) {
            return res.status(400).send({ msg: 'no such blog exists' });
        }

        let deleteUser = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true })
        res.status(200).send({ status: true, data: deleteUser })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

}

const updateBlogData = async function (req, res) {
    try {
        let userData = req.query;
        let category = req.query.category
        let tag = req.query.tags
        let sub = req.query.subCategory
        let pattern = /^[0-9A-Fa-f]{24}$/

        if (!pattern.test(Id)) { return res.status(400).send({ status: false, message: "author_Id is not valid" }) }

        if (!valid(category)) { return res.status(400).send({ status: false, message: "invalid value" }) }

        for (let i = 0; i < sub.length; i++) { if (!valid(sub[i])) { return res.status(400).send({ status: false, message: "invalid value" }) } }

        for (let i = 0; i < tag.length; i++) { if (!valid(tag[i])) { return res.status(400).send({ status: false, message: "invalid value" }) } }

        let deletedBlog = await blogModel.findOneAndUpdate(userData, { isDeleted: true }, { new: true });
        if (deletedBlog == null) { res.status(404).send({ status: false, msg: "blog not found" }) }
        res.status(200).send({ status: true, data: deletedBlog })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

};


module.exports.createBlog = createBlog

module.exports.Bloglist = Bloglist

module.exports.BlogById = BlogById

module.exports.updateBlogData = updateBlogData


module.exports.deleteUserData = deleteUserData