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
  radius: 200,
  radiusMin: 200,
  radiusMax: 500,
  pointCount: 10,
  pointCountMin: 4,
  pointCountMax: 40
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

function generatePoints() {
let points = [];
let angleSteps = 360/drawingParams.pointCount;
let num = 0
  for (angle = 0; angle < 360; angle += angleSteps) {
    let posX = cos(angle) * drawingParams.radius/2;
    let posY = sin(angle) * drawingParams.radius/2;
    points.push({posX, posY, num});
     num++;
  }
  return points;
}

function allConnectionsMade(points, lines) {
  for(i=0;i<points.length;i++) {
    if(lines[i] == undefined) {
      return false;
    }
  }
  return true;
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
  //^
  background(0,0,20);
  stroke(50,100,100);
  fill(0,0,20);
  translate(height/2, width/2);
  circle(0, 0, drawingParams.radius);
  let points = generatePoints();
  //Contains num of point 1 and 2;
  let lines = [];
  for(i=0;i<points.length;i++) {
    circle(points[i].posX, points[i].posY, 10);
  }
  let number = 0;
  let calculated = 0;
  let notConnected = true;
  lines[0] = 0;
  
  //Rechne den Durchgang x2
  //Wenn noch nicht alle Verbindungen gemacht wurden
  //Zeigt der multiplizierte Durchgang auf sich selbst?
  //Wenn nicht ist die Linie schon gemalt?
  //Dann mal sie
  while(notConnected && number < 1000) {
    //First multiply, then check
    calculated = number*2;
    //If not all connections are made
    if(!allConnectionsMade(points, lines)) {
      //If target isn´t startPoint
      if(calculated%10 != number%10) {
        //If line is not already drawn
        if(lines[number%10] != calculated%10) {
          lines[number%10] = calculated%10;
        }
      }
      number++;
    } else {
      notConnected = false;
    }

  }
  for(i=0;i<lines.length;i++) {
    line(points[i].posX, points[i].posY, points[lines[i]].posX, points[lines[i]].posY);
  }

//Starte bei Kreis 0, rechne x2, wenn ergebnis != aktueller Punkt, wenn ergebnis ist nicht verbunden mit punkt,
//Male linie 

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

