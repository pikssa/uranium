const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMw = require("../middleware/commonMw")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",commonMw.mid1,commonMw.mid2, userController.getUserData)

router.put("/users/:userId", commonMw.mid2,commonMw.mid3,userController.updateUser)

router.delete("/users/:userId",commonMw.mid1, commonMw.mid2,commonMw.mid3,userController.deletUser)

router.post("/postMessage",commonMw.mid1, commonMw.mid2,commonMw.mid3, userController.postMessage)

module.exports = router;