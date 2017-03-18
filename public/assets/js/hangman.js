var wordOptions = ["super bowl", "fight club", "dinner party", "tostitos", "jiu jitsu", "march madness", "bootstrap"];
var selectedWord = "";
var correctLetters = [];
var allLetters = [];
var wrongLetters = [];
var lineArr = [];
var correctLetterCount = 0;
var numBlanks = 0;
var score = 0;
var key;
var incorrect = 0;
var finalScore = 0;



function drawGame(){
	selectedWord = wordOptions[Math.floor(Math.random()*wordOptions.length)];
	selectedWord = selectedWord.toUpperCase();
	console.log(selectedWord);
	$('#display_score').html("Score: " + score);


	for(var i = 0; i < selectedWord.length; i++){
		if (selectedWord[i] == " "){
			correctLetters.push(" ");
			lineArr.push("&nbsp;&nbsp;&nbsp;");
		}else{
			lineArr.push(" _ ");
		}
	}
	$('#display_lines').html(lineArr);
}


function checkWord(){
	var drawThis = "";
	correctLetterCount = 0;
	
	for(var i = 0; i < selectedWord.length; i++){

		if(selectedWord[i] == " "){
			drawThis += "&nbsp;&nbsp;&nbsp;";
			correctLetterCount++;
		}else if(correctLetters.indexOf(selectedWord[i]) >= 0){
			drawThis += selectedWord[i];
			correctLetterCount++;
		}else{
			drawThis += " _ ";

		}
	}
	$('#display_lines').html(drawThis);
	if(correctLetterCount == selectedWord.length){
		$('#win_loss').append("You Won!!");
		finalScore = score;
		$.post( "/scores/create", { total_score: finalScore }, function( data ) {
		  console.log(data);
		});
	}else if(incorrect == 8){
		finalScore = score;
		$.post( "/scores/create", { total_score: finalScore }, function( data ) {
		  console.log(data);
		});
	}
}



function drawPole(){
	var ctx = document.getElementById('my_canvas').getContext('2d');
	ctx.fillRect(50, 50, 40, 450);
}	

function drawShelf(){
	var ctx = document.getElementById('my_canvas').getContext('2d');
	ctx.fillRect(50, 50, 400, 30);
}	

function drawHead(){
	var ctx = document.getElementById('my_canvas').getContext('2d');
	ctx.beginPath();
	ctx.arc(400,125,40,0,2*Math.PI);
	ctx.lineWidth = 7;
	ctx.stroke();
}

function drawBody(){
	var ctx = document.getElementById('my_canvas').getContext('2d');
	ctx.fillRect(395,162,12,130);
}

function drawRightArm(){
	var ctx = document.getElementById('my_canvas').getContext('2d');
	ctx.beginPath();
	ctx.moveTo(397,200);
	ctx.lineTo(270,140);
	ctx.stroke();
}

function drawLeftArm(){
	var ctx = document.getElementById('my_canvas').getContext('2d');
	ctx.beginPath();
	ctx.moveTo(400,203);
	ctx.lineTo(540,140);
	ctx.stroke();
}

function drawLeftLeg(){
	var ctx = document.getElementById('my_canvas').getContext('2d');
	ctx.beginPath();
	ctx.moveTo(400,290);
	ctx.lineTo(490,380);
	ctx.stroke();
}

function drawRightLeg(){
	var ctx = document.getElementById('my_canvas').getContext('2d');
	ctx.beginPath();
	ctx.moveTo(400,290);
	ctx.lineTo(300,380);
	ctx.stroke();
}



function drawHangman(){
	if(incorrect == 1){
		drawPole();
	}else if(incorrect == 2){
		drawShelf();
	}else if(incorrect == 3){
		drawHead();
	}else if(incorrect == 4){
		drawBody();
	}else if(incorrect == 5){
		drawRightArm();
	}else if(incorrect == 6){
		drawLeftArm();
	}else if(incorrect == 7){
		drawLeftLeg();
	}else if(incorrect == 8){
		drawRightLeg();
		$('#win_loss').append("Game Over!");
	}
}



document.onkeyup = function(event){
	key = event.key;
	key = key.toUpperCase();

	if(allLetters.indexOf(key) >= 0){
		$('#used_letter').text("Already Used Letter!!");
		score == score;
	}else if(selectedWord.indexOf(key) >= 0){
		correctLetters.push(key);
		allLetters.push(key);
		score += 1000;
		$('#display_score').html("Score: " + score);
		$('#used_letter').text(" ");
	}else{
		score -= 1000;
		incorrect++;
		$('#display_score').html("Score: " + score);
		wrongLetters.push(key);
		allLetters.push(key);
		$('#wrong_letters').html(wrongLetters + ", ");
		$('#used_letter').text(" ");
		console.log(wrongLetters);
	}
	
	checkWord();
	drawHangman();
}

drawGame();
//window.onload = drawGame;
















