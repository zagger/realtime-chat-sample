
var express = require('express');
var router = express.Router();
router.get('/socket/:id', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  res.render('socket', { title: 'Socket Test ' + req.params.id });
});

router.get('/socket', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.render('socket', { title: 'Socket Test ' });
});

module.exports = router;
