const blogModel= require("../models/blogModel")
const authorModel= require("../models/authorModel")



const createBlog= async function (req, res) {
    let blogData = req.body
    let Id=blogData.author_Id
    let blog = await authorModel.findOne({_id:Id})
    console.log(blog)
    if(blog==null){{res.status(400).send({status:false,message: "author is not persent"})}}
    let blogCreated = await blogModel.create(blogData)
    res.status(201).send({data: blogCreated})
}





const Bloglist=async function(req,res){
    
    let id=req.query.author_Id
    let category=req.query.category
    let tag=req.query.tags
    let sub=req.query.subCategory
    let list=await blogModel.findOne({isDeleted:false,isPublished:false,author_Id:id,category:category,tags:tag,subCategory:sub})
    console.log(list)
    if(list==null){
        res.status(404).send({status:false,msg:"blogs not found"})
     }
    else{res.status(200).send({status:true,data:list})}
}


const BlogById=async function(req,res){
    
    let id=req.params.blogId
   
    let data=req.body
    let publishDate=data.publishedAt
    let tag=data.tags
    let sub=data.subCategory
    let list=await blogModel.findOneAndUpdate({_id:id,isDeleted:false},{$set:{isPublished:true,tags:tag,subCategory:sub,publishedAt:publishDate}},{new:true,upsert:true})
    console.log(list)
    if(list==null){
        res.status(404).send({status:false,msg:"blog not found"})
     }
    else{res.status(200).send({status:true,data:list})}
}



module.exports.createBlog= createBlog

module.exports.Bloglist= Bloglist