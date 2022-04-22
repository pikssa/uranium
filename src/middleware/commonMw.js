const jwt = require("jsonwebtoken");


const mid1= function(req,res,next){
    let token = req.headers["x-Auth-token"];
    if (!token) {token = req.headers["x-auth-token"]}
  
    //If no token is present in the request header return error
    if (!token) {return res.send({ status: false, msg: "token must be present" })}
  
    console.log(token);
    let decodedToken = jwt.verify(token, "Pushpa");
  if (!decodedToken)
    {return res.send({ status: false, msg: "token is invalid" })}
    next()
}


const mid2= function(req,res,next){
let value = req.headers["x-auth-token"]
    if (value !== undefined) {
        next()
    }
    else { res.send("header is not persent") }
}
const mid3= function(req,res,next){
    let userId = req.params.userId;
    let decodedToken = jwt.verify(token, "Pushpa")
    let userLoggedIn = decodedToken.userId
    if ( userId != userLoggedIn){ return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })}
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.send("No such user exists");
    }
    next()
    }


module.exports.mid1=mid1
module.exports.mid2=mid2
module.exports.mid3=mid3