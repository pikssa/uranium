const express = require('express');
//const logger = require('../logger/logger')
//const util = require('../util/helper')
//const validater = require('../validater/formatter')
//const validaterr = require('../terminater/arr')
const router = express.Router();

router.get('/test-me', function (req, res) {
   console.log(req.query.batch)
   //logger.log

   //util.printDate()
  // util.printMonth()
   //util.a()
  // validater.trim
//validater.lowercase
   //validater.uppercase

   //validaterr.result
  // validaterr.result1
   res.send('My first ever api!')
});

module.exports = router;
// adding this comment for no reason