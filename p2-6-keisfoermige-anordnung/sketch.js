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
  radius: 20,
  radiusMin: 10,
  radiusMax: 50,
  backgroundColor: 50,
  backgroundColorMax: 255,
  pointCount: 10,
  pointCountmin: 4,
  pointCountmax: 20,
  circleCount: 1,
  circleCountMax: 4,
  circleCountMin: 1
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

  // GUI Management
  if (canvasParams.gui) { 
    let sketchGUI = createGui('Params');
    sketchGUI.addObject(drawingParams);
    noLoop();
    angleMode(DEGREES);
  }

  // Anything else
  fill(255);
}



function draw() {

  /* ----------------------------------------------------------------------- */
  // Provide your Code below.
  background(drawingParams.backgroundColor);
  fill(255, 255, 0);
  let angleSteps = 360/drawingParams.pointCount;
  let circlesCount = (drawingParams.radius+20)/width;
  for (i=0;i<circlesCount;i++) {
    for (angle = 0; angle <= 360; angle += angleSteps) {
      let posX = cos(angle) * drawingParams.radius;
      let posY = sin(angle) * drawingParams.radius;
      circle(height/2+posX, circlesCount*width+posY, 10);
    }
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

