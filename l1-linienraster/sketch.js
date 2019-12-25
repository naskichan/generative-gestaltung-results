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
  linesCntX: 10,
  linesCntXMin: 5,
  linesCntXMax: 200,
  linesCntY: 10,
  linesCntYMin: 5,
  linesCntYMax: 200
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
function generateLines() {
  // Margin is Restfläche nach generieren aller Lines
  let linesMargin = width / drawingParams.linesCntX;
  let lines = [];
    for(cntX = 1; cntX < drawingParams.linesCntX; cntX++) {
      for(cntY = 1; cntY < drawingParams.linesCntY; cntY++) {
        let posX1 = cntX*linesMargin;
        let posY1 = cntY*linesMargin;
        let posX2 = cntX*linesMargin+10;
        let posY2 = cntY*linesMargin+10;
        let brightness = map(dist(posX1, 0, width/2, 0), 0, width/2, 0, 100);
        lines.push({posX1, posY1, posX2, posY2, brightness});
      }
    }  
  return lines;
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
    noLoop();
  }

  // Anything else
  fill(255);
}



function draw() {

  /* ----------------------------------------------------------------------- */
  // Provide your Code below.
  let lines = generateLines();
  //console.log(lines);
  background(0,0,18); 
  for(i=0;i<lines.length;i++) {
    stroke(0, 0, lines[i].brightness);
    line(lines[i].posX1,lines[i].posY1, lines[i].posX2, lines[i].posY2);
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

