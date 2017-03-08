var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(methodOverride('_method'));

var port = 3000;
app.listen(port);

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Mastermind315',
	database: 'hangman_db'
});


// Serve static content for the app from the "public" directory in the application directory.

var path = require("path");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/app/public"));


app.get("/", function(req, res) {
  console.log('home');
  //res.send('home');
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/game", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/game.html"));
});


app.post("/create", function(req,res){
	console.log(req.body.name)
	connection.query('INSERT INTO gameusers (name) VALUES (?);', [req.body.name], function(err,result){
		if(err) throw err;
		res.redirect("/game");
	})
})

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.text({ type: 'text/html' }))





connection.connect(function(err){
	if(err) throw err;
	console.log('Connected as id: ' + connection.threadId);
})