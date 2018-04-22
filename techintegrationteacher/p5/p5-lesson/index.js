var alienList = [];

function setup() {
  var canvas = createCanvas(500,500);
  canvas.parent('canvasDiv');
  background(215);
  angleMode(DEGREES);
  rectMode(CENTER);
  strokeWeight(2);
  frameRate(20);

  for (var i = 0; i < 10; i++){
    var anAlien = new Alien;
    alienList.push(anAlien);
  }
}

var soldierX = 250;
var soldierY = 250;
var soldierDir = 0;

var goalX = 250;
var goalY = 250;

var triangleAngle = 0;

function makeSoldier(x, y, dir){
  translate(x, y);
  rotate(dir);
  stroke('black');
  rect(0,-20,10,20);
  ellipse(0,0,30,30);
  resetMatrix();
}

function pointSoldier(){
  stroke('green');
  line(soldierX, soldierY, goalX, goalY);
  stroke('blue');
  line(soldierX, soldierY, goalX, soldierY);
  stroke('red');
  line(goalX, soldierY, goalX, goalY);

  var xDist = soldierX - goalX;
  var yDist = soldierY - goalY;

  triangleAngle = Math.abs(atan(yDist / xDist));

  if (xDist < 0 && yDist < 0){
    soldierDir = triangleAngle + 90;
  }
  if (xDist < 0 && yDist > 0){
    soldierDir = 90 - triangleAngle;
  }
  if (xDist > 0 && yDist > 0){
    soldierDir = triangleAngle + 270;
  }
  if (xDist > 0 && yDist < 0){
    soldierDir = 270 - triangleAngle;
  }
}

function moveSoldier(){
  var singleYMovement = sin(triangleAngle);
  var singleXMovement = cos(triangleAngle);

  if (soldierX < goalX && soldierY < goalY){
    soldierX = soldierX + singleXMovement;
    soldierY = soldierY + singleYMovement;
  }
  if (soldierX > goalX && soldierY > goalY){
    soldierX = soldierX - singleXMovement;
    soldierY = soldierY - singleYMovement;
  }
  if (soldierX < goalX && soldierY > goalY){
    soldierX = soldierX + singleXMovement;
    soldierY = soldierY - singleYMovement;
  }
  if (soldierX > goalX && soldierY < goalY){
    soldierX = soldierX - singleXMovement;
    soldierY = soldierY + singleYMovement;
  }
}

class Alien{
  constructor(){
    this.x = random(500);
    this.y = random(500);
    this.distanceFromSoldier;
    this.show = true;
  }

  showAlien(){
    if (this.show === true){
      translate(this.x, this.y);
      stroke('black');
      ellipse(0,0,30,10);
      ellipse(0,0,10,30);
      resetMatrix();
    }
  }

  calcDistanceFromSoldier(){
    var xDistSquared = Math.pow(Math.abs(this.x - soldierX), 2);
    var yDistSquared = Math.pow(Math.abs(this.y - soldierY), 2);
    var addedValue = xDistSquared + yDistSquared;
    var result = Math.round(Math.sqrt(addedValue));
    this.distanceFromSoldier = result;
  }
}

function draw() {
  background(215);
  makeSoldier(soldierX, soldierY, soldierDir);
  pointSoldier();
  moveSoldier();

  for (var i = 0; i < 10; i++){
    alienList[i].calcDistanceFromSoldier();
    if (alienList[i].distanceFromSoldier <= 40){
      alienList[i].show = false;
    }
    alienList[i].showAlien();
  }
}

function mousePressed(){
  goalX = mouseX;
  goalY = mouseY;
}
