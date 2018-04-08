document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);

var soldierImage;
var alienImage;
var gemImage;
var bulletImage;
var gem1;
var gem2;
var soldiers = [];
var soldiersOnScreen = 0;
var shortenedHeight;
var shortenedWidth;
var aliens = [];

function preload(){
  soldierImage = loadImage("soldierTopDown.png");
  alienImage = loadImage("alienTopDown.png");
  gemImage = loadImage("gem.png");
  bulletImage = loadImage("bullet.png");
}

class Soldier{
  constructor(x = 50, y = 50){
    this.img = soldierImage;
    this.bulletImg = bulletImage;
    this.x = x;
    this.y = y;
    this.dir =  90 //random(360);
    this.onScreen = false;
    this.width = shortenedWidth * .07;
    this.height = shortenedHeight * .07;
    this.highlighted = false;
    this.triangleAngle = 0;
    this.destinationX = 0;
    this.destinationY = 0;
    this.bulletX = 0;
    this.bulletY = 0;
    soldiers.push(this);
  }

  showSoldier(){
    if (this.onScreen){
      translate(this.x, this.y);
      rotate(this.dir);
      image(this.img, 0, 0, this.width, this.height);
      resetMatrix();
    }
  }

  shoot(){
    translate(this.x, this.y);
    rotate(this.dir);
    if (this.bulletY < 400){
      this.bulletY += 10;
      image(this.bulletImg, 0, -this.bulletY, this.width * .1, this.height * .2);
      console.log (height);
    }
    else{
      this.bulletY = 0;
    }
    resetMatrix();
  }


  distanceFrom(obj){
    var xDistSquared = Math.pow(Math.abs(this.x - obj.x), 2);
    var yDistSquared = Math.pow(Math.abs(this.y - obj.y), 2);
    var addedValue = xDistSquared + yDistSquared;
    var result = Math.round(Math.sqrt(addedValue));
    return result;
  }

  pointTowards(obj){
    var xDist = Math.abs(this.x - obj.x);
    var yDist = Math.abs(this.y - obj.y);
    this.triangleAngle = Math.round(atan(yDist / xDist));
    if (this.x < obj.x && this.y < obj.y){
      this.dir = 90 + this.triangleAngle;
    }
    if (this.x < obj.x && this.y > obj.y){
      this.dir = 90 - this.triangleAngle;
    }
    if (this.x > obj.x && this.y < obj.y){
      this.dir = 270 - this.triangleAngle;
    }
    if (this.x > obj.x && this.y > obj.y){
      this.dir = 270 + this.triangleAngle;
    }
    resetMatrix();
  }

  moveTowards(obj){
    var yMovement = (sin(this.triangleAngle)/1.5);
    var xMovement = (cos(this.triangleAngle)/1.5);
    if (this.x < obj.x && this.y < obj.y){
      this.y += yMovement;
      this.x += xMovement;
    }
    if (this.x < obj.x && this.y > obj.y){
      this.y -= yMovement;
      this.x += xMovement;
    }
    if (this.x > obj.x && this.y < obj.y){
      this.y += yMovement;
      this.x -= xMovement;
    }
    if (this.x > obj.x && this.y > obj.y){
      this.y -= yMovement;
      this.x -= xMovement;
    }
    resetMatrix();
  }

  pointTowardsXY(xx,yy){
    var xDist = Math.abs(this.x - xx);
    var yDist = Math.abs(this.y - yy);
    this.triangleAngle = atan(yDist / xDist);

    if (this.x > xx && this.y < yy){
      this.dir = 270 - this.triangleAngle;
    }
    if (this.x > xx && this.y > yy){
      this.dir = 270 + this.triangleAngle;
    }
    if (this.x < xx && this.y < yy){
      this.dir = 90 + this.triangleAngle;
    }
    if (this.x < xx && this.y > yy){
      this.dir = 90 - this.triangleAngle;
    }
    //console.log(" thisX: " + this.x + " thisY: " + this.y + " xx: " + xx + " yy: " + yy);
    resetMatrix();
  }

  moveTowardsXY(xx, yy){
    var yMovement = (sin(this.triangleAngle)/1.5);
    var xMovement = (cos(this.triangleAngle)/1.5);
    if (Math.abs(this.x - xx) > 1 && Math.abs(this.y - yy) > 1){
      if (this.x < xx && this.y < yy){
        this.y += yMovement;
        this.x += xMovement;
      }
      if (this.x < xx && this.y > yy){
        this.y -= yMovement;
        this.x += xMovement;
      }
      if (this.x > xx && this.y < yy){
        this.y += yMovement;
        this.x -= xMovement;
      }
      if (this.x > xx && this.y > yy){
        this.y -= yMovement;
        this.x -= xMovement;
      }
    }
    resetMatrix();
  }

