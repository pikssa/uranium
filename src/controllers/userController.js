const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
//1.............
const createUser = async function (abc, xyz) {

  try {
    let data = abc.body;
    let savedData = await userMode.create(data);
    
    xyz.status(201).send({ msg: savedData });
  }
  catch (err) {xyz.status(500).send({ msg: "error", error: err.message })}
};

//2..........
const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.status(400).send({
        status: false,
        msg: "username or the password is not corerct",
      });
let token = jwt.sign(
      {
        userId: user._id.toString(),
        name: user.firstName
      },
      "Pushpa"
    );
  
    res.status(200).send({ status: true, data: token });
  } catch (err) { res.status(500).send({ msg: "error", error: err.message }) }
};



//3........................
const getUserData = async function (req, res) {
try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails) { return res.status(400).send({ status: false, msg: "No such user exists" }) }

    res.status(200).send({ status: true, data: userDetails });
  } catch (err) { res.status(500).send({ msg: "error", error: err.message }) }
};


//4...........................
const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.status(200).send({ status: userData, data: updatedUser });
  } catch (err) { res.status(500).send({ msg: "error", error: err.message }) }
};

//5.............
const deletUser = async function (req, res) {

  try {let userId = req.params.userId;
    let deleteUs = await userModel.findOneAndUpdate(userId, { $set: { isDeleted: true } })
    res.status(200).send({ status: true, deleteAccount: deleteUs })
  } catch (err) { res.status(500).send({ msg: "error", error: err.message }) }
}




const postMessage = async function (req, res) {
   try {
    let message = req.body.message
    let userId = req.params.userId;
    let user = await userModel.findOne( {_id:userId});
    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })

    //return the updated user document
    return res.status(200).send({ status: true, data: updatedUser })
  } catch (err) { res.status(500).send({ msg: "error", error: err.message }) }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deletUser = deletUser;
module.exports.postMessage = postMessage;



   // Once the login is successful, create the jwt token with sign function
    // Sign function has 2 inputs:
    // Input 1 is the payload or the object containing data to be set in token
    // The decision about what data to put in token depends on the business requirement
    // Input 2 is the secret
    // The same secret will be used to decode tokens
      // Check if the token is present
    // Check if the token present is a valid token
    // Return a different error message in both these cases
    // let token = req.headers["x-auth-token"]
    // if(!token) return res.send({status: false, msg: "token must be present in the request header"})
  
    // if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    //userId for which the request is made. In this case message to be posted.
    //userId for the logged-in user
    //userId comparision to check if the logged-in user is requesting for their own data
    // let user = await userModel.findById(req.params.userId)
    // if(!user) return res.send({status: false, msg: 'No such user exists'})
      // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases

  // let userId = req.params.userId;
  // let user = await userModel.findById(userId);
  // //Return an error if no user with the given id exists in the db
  // if (!user) {
  //   return res.send("No such user exists");
  // }
    // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
    //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response