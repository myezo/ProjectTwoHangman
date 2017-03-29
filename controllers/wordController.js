var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql')
var words = require('../public/assets/js/words.js');


module.exports = function(app) {

	app.get("/api/words", function(req, res) {
	  res.render('index');
	});
}