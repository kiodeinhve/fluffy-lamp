var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghost_jumping;
var invisibleBlockGroup, invisibleBlock;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghost_jumping = loadImage("ghost-jumping.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  

  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}
function draw() {
  background(200);
  
  if(gameState == PLAY){
    if(keyDown("space")){
      ghost.velocityY = -8;
    }
  
    if(keyDown("right_arrow")){
      ghost.velocityX = 4;
    }
    
    if(keyDown("left_arrow")){
      ghost.velocityX = -4;
    }

    if(ghost.y > 600 || invisibleBlockGroup.isTouching(ghost)){
      gameState = END;
      ghost.destroy();
      
    }
    ghost.velocityY = ghost.velocityY + 0.2;
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    createDoors();
  
    if(tower.y > 400){
        tower.y = 300
      }

      drawSprites();
  }
  else if(gameState == END){
    console.log("hello");
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
}

function createDoors(){
  if(frameCount % 120 === 0){
    door = createSprite(Math.round(random(80,520)), 30, 60, 20);
    door.velocityY = 2;
    door.addImage(doorImg);
    
    climber = createSprite(door.x, door.y + 50);
    climber.velocityY = 2;
    climber.addImage(climberImg);

    invisibleBlock = createSprite(door.x, door.y + 65, climber.width, 1);
    invisibleBlock.visible = false;
    invisibleBlock.velocityY = 2;

    //door.depth = door.depth;
    //climber.depth = climber.depth;
    ghost.depth = ghost.depth + 3;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

  }
}
