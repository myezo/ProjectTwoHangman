var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql')
var connection = require('../config/connection.js')

//ONE IS GET
	//get all the scores

//ONE IS POST
	//insert a score

router.get('/', function(req,res) {
	if (req.session.logged_in){
		var query = "SELECT * FROM scores ORDER BY total_score DESC"

		connection.query(query, function(err, scores) {
			res.render('scores/index', {
				scores: scores,
				logged_in: req.session.logged_in,
				user_email: req.session.user_email,
				user_id: req.session.user_id,
				username: req.session.username
			});

		});
	}else{
		res.redirect('/users/sign-in');
	}

});

router.get('/hangman', function(req,res) {
	if (req.session.logged_in){
		var query = "SELECT * FROM scores ORDER BY total_score DESC"

		connection.query(query, function(err, scores) {
			res.render('scores/hangman', {
				scores: scores,
				logged_in: req.session.logged_in,
				user_email: req.session.user_email,
				user_id: req.session.user_id,
				username: req.session.username
			});

		});
	}else{
		res.redirect('/users/sign-in');
	}
	
});

router.get('/quiz', function(req,res) {
	if (req.session.logged_in){
		var query = "SELECT * FROM scores ORDER BY total_score DESC"

		connection.query(query, function(err, scores) {
			res.render('scores/quiz', {
				scores: scores,
				logged_in: req.session.logged_in,
				user_email: req.session.user_email,
				user_id: req.session.user_id,
				username: req.session.username
			});

		});
	}else{
		res.redirect('/users/sign-in');
	}

	
});


router.post('/create', function(req,res) {
	var query = "INSERT INTO scores (total_score, user_id) VALUES (?, ?)";

	connection.query(query, [req.body.total_score, req.session.user_id], function(err, coupons) {
		res.send('200');
	});
});

module.exports = router;
