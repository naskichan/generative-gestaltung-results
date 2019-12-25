/*jshint esversion: 6 */

/* ############################################################################ 

Kurs «Generative Gestaltung» an der TH Köln
Christian Noss
christian.noss@th-koeln.de
https://twitter.com/cnoss
https://cnoss.github.io/generative-gestaltung/

############################################################################ */


let saveParams = {
  sketchName: "gg-sketch"
}


// Params for canvas
let canvasParams = {
  holder: document.getElementById("canvas"),
  state: false,
  mouseX: false,
  mouseY: false,
  background: 0,
  gui: true
};
getCanvasHolderSize();

// Params for the drawing
let drawingParams = {
  size: 100,
  sizeMax: 300,
  dotCount: 10,
  dotCountMin: 5,
  dotCountMax: 30,
  backgroundColorMax: 255,
  visibility: 50,
  visibilityMax: 100,
  filter: 1,
  filterMax: 5,
  circleTone: 360,
  circleToneMin:0,
  circleToneMax:360
};

// Params for logging
let loggingParams = {
  targetDrawingParams: document.getElementById("drawingParams"),
  targetCanvasParams: document.getElementById("canvasParams"),
  state: false
};

let dots = [];
let bufferDotCount = drawingParams.dotCount;

/* ###########################################################################
Classes
############################################################################ */
class Dot {
  constructor(posX, posY, thisColor, velocity) {
    this.posX = posX;
    this.posY = posY;
    this.thisColor = thisColor;
    this.velocity = velocity;
  }
  addPosX(value) {
    this.posX+=value;
  }
  addPosY(value) {
    this.posY+=value;
  }
  setVelocity(value) {
    this.velocity = value;
  }
  move() {
    this.addPosX(this.velocity[0]);
    this.addPosY(this.velocity[1]);
  }
  reflectIfColliding() {
    if(this.posX+drawingParams.size/2>width || this.posX-drawingParams.size/2<0 ) {
      this.velocity[0]*=-1;
    }
    if(this.posY+drawingParams.size/2>height || this.posY-drawingParams.size/2<0) {
      this.velocity[1]*=-1;
    }
  }
}




/* ###########################################################################
Custom Functions
############################################################################ */
function generateDots() {
  dots = [];
  for(i=0;i<drawingParams.dotCount;i++) {
    let thisColor = map(random(0,100),0,100,drawingParams.circleTone-140,drawingParams.circleTone);
    let velocity = [0,0];
    let posX = map(random(0,width),0,width,drawingParams.size, width-drawingParams.size);
    let posY = map(random(0, height),0,height,drawingParams.size,height-drawingParams.size);
    dots.push(new Dot(posX, posY, thisColor, velocity));
  }
}
function drawDots() {
  background(240,0,20,100);
  for(i=0;i<dots.length;i++) {
    fill(dots[i].thisColor,65,94,drawingParams.visibility);
    circle(dots[i].posX, dots[i].posY,drawingParams.size);
  }
}
function addDots(count) {
  for(i=0;i<count;i++) {
    let velocity = 0;
    let posX = map(random(0,width),0,width,drawingParams.size, width-drawingParams.size);
    let posY = map(random(0, height),0,height,drawingParams.size,height-drawingParams.size);
    dots.push({posX, posY, thisColor, velocity});
  }
}
function moveDots() {
  for(i=0;i<dots.length;i++) {
      dots[i].reflectIfColliding();
    dots[i].move();
  }
  
}
/* ###########################################################################
P5 Functions
############################################################################ */



function setup() {

  let canvas = createCanvas(canvasParams.w, canvasParams.h);
  canvas.parent("canvas");

  // Display & Render Options
  //frameRate(0.5);
  angleMode(DEGREES);
  smooth();
  colorMode(HSB, 360, 100, 100, 100);


  // GUI Management
  if (canvasParams.gui) { 
    let sketchGUI = createGui('Params');
    sketchGUI.addObject(drawingParams);
    //noLoop();
  }

  // Anything else
  fill(255);
  generateDots();
}


function draw() {

  /* ----------------------------------------------------------------------- */
  // Provide your Code below.
  
  drawDots();
  moveDots();
  
  //220 blue to 360 red

  
  filter(BLUR, drawingParams.filter);


  //x1,y1,x2,y2

  /* ----------------------------------------------------------------------- */
  // Log globals
  if (loggingParams) {
    canvasParams.mouseX = mouseX;
    canvasParams.mouseY = mouseY;
    logInfo();
  }
}

let status = 0;

function keyPressed() {

  if (keyCode === 81) { // Q-Key
  }

  if (keyCode === 87) { // W-Key
    generateDots();
    background(240,0,20,100);
    drawDots();
    filter(BLUR, 7);
    status = 0;
  }

  if (keyCode === 89) { // Y-Key
  }

  if (keyCode === 88) { // X-Key
    if(status==0) {
    for(i=0;i<dots.length;i++) {
        dots[i].setVelocity([random(-2,2),random(-2,2)]);
        
      }
      status=1;
    } else {
      for(i=0;i<dots.length;i++) {
        dots[i].setVelocity([0,0]);
      }
      status = 0;
    }
  }

  if (keyCode === 83) { // S-Key
    save(saveParams.sketchName + '.jpg');
  }

  if (keyCode === 49) { // 1-Key
  }

  if (keyCode === 50) { // 2-Key
  }

}



function mousePressed() {}



function mouseReleased() {
}



function mouseDragged() {
}



function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) clear();
}





/* ###########################################################################
Service Functions
############################################################################ */



function getCanvasHolderSize() {
  canvasParams.w = canvasParams.holder.clientWidth;
  canvasParams.h = canvasParams.holder.clientHeight;
}



function resizeMyCanvas() {
  getCanvasHolderSize();
  resizeCanvas(canvasParams.w, canvasParams.h);
}



function windowResized() {
  resizeMyCanvas();
}



function logInfo(content) {

  if (loggingParams.targetDrawingParams) {
    loggingParams.targetDrawingParams.innerHTML = helperPrettifyLogs(drawingParams);
  }

  if (loggingParams.targetCanvasParams) {
    loggingParams.targetCanvasParams.innerHTML = helperPrettifyLogs(canvasParams);
  }

}

