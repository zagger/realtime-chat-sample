
var express = require('express');
var router = express.Router();

router.get('/chat/:room_name/:member_name', function(req, res) {
  res.render('chat', {
		title: req.params.room_name,
		member_name: req.params.member_name,
		room_kind: 'private'
	});
});

router.get('/chat/:room_name', function(req, res) {
  res.render('chat', {
		title: req.params.room_name,
		room_kind: 'private'
	});
});

router.get('/chat', function(req, res) {
  res.render('chat', { 
		title: 'Public Chatting Room',
		member_name: 'guest',
		room_kind: 'public'
	});
});

module.exports = router;
