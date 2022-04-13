const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find({   $or :[ {"TotalPages":{ $gt: 200   },"stockAvailable":true}]})
  //{  "prices.INR" :{ $in: ["200","150", 82]}}
        //{$or: [ {authorName : "Ruskin Bond" } , {  "year": 2021 }] }
    //.select({"bookName":1,"authorName":1,_id: 0})
   // {  "year": 2021 })
    res.send({msg: allUsers})

}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData