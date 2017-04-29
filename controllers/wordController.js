var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql')
var words = require('../public/assets/js/words.js');




	router.get("/api/words", function(req, res) {
	  res.json(words);
	});



module.exports = router;