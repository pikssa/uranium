const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const bookController = require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", bookController.createAuthor)

router.post("/getAuthorsData", bookController.getAuthorsData)

router.post("/createBook", bookController.createBook)

router.post("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)
  
router.put("/updateBookprice",bookController.updateBookPrice)

router.put("/updateBookdata",bookController.updateBookData)

router.post("/createPublisher", bookController.createPublisher)
module.exports = router;