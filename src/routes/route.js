const express = require('express');
const router = express.Router();

const batchController= require("../controllers/batchController")
const developerController= require("../controllers/developerController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBatch", batchController.createBatch  )

router.get("/scholarship-developers", developerController.getDeveloperData)

router.post("/createDeveloper",developerController.createDeveloper )

// router.get("/getBooksData", bookController.getBooksData)

router.get("/getDeveloperWithBatchDetails", developerController.getDeveloperWithBatchDetails)

module.exports = router;