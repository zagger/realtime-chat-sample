

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/private', function(req, res, next) {
  res.render('enter', { title: 'Enter Private Room' });
});

module.exports = router;
