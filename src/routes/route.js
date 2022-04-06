const express = require('express');
const logger =require('../logger/logger')
const router = express.Router();

router.get('/test-me', function (req, res) {
   console.log ('i m inside the first route handler')
   console.log('the endpoint value is',logger.logging)
   console.log('calling log function')
   logger.logging()
   res.send('My first ever api!')
});

module.exports = router;
// adding this comment for no reason