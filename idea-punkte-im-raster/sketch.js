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
  circleSize: 10,
  circleSizeMin: 5,
  circleSizeMax: 20,
  margin: 10,
  marginMin: 5,
  marginMax: 30
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

/*TODO: Params:
* Distanz zwischen Punkten
* Anzahl Punkte X
* X einstellbar, Y fest nach Screensize
Anzahl Punkte Y
* Größe Punkte
* Achte auf Margin!
*/

function generateCircles() {
  // Es gibt kein MarginY, ist gleich MarginX
  //Bsp: circlesCount = 10 | margin = 10
  //Es muss 1 mehr Margin in width passen als circleSize
  // width - margin / circleSize+margin
  let circlesY = Math.floor((height-drawingParams.margin) / (drawingParams.circleSize+drawingParams.margin)); //Wie viele circleSize + margin+1 passen in width
  let circlesX = Math.floor((width-drawingParams.margin) / (drawingParams.circleSize+drawingParams.margin));
  circlesX++;
  circlesY++;
  let circles = [];
  console.log("circlesX: "+circlesX);
  console.log("circlesY: "+circlesY);
  let off = 1;
  for(cntY = 1; cntY < circlesY; cntY++) { 
    let posY = cntY * (drawingParams.margin + drawingParams.circleSize);
    for(cntX = 1; cntX < circlesX; cntX++) {
      if(cntX > 5) {
        off = cntX;
      } else {
        off = 0;
      }
      
      let posX = (cntX * (drawingParams.margin + drawingParams.circleSize)) + noise(off);
      circles.push({posX, posY});
    }  
  }
  return circles;
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
  colorMode(HSB, 360, 100, 100);

  // GUI Management
  if (canvasParams.gui) { 
    let sketchGUI = createGui('Params');
    sketchGUI.addObject(drawingParams);
    //noLoop();
  }

  // Anything else
  fill(255);
}



function draw() {
  let circles = generateCircles();
  /* ----------------------------------------------------------------------- */
  // Provide your Code below.
  
  console.log(circles);
  background(0, 0, 20);

  for(i=0;i<circles.length;i++) {
    fill(240,100,100);
    let offset = 0;
    let distance = dist(circles[i].posX, circles[i].posY, mouseX, mouseY);
    //Map to margin
    //Relativ zur Mausposition, wenn punkt negativ von maus, *-1
    if(distance < 100) {
      fill(distance, 100, 100);
      offset = map(distance,0,50,0,drawingParams.margin);

    }
    circle(circles[i].posX+offset,circles[i].posY+offset,drawingParams.circleSize);
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

