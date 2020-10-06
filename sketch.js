var tower,towerImage;
var doorImage,doorGroup,door;
var climberImage,climber,climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleGroup;
var gameState="PLAY";

function preload(){
towerImage=loadImage("tower.png");
doorImage=loadImage("door.png");
climberImage=loadImage("climber.png");
ghostImage=loadImage("ghost-standing.png");
}


function setup(){
createCanvas(600,600);

tower= createSprite(250,300,20,20);
tower.addImage("tower_moving",towerImage);
tower.velocityY=2;

ghost= createSprite(300,300,20,20);
ghost.addImage("stand",ghostImage);
ghost.scale=0.5;
 


  
edges= createEdgeSprites();

doorGroup=new Group();
climberGroup=new Group();
  invisibleGroup=new Group();
}






function draw(){
  
if (gameState==="PLAY"){
  
if (tower.y>400){
tower.y=300;
}

if (keyDown("right_arrow")){
ghost.x=ghost.x+2;
}
if (keyDown("left_arrow")){
ghost.x=ghost.x-2;
}
if (keyDown("space")){
ghost.velocityY=-8;
}

ghost.velocityY=ghost.velocityY+1;

  

if (climberGroup.isTouching(ghost)){
ghost.velocityY=0;
    
}
  
  spawnDoors();
spawnClimber();
}
  
  
  if (invisibleGroup.isTouching(ghost)||(ghost.y>600)){
    ghost.destroy();
    gameState="END";
  }
if (gameState==="END"){
  
  background("black");
  tower.destroy();
  textSize(24);
  stroke("yellow");
  text("GAME OVER!",300,300);
  
  
}

drawSprites();

}


function spawnDoors(){
if (frameCount%100===0){


door=createSprite(200,-50,20,20);
door.velocityY=2;
door.scale=0.8;
door.addImage("window",doorImage);
  
ghost.depth =door.depth+1;
door.lifetime=400;
doorGroup.add(door);
invisibleBlock=createSprite(200,10,80,5);
door.x=Math.round(random(100,400));
invisibleBlock.velocityY=2;
 invisibleBlock.x=door.x;
  invisibleGroup.add(invisibleBlock);
  invisibleBlock.debug=true;
  
}

}

function spawnClimber(){

if (frameCount%100===0){
climber=createSprite(200,0,20,20);
climber.velocityY=2;
climber.x=door.x;
climber.addImage("plant",climberImage);
climber.scale=0.8
climberGroup.add(climber);
}
}

