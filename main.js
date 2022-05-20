function preload() {
	mario_gameover = loadSound("gameover.wav");
	mario_jump = loadSound("jump.wav");
	mario_coin = loadSound("coin.wav");
	mario_kick = loadSound("kick.wav");
	mario_die = loadSound("mariodie.wav");
	world_start = loadSound("world_start.wav");
	setSprites();
	MarioAnimation();
}

function setup() {
	canvas = createCanvas(1240,336);
	canvas.parent('canvas');

	instializeInSetup(mario);
	
	video = createCapture(VIDEO);
	video.size(800,400);
	video.parent('game_console');

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);

}

function modelLoaded() {
	console.log('Model Loaded!');
  }

  function gotPoses(results)
  {
	if(results.length > 0)
	{
	  console.log(results);
	  noseX = results[0].pose.nose.x;
	  noseY = results[0].pose.nose.y;
	}
  }
   
function draw() {
	game();
}

noseX = "";
noseY = "";
GameStatus = "";

function startGame()
{
  GameStatus = "start";
  document.getElementById("status").innerHTML = "Game Is Loading";
}

function game(){

  console.log("noseX = " + noseX +" ,noseY =  "+ noseY);

  instializeInDraw();
  moveEnvironment(mario);
  drawSprites();
  
  if(gameConfig.status==='start'){

    fill(0,0,0,150);
    rect(0,0,gameConfig.screenX,gameConfig.screenY);

    fill(255, 255, 255);
    textSize(40);
    textAlign(CENTER);
    text("Press Play Button To Start The Game ", gameConfig.screenX/2, gameConfig.screenY/2);
    textSize(40);

    stroke(255);
    strokeWeight(7);
    noFill();

    changeGameStatud();
  }
  
  if(gameConfig.status==='play'){
    positionOfCharacter(mario);
    enemys(enemyMushrooms);
    checkStatus(mario);
    scores(mario);
    manualControl(mario);
  
  }

    // if game is over 
  if(gameConfig.status==='gameover'){
    
    fill(0,0,0,150);
    rect(0,0,gameConfig.screenX,gameConfig.screenY);

    fill(255, 255, 255);
    textSize(40);
    textAlign(CENTER);
    text("GAME OVER", gameConfig.screenX/2, gameConfig.screenY/2+105);
    textSize(15);
    text("Press SPACE to Restart", gameConfig.screenX/2, gameConfig.screenY/2+135);
    textSize(40);
    text(round(gameConfig.scores),gameConfig.screenX/2,gameConfig.screenY/2-35);
    text("points",gameConfig.screenX/2,gameConfig.screenY/2);

    stroke(255);
    strokeWeight(7);
    noFill();
    ellipse(gameConfig.screenX/2,gameConfig.screenY/2-30,160,160)
    changeGameStatud(mario)
  }
}  

// change game status if any key is pressed
function changeGameStatud(character){
 if(noseX !="" && gameConfig.status==="start" && GameStatus=="start") { 
   document.getElementById("status").innerHTML = "Game Is Loaded";
   world_start.play();
 initializeCharacterStatus(mario)
    gameConfig.status= "play"
  }
  if(gameConfig.status==="gameover" && keyDown(control.revive)) {
    gameConfig.status= "start"        
  }
}




