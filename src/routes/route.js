const express = require('express');

const router = express.Router();

// router.get('/test-me', function (req, res) {
//     // let a = { msg: "My first ever API response in JSON !!"} 


//     res.send({ msg: "My first ever API response in JSON !!" })
// });



// router.get('/test-api1', function (req, res) {

//     res.send("hi FunctionUp ")
// });


// router.get('/test-api2', function (req, res) {

//     res.send({ msg: "Hi FUnctionUp..again !" })
// });


// router.get('/test-api3', function (req, res) {

//     res.send({ msg: "Hi FUnctionUp..again..this is another similar api !" })
// });


// router.get('/test-api4', function (req, res) {

//     res.send({ msg: "Hi FUnctionUp..again..this is another similar api ..not I am getting bored!" })
// });


// router.get('/test-api5', function (req, res) {

//     res.send({ msg: "Hi FUnctionUp", name: "FunctionUp", age: "100" })
// });



// router.get('/test-api6', function (req, res) {

//     res.send({ data: [12, 24, 36, 48, 60] })
// });

// router.post('/test-post1', function (req, res) {

//     res.send({ msg: "hi guys" })
// });


// to send data in  post request-> prefer sending in BODY -> click body-raw-json

    let obj = [
          {
            "name": "manish",
            "dob": "1/1/1995",
            "gender": "male",
            "city": "jalandhar",
            "sports": [
                "swimming"
            ]
        },
        {
            "name": "gopal",
            "dob": "1/09/1995",
            "gender": "male",
            "city": "delhi",
            "sports": [
                "soccer"
            ],
        },
        {
            "name": "lokesh",
            "dob": "1/1/1990",
            "gender": "male",
            "city": "mumbai",
            "sports": [
                "soccer"
            ],
        },
    ]

    router.post('/test-post2', function (req, res) {
   let data = req.body
    console.log(data)
    obj.map((x)=>{
        if (x.name==data.name){
            return res.send("player already exit")

        }})
        obj.push(data)

        res.send({ msg: "hi guys..my 2nd post req" , newPlayer : obj })
});


// const randomController = require("../controllers/randomController.js")
// //write a post request to accept an element in post request body and add it to the given array and return the new array
// router.post('/test-post3', randomController.addToArray); //HANDLER/CONTROLLER



module.exports = router;
