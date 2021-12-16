var express = require('express');
var moment = require('moment'); 
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const time = new Date().getTime().toString();
  const momentTime = moment().add(2, 'hours').valueOf()
  console.log(time)
  console.log(momentTime)
});

module.exports = router;
