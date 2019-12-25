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
  backgroundColor: 50,
  backgroundColorMax: 255,
  linesCnt: 10,
  linesCntMin: 5,
  linesCntMax: 200,
  xOffsetDown: 0,
  xOffsetDownMin: 0,
  xOffsetDownMax: 50,
  xOffsetUp: 0,
  xOffsetUpMin: 0,
  xOffsetUpMax: 50
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

  /*let linesMargin = width / drawingParams.linesCnt;
  let lines = [];
    for(cnt = 1; cnt < drawingParams.linesCnt; cnt++) {
      let posX1 = cnt*linesMargin + drawingParams.xOffsetUp;
      let posY1 = 0;
      let posX2 = cnt*linesMargin + drawingParams.xOffsetDown;
      let posY2 = width;
      lines.push({posX1, posY1, posX2, posY2});
    }  
  return lines; */

  let lines = [];
  let posX1 = 0;
  let posY1 = 100;
  let posX2 = height;
  let posY2 = 100;
  lines.push({posX1, posY1, posX2, posY2});
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
  colorMode(HSB, 360, 100, 100, 100);

  // GUI Management
  if (canvasParams.gui) { 
    let sketchGUI = createGui('Params');
    sketchGUI.addObject(drawingParams);
    //noLoop();
  }

  // Anything else
  
  fill(255);
}


let posNoise = 0.1;
let history = [];
let alpha = 100;
function draw() {

  /* ----------------------------------------------------------------------- */
  // Provide your Code below.
  //let lines = generateLines();
  //console.log(lines);
  background(0, 0, 10, 100);
  stroke(50, 100, 100, 100); 
  line(0,height/2+100,height,height/2+100);
  line(0,height/2-150,height,height/2-150);

  posNoise += 0.01;
  let noisePos = noise(posNoise)*width;
  history.push({noisePos, alpha});
  for(i=0;i<history.length;i++) {
    if(history[i].alpha > 0) {
      stroke(50, 100, 100, history[i].alpha);
      line(history[i].noisePos,(height/2)+100,history[i].noisePos,(height/2)-150);
      history[i].alpha = history[i].alpha-1;
    } else {
      
    }
  }
  console.log(history);
  /*for(i=0;i<lines.length;i++) {
    line(lines[i].posX1,lines[i].posY1, lines[i].posX2, lines[i].posY2);
  } */

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