  placeSoldier(x, y){
    this.x = x;
    this.y = y;
    this.destinationX = x;
    this.destinationY = y;
  }

  highlight(){
    translate(this.x, this.y);
    rotate(this.dir);
    rectMode(CENTER);
    noFill();
    rect(0,0, this.width * 1.1, this.height * 1.1);
    resetMatrix();
  }

}

class Alien{
  constructor(){
    this.img = alienImage;
    this.x = random(width);
    this.y = random(height);
    this.dir = 0;
    this.onScreen = false;
    aliens.push(this);
    this.enemyList = [];
    this.distanceToEnemy = 0;
    this.triangleAngle = 0;
    this.topEnemy;
  }

  showAlien(){
    if (this.onScreen){
      translate(this.x, this.y);
      rotate(this.dir);
      image(this.img, 0, 0, shortenedWidth * .07, shortenedHeight * .07);
      resetMatrix();
    }
  }

  pointTowards(obj){
    var xDist = Math.abs(this.x - obj.x);
    var yDist = Math.abs(this.y - obj.y);
    this.triangleAngle = atan(yDist / xDist);
    if (this.x <= obj.x && this.y <= obj.y){
      this.dir = 90 + this.triangleAngle;
    }
    if (this.x <= obj.x && this.y >= obj.y){
      this.dir = 90 - this.triangleAngle;
    }
    if (this.x >= obj.x && this.y <= obj.y){
      this.dir = 270 - this.triangleAngle;
    }
    if (this.x >= obj.x && this.y >= obj.y){
      this.dir = 270 + this.triangleAngle;
    }
    resetMatrix();
  }

  distanceFrom(obj){
    var deltaX = this.x - obj.x;
    var deltaY = this.y - obj.y;
    var slope = deltaY / deltaX;
    var xDistSquared = Math.pow(Math.abs(deltaX), 2);
    var yDistSquared = Math.pow(Math.abs(deltaY), 2);
    var addedValue = xDistSquared + yDistSquared;
    var result = Math.sqrt(addedValue);
    return result;
  }

  moveTowards(obj){
    var yMovement = (sin(this.triangleAngle)/1.7);
    var xMovement = (cos(this.triangleAngle)/1.7);
    if (this.x < obj.x && this.y < obj.y){
      this.y += yMovement;
      this.x += xMovement;
    }
    if (this.x < obj.x && this.y > obj.y){
      this.y -= yMovement;
      this.x += xMovement;
    }
    if (this.x > obj.x && this.y < obj.y){
      this.y += yMovement;
      this.x -= xMovement;
    }
    if (this.x > obj.x && this.y > obj.y){
      this.y -= yMovement;
      this.x -= xMovement;
    }
  }

  scanEnemies(){
    this.enemyList = [];
    for (var i = 0; i < soldiers.length; i++){
      if (soldiers[i].onScreen){
        var distance = this.distanceFrom(soldiers[i]);
        var arrayItem = [soldiers[i], distance];
        this.enemyList.push(arrayItem);
        this.enemyList.sort(this.compareEnemies);
      }
    }
    if (this.enemyList.length > 0){
      this.topEnemy = this.enemyList[0][0];
      if (this.distanceFrom(this.topEnemy) < 150){
        this.pointTowards(this.topEnemy);
        this.moveTowards(this.topEnemy);
      }
      else{
        this.pointTowards(gem1);
        this.moveTowards(gem1);
      }
    }
    else{
      this.pointTowards(gem1);
      this.moveTowards(gem1);
    }

  }
  compareEnemies(a, b){
    var firstItemDistance = a[1];
    var secondItemDistance = b[1];
    return firstItemDistance - secondItemDistance;
  }
}

