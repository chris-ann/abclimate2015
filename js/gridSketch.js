
var gridCells = [];
var idxColors = [];
var cols;
var rows;
var t = 0;
var gridNode;
var flip;
var count;
var unit;
var fade = 10;
var gsTrans = [];
var gsColors = [];
var hwTrans = [];
var hwColors = [];
var xg25Trans = [];
var xg25Colors = [];
var fdTrans = [];
var fdColors = [];
var xl0Trans = [];
var xl0Colors = [];
var ml25Trans = [];
var ml25Colors = [];

function setup() {
  
  gridCanvas = createCanvas(1000, 700);
  gridCanvas.parent('intro-canvas');

  var ratio = windowWidth/windowHeight;
  print(ratio);
  
  rows = floor(sqrt(6834/ratio));  
  cols = floor(6834/rows);
  
  noStroke();
  colorMode(RGB, 255);
  
  loadJSON("AB_10K-ID.json", grid);
  
  count = cols * rows;
  print('COUNT: ' + count);
  
  unit = windowWidth/cols; //size of grid
  //print('UNIT: ' + unit);
  
  var index = 0;
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      gridCells[index++] = new Cell(x*unit, y*unit);
    }
  }
}

function grid(jsonFile) {

  for (var j = 0; j < jsonFile.features.length; j++) {
    
    gsTrans[j] = jsonFile.features[j].properties.gs.fillOpacity;
    if (jsonFile.features[j].properties.gs.s === 'p') {gsColors[j] = color(140, 138, 133, gsTrans[j]*255);}
    else {gsColors[j] = color(105, 189, 127, gsTrans[j]*255);}
    
    hwTrans[j] = jsonFile.features[j].properties.hw.fillOpacity;
    if (jsonFile.features[j].properties.hw.s === 'p') {hwColors[j] = color(251, 153, 86, hwTrans[j]*255);}
    else {hwColors[j] = color(74, 169, 210, hwTrans[j]*255);  }
    
    xg25Trans[j] = jsonFile.features[j].properties.xg25.fillOpacity;
    if (jsonFile.features[j].properties.xg25.s === 'p') {xg25Colors[j] = color(218, 74, 78, xg25Trans[j]*255);}
    else {xg25Colors[j] = color(79, 157, 172, xg25Trans[j]*255); }
    
    fdTrans[j] = jsonFile.features[j].properties.fd.fillOpacity;
    if (jsonFile.features[j].properties.fd.s === 'p') {fdColors[j] = color(116, 201, 255, fdTrans[j]*255);}
    else {fdColors[j] = color(217, 174, 114, fdTrans[j]*255); }
    
    xl0Trans[j] = jsonFile.features[j].properties.xl0.fillOpacity;
    if (jsonFile.features[j].properties.xl0.s === 'p') {xl0Colors[j] = color(57, 134, 232, xl0Trans[j]*255);}
    else {xl0Colors[j] = color(206, 142, 82, xl0Trans[j]*255); }
    
    ml25Trans[j] = jsonFile.features[j].properties.ml25.fillOpacity;
    if (jsonFile.features[j].properties.ml25.s === 'n') {ml25Colors[j] = color(18, 83, 175, ml25Trans[j]*255);}
    else {ml25Colors[j] = color(182, 116, 51, ml25Trans[j]*255); }
  }
}

  
function Cell(_xOff, _yOff) {
  this.xOff = _xOff;
  this.yOff = _yOff;
}

Cell.prototype.update = function() {
  for (var i = 0; i < count; i++) {
    fill(idxColors[this.flip]);
  }
};

Cell.prototype.draw = function() {
  rect(this.xOff, this.yOff, unit, unit);
};

function draw() {
  //background(255);
  frameRate(1);
  if (t === 0) {
    for (var g = 0; g < count; g = g + 2) {
      fill(255);
      gridCells[g].draw();
      flip = floor(random(6));
      idxColors = [gsColors[g], hwColors[g], xg25Colors[g], fdColors[g], xl0Colors[g], ml25Colors[g]];
      fill(idxColors[flip]);
      gridCells[g].draw();
    }
    t++;
  }
  else {
    for (var gg = 1; gg < count; gg = gg + 2) {
      fill(255);
      gridCells[gg].draw();
      flip = floor(random(6));
      idxColors = [gsColors[gg], hwColors[gg], xg25Colors[gg], fdColors[gg], xl0Colors[gg], ml25Colors[gg]];
      fill(idxColors[flip]);
      gridCells[gg].draw();
    }
     t--;
  }
  //print('randraw');
}

