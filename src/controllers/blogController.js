const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")



const createBlog = async function (req, res) {
    let blogData = req.body
    let Id = blogData.author_Id
    let blog = await authorModel.findOne({ _id: Id })
    console.log(blog)
    if (blog == null) { { res.status(400).send({ status: false, message: "author is not persent" }) } }
    let blogCreated = await blogModel.create(blogData)
    res.status(201).send({ data: blogCreated })
}





const Bloglist = async function (req, res) {

    let id = req.query.author_Id
    let category = req.query.category
    let tag = req.query.tags
    let sub = req.query.subCategory
    let list = await blogModel.find({ isDeleted: false, isPublished: true })
    if (!list.length) { res.status(404).send({ status: false, msg: "blogs not found" }) }


    else {
        let bloglist = await blogModel.find({ $or: [{ author_Id: id }, { category: category }, { tags: tag }, { subCategory: sub }] })
        if (!bloglist.length) {
            res.status(404).send({ status: false, msg: "blogs not found" })
        }

        else { res.status(200).send({ status: true, data: list }) }
    }

}


const BlogById = async function (req, res) {

    let id = req.params.blogId

    let data = req.body
   
    let tag = data.tags
    let sub = data.subCategory
    let list1 = await blogModel.findOne({ _id: id, isDeleted: false })
    if(list1==null){ res.status(404).send({ status: false, msg: "blog not found" })}
     let a=list1.tags.push(tag)
     let b=list1.subCategory.push(sub)
    let list = await blogModel.findOneAndUpdate({ _id: id, isDeleted: false },{ $push: {tags:tag, subCategory: sub}, publishedAt: Date.now(),isPublished: true  }, { new: true, upsert: true })
    console.log(list)
    if (list == null) {
        res.status(404).send({ status: false, msg: "blog not found" })
    }
    else { res.status(200).send({ status: true, data: list }) }
}

const deleteUserData = async function(req, res){
    
      let userId = req.params.userId;
      let user = await blogModel.findById(userId)
  
      if(!user) {
        return res.status(400).send({msg: 'no such user exists'});
      }
  
      let deleteUser = await blogModel.findOneAndUpdate({_id: userId}, {isDeleted: true}, {new: true})
      res.status(200).send({ status:true, data: deleteUser})
   
  }

  const updateBlogData = async function (req, res) {
      let userData = req.query;
      let deletedBlog = await blogModel.findOneAndUpdate(userData,{isDeleted:true}, {new:true});
      if(deletedBlog==null){res.status(404).send({ status: false, msg: "blog not found" })}
      res.status(200).send({ status: true, data: deletedBlog });
  
    };


module.exports.createBlog = createBlog

module.exports.Bloglist = Bloglist

module.exports.BlogById = BlogById

module.exports.updateBlogData = updateBlogData


module.exports.deleteUserData = deleteUserData