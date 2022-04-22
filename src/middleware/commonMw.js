const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel")

const mid1 = function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "Pushpa");
  } catch (err) { res.status(401).send({ msg: "invalid token", error: err.message }) }
  //return res.send({ status: false, msg: "token is invalid" })
  next()
}




const mid3 = async function (req, res, next) {
try{
    let userId = req.params.userId;
  let user = await userModel.findById(userId); 
  if (!user) {
    return res.status(400).send("No such user exists");
  }
  next()
 }
  catch(err){res.status(500).send({msg:"error",error:err.message})}
}

const mid4 = function (req, res, next) {
 try{ let userId = req.params.userId;
  let token = req.headers["x-auth-token"];
  let decodedToken = jwt.verify(token, "Pushpa")
  let userLoggedIn = decodedToken.userId
  if (userId != userLoggedIn) { return res.status(401).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' }) }
  next()}catch(err){res.status(500).send({msg:"error",error:err.message})}
}



module.exports.mid1 = mid1

module.exports.mid3 = mid3
module.exports.mid4 = mid4