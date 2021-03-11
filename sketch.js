const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var PLAY = 1;
var WIN = 2;
var END = 0;
var gameState = PLAY;

var crow,crowImage;

var stone,stoneImage;

var pot,pot1Image,pot2Image,pot3Image,pot4Image,pot5Image;

var bgImage;

var s1,s2,s3,s4;


function preload (){
  //  Game Over Image
  gameOverImg = loadImage("images/gameOver.png");
  // Restart Image
  restartImg = loadImage("images/restart.png");
  // Win Image
  winImg = loadImage("images/Win.png");
  // Background Image
  bgImage = loadImage("images/bgimage.jpg")
  // pot Image
  pot1Image = loadImage("images/pot1.png");
  pot2Image = loadImage("images/pot2.png");
  pot3Image = loadImage("images/pot3.png");
  pot4Image = loadImage("images/pot4.png");
  pot5Image = loadImage("images/pot5.png");
  pot6Image = loadImage("images/pot6.png");
  pot7Image = loadImage("images/pot7.png");
  //  Crow Image
  crowImage1 = loadAnimation("images/crow1.png","images/crow2.png","images/crow3.png","images/crow4.png")
  crowImage2 = loadAnimation("images/crow5.png","images/crow6.png","images/crow7.png","images/crow8.png")
  //  Stone Image
  stoneImage = loadImage("images/stone.png");
  //  Tartule Image
  tartuleImage = loadAnimation("images/turtle1.png","images/turtle2.png","images/turtle3.png")
  //Bird Image
  birdImage = loadAnimation("images/bird1.png","images/bird2.png","images/bird3.png","images/bird4.png","images/bird5.png")
}
  //  Function Setup
function setup (){
  var canvas = createCanvas(1350,600);
  engine = Engine.create();
  world = engine.world;

  ddd = createSprite(80,15,130,30)
  ddd.shapeColor = (rgb(255,255,255));
  ddd.visible=false;

  restart1 = createSprite(700,470);
  restart1.addImage(restartImg);
  restart1.scale=0.3
  restart1.visible=false;

  restart2 = createSprite(1100,300);
  restart2.addImage(restartImg);
  restart2.scale=0.3
  restart2.visible=false;

  pot1 = createSprite(750,555,20,20);
  pot1.addImage("gg", pot1Image);
  pot1.scale = 0.5;

  pot2 = createSprite(750,555,20,20);
  pot2.addImage("gg", pot2Image);
  pot2.scale = 0.5;
  pot2.visible = false;

  pot3 = createSprite(750,555,20,20);
  pot3.addImage("gg", pot3Image);
  pot3.scale = 0.5;
  pot3.visible = false;

  pot4 = createSprite(750,555,20,20);
  pot4.addImage("gg", pot4Image);
  pot4.scale = 0.5;
  pot4.visible = false;

  pot5 = createSprite(750,555,20,20);
  pot5.addImage("gg", pot5Image);
  pot5.scale = 0.5;
  pot5.visible = false;

  pot6 = createSprite(750,555,20,20);
  pot6.addImage("gg", pot6Image);
  pot6.scale = 0.5;
  pot6.visible = false;

  pot7 = createSprite(750,555,20,20);
  pot7.addImage("gg", pot7Image);
  pot7.scale = 0.5;
  pot7.visible = false;

s1 = createSprite(715,555,5,65);
s2 = createSprite(785,555,5,65);
s3 = createSprite(750,590,65,5);
s4 = createSprite(750,520,80,5);
s5 = createSprite(750,590,65,20);
s1.visible = false;
s2.visible = false;
s3.visible = false;
s4.visible = false;
s5.visible = false;

 crow = createSprite(100,100,100,100)
 crow.addAnimation("fling",crowImage1);
  crow.setCollider("rectangle",0,0,100,60);
  crow2 = createSprite(100,100,100,100)
  crow2.addAnimation("fling",crowImage2);
   crow2.setCollider("rectangle",0,0,100,60);
crow2.visible=false;

b1 = createSprite(675,-3,1350,2)
b2 = createSprite(1353,300,2,600)
b3 = createSprite(675,600,1350,2)
b4 = createSprite(0,300,2,600)




score1 = 300  
score2 = 0  
stoneGroup = new Group();
turtleGroup = new Group();
birdGroup = new Group();
}
function draw (){
  
  background(bgImage);

  fill("black");
  textSize(25)
  text("Time: "+ score1, 20,20);
  text("Score: "+ score2, 1000,20);
   text("save water - save life",555,20);

  //  score1=  Math.round(score1-0.100);

  score1 = score1 + Math.round(getFrameRate()/-61);

  if(gameState === PLAY){
    if (score2===6){pot2.visible = true;}
    if (score2===12){pot3.visible = true;}
    if (score2===18){pot4.visible = true;}
    if (score2===24){pot5.visible = true;}
    if (score2===30){pot6.visible = true;}
    if (score2===36){pot7.visible = true;
      gameState = WIN;
    }

    for (var i = 0; i < stoneGroup.length; i++) { 
      if(stoneGroup.get(i).isTouching(crow)){
        stoneGroup.get(i).remove()
      score2 = score2+2;
    }
  }

  if(keyIsDown(UP_ARROW)){
    crow.y = crow.y - 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    crow.y = crow.y + 10;
  }
  if(keyDown("right_arrow")){
    crow.x = crow.x + 10;
    crow2.visible=false
  }  
   if(keyDown("left_arrow")){
    crow.x = crow.x - 10;
    crow.visible=false;
  } 


  if(keyIsDown(UP_ARROW)){
    crow2.y = crow2.y - 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    crow2.y = crow2.y + 10;
  }
  if(keyDown("right_arrow")){
    crow2.x = crow2.x + 10;
    crow.visible=true;
    }  
   if(keyDown("left_arrow")){
    crow2.x = crow2.x - 10;
    crow2.visible=true;
  } 

  Bird();
  Stone();
  turtyle1();

if (turtleGroup.isTouching(crow)){
  gameState = END;
}

if (birdGroup.isTouching(crow)){
  gameState = END;
}
  if (score1===0){
    gameState = END;
  }
}

  else if (gameState === END) {
    background(gameOverImg);

    fill("red");
    text("Time: "+ score1, 20,20);

    ddd.visible=true;

     stoneGroup.setLifetimeEach(0);
     stoneGroup.setVelocityXEach(0);

     turtleGroup.setLifetimeEach(0);
     turtleGroup.setVelocityXEach(0);  

     birdGroup.setLifetimeEach(0);
     birdGroup.setVelocityXEach(0);   

     restart1.visible=true
     crow.visible=false;
     crow2.visible=false;

     pot1.visible=false;
     pot2.visible=false;
      pot3.visible=false;
      pot4.visible=false;
      pot5.visible=false;
      pot6.visible=false;
      pot7.visible=false;

      turtleGroup.visible=false;;
  stoneGroup.visible=false;
  }

  
  else if (gameState === WIN) {
    background(winImg);
    ddd.visible=true;

     stoneGroup.setLifetimeEach(0);
     stoneGroup.setVelocityXEach(0);

     turtleGroup.setLifetimeEach(0);
     turtleGroup.setVelocityXEach(0);   

      birdGroup.setLifetimeEach(0);
      birdGroup.setVelocityXEach(0);  

     restart2.visible=true
     crow.visible=false;
     crow2.visible=false;
     pot1.visible=false;
     pot2.visible=false;
      pot3.visible=false;
      pot4.visible=false;
      pot5.visible=false;
      pot6.visible=false;
      pot7.visible=false;

  turtyleGroup.visible=false;;
  stoneGroup.visible=false;

  }
  if(mousePressedOver(restart1)) {
    reset();
  }
    if(mousePressedOver(restart2)) {
    reset();
  }
  crow.collide(s1);
  crow.collide(s2);
  crow.collide(s3);
  crow2.collide(s1);
  crow2.collide(s2);
  crow2.collide(s3);

  crow.collide(b1);
  crow.collide(b2);
  crow.collide(b3);
  crow.collide(b4);
  crow2.collide(b1);
  crow2.collide(b2);
  crow2.collide(b3);
  crow2.collide(b4);

drawSprites();
}

