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
  size: 300,
  sizeMin: 50,
  sizeMax: 500,
  width: 15,
  widthMin: 5,
  widthMax: 25,
  margin: 10,
  marginMin: 2,
  marginMax: 30
};

// Params for logging
let loggingParams = {
  targetDrawingParams: document.getElementById("drawingParams"),
  targetCanvasParams: document.getElementById("canvasParams"),
  state: false
};


let bamboo = [];
let mic;


/* ###########################################################################
Classes
############################################################################ */
class Bamboo {

  constructor(stemHeight, leafCount, anchorX) {
    this.stemHeight = height-stemHeight;
    this.leafCount = leafCount,
    this.anchorX = anchorX;
    this.stem = [];
    let leaves = [];
    this.generateStem();
    this.generateLeafes();
  }
  //Generates the elements of a stem
  //A bamboo tree has segments of random height within parameters
  //A bamboo is constructed of x Segments, which are generated here
  generateStem() {
    let segmentHeight = height;
    while(this.stemHeight < segmentHeight) {
      segmentHeight-=Math.floor(random(20,50));
      this.stem.push(segmentHeight);
    }
  }
  //A bamboo tree has leaves, WIP
  generateLeafes() {
  }
  drawStem() {
    let currentHeight = height;
    for(let i=0;i<this.stem.length;i++) {
      stroke(64,42,79);
      strokeWeight(2);
      fill(71,60,66);
      rectMode(CORNERS);
      rect(this.anchorX-(drawingParams.width/2), currentHeight, this.anchorX+(drawingParams.width/2), this.stem[i]);
      //line(this.anchorX, currentHeight, this.anchorX, this.stem[i]);
      currentHeight=this.stem[i];
    }
  }
}




/* ###########################################################################
Custom Functions
############################################################################ */
function generateBamboo() {
  let bambooPlaceNeed = drawingParams.margin+drawingParams.width;
  for(i=10;i<width;i+=bambooPlaceNeed) {
    let obj = new Bamboo(drawingParams.size, 1, i);
    obj.drawStem();
    bamboo.push(obj);
  }
}
function drawBamboo() {
  for(i=0;i<bamboo.length;i++) {
    bamboo[i].drawStem();
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
  angleMode(DEGREES);


  // GUI Management
  if (canvasParams.gui) { 
    let sketchGUI = createGui('Params');
    sketchGUI.addObject(drawingParams);
    //noLoop();
  }

  // Anything else
  fill(255);
  generateBamboo();
}



function draw() {

  /* ----------------------------------------------------------------------- */
  // Provide your Code below.
  background(52,6,20,100);
  drawBamboo();
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



function mouseReleased() {
  bamboo =  [];
  generateBamboo();
  console.log(bamboo);
}



function mouseDragged() {
  //TODO: Samurai sword, when Mouse dragged cut off bamboo on collide
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
  bamboo = [];
  generateBamboo();
  
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

