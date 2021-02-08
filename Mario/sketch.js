var mario,mario_standingImg,mario_runningImg,ground,groundImg,bg,bgImg,coin,coinImg
var enemy,enemyImg,mushroom,mushroomImg,obstacle,obstacleImg,enemyKill,brickImg

function preload(){
  mario_standingImg=loadAnimation("mario00.png")
  mario_runningImg=loadAnimation("mario00.png","mario03.png","mario01.png","mario02.png")
  groundImg=loadImage("ground2.png")
  bg=loadImage("bg.png")
  obstacleImg=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
  enemyImg=loadImage("enemy.png")
  brickImg=loadImage("brick.png")
  coinImg=loadImage("coin.png")


}

function setup(){
  createCanvas(400,400)
  mario=createSprite(50,320,20,20)
  mario.addAnimation("standing",mario_standingImg)
  mario.addAnimation("running",mario_runningImg)
  ground=createSprite(200,370,800,65)
  ground.addImage(groundImg)
  ground.scale=0.75
  obstacle=createSprite(200,320,20,10)
  obstacle.addAnimation("plant",obstacleImg)
  obstacle.scale=0.75
  enemy=createSprite(300,340,20,20)
  enemy.addImage(enemyImg)
  enemy.scale=0.2
  enemyKill=createSprite(enemy.x,enemy.y-35,20,5)
  enemyKill.visible=false
  brick1=createSprite(250,250,20,20)
  brick1.addImage(brickImg)
  
}

function draw(){
  background(bg)
  camera.position.x=mario.x
  //mario.debug=true
  enemy.debug=true
  if(keyIsDown(RIGHT_ARROW)){
    mario.changeAnimation("running",mario_runningImg)
    mario.x=mario.x+5
  }else{
    mario.changeAnimation("standing",mario_standingImg)
  }
  if(keyDown(UP_ARROW)&&mario.y>=320){
    mario.velocityY=mario.velocityY-10
  }
  

  if(keyIsDown(LEFT_ARROW)){
    mario.changeAnimation("running",mario_runningImg)
    mario.x=mario.x-5
  }else{
    mario.changeAnimation("standing",mario_standingImg)
  }
  if(mario.isTouching(enemyKill)){
    enemy.visible=false
    enemy.lifetime=0
  }
  if(mario.isTouching(enemy)||mario.isTouching(obstacle)){
    mario.visible=false
  }
  if(mario.isTouching(brick1)){
    coin=createSprite(brick1.x,brick1.y,20,20)
    brick1.destroy()
  }
  mario.velocityY=mario.velocityY+0.5
  mario.collide(ground)
  mario.collide(brick1)
  mario.setCollider("rectangle",0,3,20,25)
  enemy.setCollider("rectangle",-10,-50,100,100)
  drawSprites()
  console.log(mouseY)
}