var makeSoldierButton;
var numOfSoldiers = 5;
function setup() {
  //var canvas = createCanvas(windowWidth * .90, windowHeight * .90);
  var canvas = createCanvas(800, 600);
  canvas.parent('canvasDiv');
  console.log("Draw cycles: " + drawCycles + " (*60)");
  if (height > width){
    shortenedHeight = width;
    shortenedWidth = width;
  }
  if (width > height){
    shortenedHeight = height;
    shortenedWidth = height;
  }
  if (width === height){
    shortenedHeight = height;
    shortenedWidth = width;
  }

  background(215);
  frameRate(60);
  angleMode(DEGREES);
  imageMode(CENTER);

  gem1 = {
    img: gemImage,
    //x: width - 50,
    //y: height / 2
    x: width * .25,
    y: height/2
  };
  gem2 = {
    img: gemImage,
    //x: width - 50,
    //y: height / 2
    x: width * .75,
    y: height/2
  };

  for (var i = 0; i < numOfSoldiers; i++){
    new Soldier;
  }
  for (var i = 0; i < 1; i++){
    new Alien;
  }

  makeSoldierButton = select("#soldierButton");
  makeSoldierButton.mousePressed(function(){
    soldierButtonPressed = !soldierButtonPressed;
  });

  if (height > width){
    shortenedHeight = width;
    shortenedWidth = width;
  }
  if (width > height){
    shortenedHeight = height;
    shortenedWidth = height;
  }

  console.log("Aliens: ");
  console.log(aliens);
  console.log("Soldiers: ");
  console.log(soldiers);

}
var frameNumber = 0;
var drawCycles = 0;
var debugInfo;
// DRAW // DRAW // DRAW // DRAW // DRAW // DRAW // DRAW // DRAW // DRAW // DRAW
function draw() {
  background(215);
  for (var i = 0; i < soldiers.length; i++){
    if (soldiers[i].onScreen){
      soldiers[i].showSoldier();
      //console.log(soldiers[i].triangleAngle);
      soldiers[i].pointTowardsXY(soldiers[i].destinationX, soldiers[i].destinationY);
      soldiers[i].moveTowardsXY(soldiers[i].destinationX, soldiers[i].destinationY);
      soldiers[i].shoot();
      if (soldiers[i].highlighted){
        soldiers[i].highlight();
      }
    }
  }
  for (var i = 0; i < aliens.length; i++){
    if (aliens[i].onScreen){
      aliens[i].showAlien();
      aliens[i].scanEnemies();
    }
  }

  image(gem1.img, gem1.x, gem1.y, shortenedWidth * .15, shortenedHeight * .15);
  image(gem2.img, gem2.x, gem2.y, shortenedWidth * .15, shortenedHeight * .15);

  frameNumber++;
  if (frameNumber > 179){
    frameNumber = 0;
    drawCycles = drawCycles + 3;
    console.log("Draw cycles: " + drawCycles + " (*60)");
  }
}

var soldierButtonPressed = false;
var highlightedSoldier = "none";
function mousePressed(){
  if (mouseButton === LEFT){
    if (soldierButtonPressed){
      if (soldiersOnScreen < numOfSoldiers && mouseX < width && mouseY < height){
        soldiers[soldiersOnScreen].placeSoldier(mouseX, mouseY);
        soldiers[soldiersOnScreen].onScreen = true;
        soldiersOnScreen++;
      }
    }
    if (soldierButtonPressed === false && mouseX < width && mouseY < height){
      for (var j = 0; j < soldiers.length; j++){
        soldiers[j].highlighted = false;
      }
      for (var i = 0; i < soldiers.length; i++){
        var soldierX = soldiers[i].x - (soldiers[i].width/2);
        var soldierY = soldiers[i].y - (soldiers[i].height/2);
        var soldierWidth = soldierX + soldiers[i].width;
        var soldierHeight = soldierY + soldiers[i].height;
        if ((mouseX > soldierX && mouseX < soldierWidth) && (mouseY > soldierY && mouseY < soldierHeight)){
          soldiers[i].highlighted = true;
          highlightedSoldier = soldiers[i];
          break;
        }
        else{
          highlightedSoldier = "none";
        }
      }
    }
    //console.log(highlightedSoldier);
  }
  if (mouseButton === RIGHT){
    if (highlightedSoldier != "none")
      highlightedSoldier.destinationX = mouseX;
      highlightedSoldier.destinationY = mouseY;
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth * .90, windowHeight * .90);
// }

var seconds = 5;
var timer = setInterval(reduceSeconds, 1000);

function reduceSeconds(){
  seconds--;
  var timerHTML = select("#countDown");
  timerHTML.html(seconds);
  if (seconds === 0){
    clearInterval(timer);
    for (var i = 0; i < aliens.length; i++){
      aliens[i].onScreen = true;
    }
  }
}