function reset(){
  
  gameState=PLAY;

crow.x=100;
crow.y=100;
crow2.x=100;
crow2.y=100;

  ddd.visible=false;
  restart1.visible=false
  restart2.visible=false
  crow.visible=true;
  crow2.visible=true;

  pot1.visible=true;

  turtleGroup.visible=true;;
stoneGroup.visible=true;
  
  stoneGroup.destroyEach();
  turtleGroup.destroyEach();
  birdGroup.destroyEach();
  score1=300;
  score2=0;
  
}


function Stone(){
  if (frameCount % 80 === 0){
   var stone = createSprite(1400,580,40,10);
   stone.y = Math.round(random(0,590));
   stone.addImage(stoneImage);
   stone.scale=0.04;
   stone.velocityX = -5; 
   stone.lifetime = 1350;
   stone.setCollider("circle",0,0,100);
   stoneGroup.add(stone);
 }}

 function turtyle1(){
  if (frameCount % 100 === 0){
   var turtle = createSprite(1400,580,40,10);
   turtle.y = Math.round(random(0,590));
   turtle.addAnimation("sss",tartuleImage);
   turtle.velocityX = -6; 
   turtle.lifetime = 1350;
   turtle.setCollider("circle",0,0,20);
  //  turtyle.debug=true;
  turtle.scale=0.5
  turtleGroup.add(turtle);
 }}

 
 function Bird(){
  if (frameCount % 150 === 0){
   var bird = createSprite(1400,580,40,10);
   bird.y = Math.round(random(0,590));
   bird.addAnimation("sss",birdImage);
   bird.velocityX = -6; 
   bird.lifetime = 1350;
   bird.setCollider("circle",0,0,20);
  // bird.debug=true;
   bird.scale=1.5;
  birdGroup.add(bird);
 }}