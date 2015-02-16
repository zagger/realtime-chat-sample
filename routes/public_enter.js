
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/public_enter', function(req, res, next) {
  res.render('public_enter', { title: 'Enter Public Room' });
});

module.exports = router;
