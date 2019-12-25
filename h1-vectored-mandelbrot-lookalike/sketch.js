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
  factor: false,
  gui: true
};
getCanvasHolderSize();

// Params for the drawing
let drawingParams = {
  rotateMode: 0,
  rotateModeMin: 0,
  rotateModeMax: 2
};

// Params for logging
let loggingParams = {
  targetDrawingParams: document.getElementById("drawingParams"),
  targetCanvasParams: document.getElementById("canvasParams"),
  state: false
};





/* ###########################################################################
Classes
############################################################################ */





/* ###########################################################################
Custom Functions
############################################################################ */

let radius = 200;
function generateVector(index, total) {
  let angle = map(index % total, 0, total, 0, TWO_PI);
  let v = p5.Vector.fromAngle(angle + PI);
  v.mult(radius);
  return v;
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
  colorMode(HSB);

  // GUI Management
  if (canvasParams.gui) { 
    let sketchGUI = createGui('Params');
    sketchGUI.addObject(drawingParams);
    //noLoop();
  }

  // Anything else
  fill(255);
}


  
let x = 0;
function draw() {

  /* ----------------------------------------------------------------------- */
  // Provide your Code below.
  //^
  background(0,0,20);
  noFill();
  translate(height/2, width/2);
  stroke(50,100,100);
  circle(0, 0, radius*2);
  let sinFunc = sin((x+Math.PI-Math.PI/2)/2+0.5);
  x++;
    let pointCount = map(sinFunc, -1, 1, 50, 200);
    let factor = 2;
    canvasParams.factor = factor;


  for (i=0;i<pointCount;i++) {
    let vectorA = generateVector(i, pointCount);
    let vectorB = generateVector(i * factor, pointCount);
    let distance = dist(vectorA.x, vectorA.y, vectorB.x, vectorB.y);
    vectorB.x = vectorB.x - distance;
    vectorB.y = vectorB.y - distance;
    if(i%2 != 0) {
      stroke(0,100,100);
    } else if(i%3 != 0) {
      //Interessanterweise gibt es ein Pattern bei den durch 3 teilbaren Zahlen
      //Ist eine Zahl durch 3 teilbar, gilt dies auch für die nachfolgende und deren nachfolgende
      //Danach ist die Zahl allerdings wieder durch 2 teilbar
      stroke(180,100,100);
    }
    
    circle(vectorA.x, vectorA.y, 3);
    circle(vectorB.x, vectorB.y, 3);
    line(vectorA.x, vectorA.y, vectorB.x, vectorB.y);
  }

  /* ----------------------------------------------------------------------- */
  // Log globals
  if (loggingParams) {
    canvasParams.mouseX = mouseX;
    canvasParams.mouseY = mouseY;
    logInfo();
  }
}



function keyPressed() {

  if (keyCode === 81) { // Q-Key
  }

  if (keyCode === 87) { // W-Key
  }

  if (keyCode === 89) { // Y-Key
  }

  if (keyCode === 88) { // X-Key
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



function mouseReleased() {}



function mouseDragged() {}



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

