const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")



router.post("/createAuthor", authorController.createAuthor)

router.post("/createBlog", blogController.createBlog)

router.put("/blogs/:blogId", blogController.BlogById)

router.get("/blogs", blogController.Bloglist)

router.delete("/blog", blogController.updateBlogData)

router.delete("/blog", blogController.deleteBlogData)

module.exports = router;