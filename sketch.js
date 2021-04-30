var balloon,balloonImage1,balloonImage2;
// create database and position variable here

var database;

var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {

  createCanvas(1500,700);


database=firebase.database();

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5
  
 
  

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
console.log(balloon.x);
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    var x=balloon.x-1;
    var y=balloon.y;
    //balloon.x=balloon.x-1;
    updatePosition(-10,0);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.x=balloon.x+1;
    var x=balloon.x+1;
    var y=balloon.y;
    updatePosition(10,0);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.y=balloon.y+1;
    var x=balloon.x;
    var y=balloon.y+1;
    updatePosition(0,10);
    balloon.scale=+0.5;
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.y=balloon.y-1;
    var x=balloon.x;
    var y=balloon.y-1;
    updatePosition(0,-10);
    balloon.scale=-0.5;
    //write code to move air balloon in down direction
  }
  var balloonPosition=database.ref("balloon/position");
  balloonPosition.on("value",readPosition,showError);
  
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updatePosition(x,y){
console.log(x);
console.log(y);
database.ref("balloon/position").set({
  "x": height.x + x ,
  "y": height.y + y
});
}

function  readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
  console.log("readPosition"+balloon.x);
  console.log("readPosition"+height.x);
}

function showError(){
  console.log("Error in writing to the database");
}








