var ABID;
var vizCanvas;
var varViz;
var mapViz;
var varDiv;
var varDivNode;

//-----Column Names----//
var tmeanCol = "01TMEAN"; var tmeanTCol = "01TMEAN Trendline";
var twinterCol = "02TWinter" ; var twinterTCol = "02TWinter Trendline";
var tspringCol = "03TSpring" ; var tspringTCol = "03TSpring Trendline" ;
var tsummerCol = "04TSummer"; var tsummerTCol = "04TSummer Trendline";
var tfallCol = "05TFall"; var tfallTCol = "05TFall Trendline";
var trangeCol = "06TRange" ; var trangeTCol = "06TRange Trendline" ;
var frostdaysCol = "21FrostDays"; var frostdaysTCol = "21FrostDays Trendline";

var frostlastCol = "22FrostLast"; var frostlastTCol = "22FrostLast Trendline";
var frostfirstCol = "23FrostFirst"  ; var frostfirstTCol = "23FrostFirst Trendline"  ;
var icedaysCol = "24IceDays" ; var icedaysTCol = "24IceDays Trendline" ;
var tmin10Col = "25Tmin10"  ; var tmin10TCol = "25Tmin10 Trendline" ;
var tmin20Col = "26Tmin20"  ; var tmin20TCol = "26Tmin20 Trendline" ;
var coldnightsCol = "27ColdNights"  ; var coldnightsTCol = "27ColdNights Trendline"  ;
var colddaysCol = "28ColdDays"  ; var colddaysTCol = "28ColdDays Trendline"  ;
var ColdspellCol = "29ColdSpell" ;var ColdspellTCol = "29ColdSpell Trendline" ;
var heatingddCol = "30HeatingDD" ; var heatingddTCol = "30HeatingDD Trendline" ;
var tmax90Col = "40Tmax90"  ; var tmax90TCol = "40Tmax90 Trendline"  ;

var warmDaysCol = "40Tmax90"; var warmDaysTCol = "40Tmax90 Trendline";
var summerdaysCol = "41SummerDays"  ; var summerdaysTCol = "41SummerDays Trendline"  ;
var tmax30Col = "42Tmax30"  ; var tmax30TCol = "42Tmax30 Trendline"  ;
var hwdiCol = "43HWDI"  ; var hwdiTCol = "43HWDI Trendline"  ;
var tropnightCol = "44TropNight" ; var tropnightTCol = "44TropNight Trendline" ;
var tmin90Col = "45Tmin90"  ; var tmin90TCol = "45Tmin90 Trendline"  ;
var frostfreeCol = "46FrostFree" ; var frostfreeTCol = "46FrostFree Trendline" ;
var coolingddCol = "47CoolingDD" ; var coolingddTCol = "47CoolingDD Trendline" ;

var gslCol = "61GSL"; var gslTCol = "61GSL Trendline";
var gslbeginCol = "62GSLBegin"  ; var gslbeginTCol = "62GSLBegin Trendline"  ;
var gslendCol = "63GSLEnd" ; var gslendTCol = "63GSLEnd Trendline" ;
var gdd0Col = "64GDD0"  ; var gdd0TCol = "64GDD0 Trendline"  ;
var gdd5Col = "65GDD5"  ; var gdd5TCol = "65GDD5 Trendline"  ;
var gdd10Col = "66GDD10" ; var gdd10TCol = "66GDD10 Trendline" ;

var pannualCol = "81PAnnual" ; var pannualTCol = "81PAnnual Trendline" ;
var pwinterCol = "82PWinter" ; var pwinterTCol = "82PWinter Trendline" ;
var pspringCol = "83PSpring" ; var pspringTCol = "83PSpring Trendline" ;
var psummerCol = "84PSummer" ; var psummerTCol = "84PSummer Trendline" ;
var pfallCol = "85PFall" ; var pfallTCol = "85PFall Trendline" ;
var pge2Col = "86Pge2"  ; var pge2TCol = "86Pge2 Trendline"  ;
var pge10Col = "87Pge10" ; var pge10TCol = "87Pge10 Trendline" ;
var pge20Col = "88Pge20" ; var pge20TCol = "88Pge20 Trendline" ;
var p3daysCol = "89P3days"  ; var p3daysTCol = "89P3days Trendline"  ;
var p5daysCol = "90P5days"  ; var p5daysTCol = "90P5days Trendline"  ;
var sdpiCol = "91SDPI"  ; var sdpiTCol = "91SDPI Trendline"  ;
var pge95Col = "92Pge95" ; var pge95TCol = "92Pge95 Trendline" ;
var dryperiodCol = "93DryPeriod" ; var dryperiodTCol = "93DryPeriod Trendline" ;
var pdays1Col = "94PDays1"  ; var pdays1TCol = "94PDays1 Trendline"  ;

var firstRow = 6;
var lastRow = 66;

var xScale;
var yscale;

var vizWidth;
var vizHeight;

//----- LAYOUT POSITIONS------//
var xHalf;
var yHalf;
var  x1 = 50; // MARGINS
var x2;

//---- DATA VARIABLES---//
var yearPos;
var idxVar;

//-----SCALE OF COROPLETH MAP----//
var gradientScale = 50;

//---FONTS----//
var fsm = 10;
var fmed = 13;
var flg = 16;
var fxlg = 23;
var sans = "Arial";
var serif = "Georgia";

var green = '#00c45e';
var blue = '#0597f0';
var yellow = '#fff30d';
var red = 'fa4443';
var white;
var black;
var grey;

function setup() {
  
  //--- INITIAL SIZING---//
  vizWidth = 300;
  vizHeight = windowHeight;
  
  vizCanvas = createCanvas(vizWidth, vizHeight);
  vizCanvas.parent('vizContainer');
  
  //--------/colors/------//
  blue = color(255, 243, 13);
  red = color(0, 196, 94);
  green = color(250, 68, 67);
  yellow = color(5, 151, 240);
  white =  color(255, 255, 255);
  black = color(0, 0, 0);
  grey = 150;
}

function windowResized() {
  vizHeight = windowHeight;
  resizeCanvas(vizWidth, vizHeight);
  if(tViz == 1){
  loadTable(csvFile, "header", runHere);
  }
  if (vViz ==1){
  loadTable(csvFile, "header", runVariability); 
  }
}

//Detail View for Variability & Trends

function runVariability(here) {
  
  varViz = true;
  mapViz = false;
  
  removeElements();
  
  background(255);
  
  vizHeight = windowHeight - 90; // leave room for footer and header
  vizWidth = windowWidth*0.70;
  resizeCanvas(vizWidth, vizHeight);
  
  xScale = (vizWidth - (x1*2))/61; //50 px padding on left and right
  yScale = (vizHeight - 80)/-365; //padding 40px on bottom and top, -365 to move into negative
  
  //--Move the origin to the bottom --- //
  push();
  translate(x1, vizHeight - 30); // 50px padding on left, 40px padding on top
  
  
  //DISPLAY LOCATION INFORMATION
  loadJSON("here_info.json", displayInfo);

  //AXIS
  stroke(grey);
  line(0, 0, 60*xScale, 0);
  line(0, 365*yScale, 60*xScale, 365*yScale);
  noStroke();
  text("0 days", 61*xScale, 2);
  text("365 days", 61*xScale, 365*yScale + 2);
  
  // DRAW VARIABILITY LINES//
  if ($("#mt").hasClass("activeBut") === true) {
  variability(mtCol, mtTCol, blue, "Mean Temperature");
  }
  if ($("#fd").hasClass("activeBut") === true) {
  variability( fdCol, fdTCol, blue, "Mean Temperature");
  }
  if ($("#warmDays").hasClass("activeBut") === true) {
  variability(warmDays, warmDaysTCol, red, "Mean Temperature");
  }
  if ($("#gs").hasClass("activeBut") === true) {
  variability(gsCol, gsTCol, green, "Mean Temperature");
  }
  
  function variability(inputVarCol, inputTrendCol, idxColor, idxText) {
  noStroke();
  
  //--Variability points---//
  var rowCount = here.getRowCount();
  var varCol = here.getColumn(inputVarCol); // Variability Column
  var yearCol = here.getColumn(0); // Year Column
  idxVar; //Variable Values
  var nextIdx; //Variable Values
  var trend1; //1950 trend value
  var trend2; //2010 trend value
  yearPos; //Will be position of the year
  var year; // Actual value of the year
  var nextYear; // year after for connecting lines

  
  for (var row = firstRow; row < rowCount-1; row++) {
    
    year = yearCol[row];
    yearPos = (row-firstRow)*xScale;
    nextYear = (row-firstRow+1)*xScale;
    
    if (inputTrendCol == 32) {
      idxVar = (365-varCol[row])*yScale; // multiply by -1 to appear above the new origin
      nextIdx = (365-varCol[row+1])*yScale;}
    else {
      idxVar = varCol[row]*yScale; // multiply by -1 to appear above the new origin
      nextIdx = varCol[row+1]*yScale;}
    
    //--DRAW VARIABILITY POINTS--//
    fill(idxColor);
    ellipse(yearPos, idxVar, 5, 5);
    
    //--- Variability Conecting Lines----//
    if (row < rowCount-2) {
      stroke(idxColor, 100);
      line(yearPos, idxVar, nextYear, nextIdx);
      noStroke();
    }
    
    // varDivNode = createDiv(" ");
    // varDivNode.parent(vizContainer);
    // //varDivNode.style("background-color", 'black');
    // varDivNode.position(yearPos + (x1 * 2) + 5, vizHeight - (idxVar * -1) + 5);
    // varDivNode.size(8, 8);
    // varDivNode.id("year");

    // varDiv = createDiv("<strong>" + round(idxVar/yScale) + "</strong> " + idxText + " in " + year);
    // varDiv.parent(vizContainer);
    // varDiv.style("color", "black");
    // varDiv.style("background-color", "white");
    // varDiv.style("font-size", "11px");
    // varDiv.style("padding", "2px");
    // varDiv.position(yearPos + (x1 * 2), vizHeight - (idxVar * -1) - 10);
    // //varDiv.size(140, 20);
    // varDiv.class('divText');
    // varDiv.class('text' + year);
    
  }
  

  //--- Trend line----//
  var trendCol = here.getColumn(inputTrendCol); //Trend column
  
  if (inputTrendCol == 32) {
  trend1 = 365-trendCol[firstRow];
  trend2 = 365-trendCol[lastRow];
  }
  else {
  trend1 = trendCol[firstRow];
  trend2 = trendCol[lastRow];
  }
  stroke(idxColor);
  line(0, trend1*yScale, yearPos, trend2*yScale);
  
  //DISPLAY TREND VALUES
  noStroke();
  fill(idxColor);
  textFont(sans);
  textSize(flg);
  textAlign(RIGHT);
  textStyle(BOLD);
  text(round(trend1), -5, trend1*yScale + 5);
  textAlign(LEFT);
  text(round(trend2), yearPos + 5, trend2*yScale + 5);
  textSize(fmed);
  textStyle(NORMAL);
  textAlign(RIGHT);
  text(yearCol[firstRow], -5, trend1*yScale + 18);
  textAlign(LEFT);
  text(yearCol[lastRow], yearPos + 5, trend2*yScale + 18);
  
  }

  pop();
  
}


function runHere(here) {

  vizHeight = windowHeight - 50; // -50 for footer on bottom
  vizWidth = 300;
  resizeCanvas(vizWidth, vizHeight);
  
  
  varViz = false;
  mapViz = true;
  
  //VERTICAL POSITIONS BASED ON TOTAL WINDOW HEIGHT
  yHalf = vizHeight/2;
  yThird = vizHeight/2.7;
  
  //SCALE DATA TO FIT CANVAS//
  xScale = vizWidth/61;
  yscale = vizHeight/365 * -0.21;
  
  //SPECIFY MARGINS & MIDDLE POSITIONS
  x2 = vizWidth - x1;
  xHalf = vizWidth/2;
  
  background(255);
  noStroke();
  
  if (what == 'mt'){
  trendViz(mtTCol, blue, red, "MEAN TEMPERATURE");
  }
  else if(what == 'fd'){
  trendViz(fdTCol, red, blue, "FROST DAYS");
  }
  else if (what == 'warmDays'){
  trendViz(warmDaysTCol, blue, red, "FULL DAYS BELOW 0\xB0C");
  }
  else if (what == 'gs'){
  trendViz(gsTCol, red, green, "GROWING SEASON DAYS");
  }
  
  // CLASS FOR EACH TREND
  function trendViz(inputTrendCol, idxColor, idxColorOp, idxText) {
    
    // MESSAGE UNTIL FIRST LOCATION IS CHOSEN
    if (here === undefined) {
      var preText = "Click on the map to display the data for each location.";
      textFont(sans);
      textSize(flg);
      textAlign(CENTER);
      textStyle(NORMAL);
      textLeading(30);
      fill(grey);
      text(preText, xHalf, yHalf-100, 240, 100);
    }
    else {
    
    //--------TREND VISUALIZATION----------//
    
    push();
    //MOVE ORIGIN TO BOTTOM (WILL MULTIPLY VALUES BY -1 TO DISPLAY ABOVE)
    translate(0, yThird);
    
    
    
    //SET VIZ TITLE
    var title = "Trend for the # of " + idxText + " per year:";
    
    //DISPLAY VIZ TITLE
    textFont(sans);
    textStyle(NORMAL);
    textSize(fmed);
    textAlign(LEFT);
    fill(grey);
    textLeading(20);
    text(title, x1, 365*yscale - 60, 220, 60);
    
    //DISPLAY AXIS
    fill(245);
    rect(x1, 365*yscale, x2 - x1, -365*yscale);
    fill(grey);
    textSize(fsm);
    textAlign(LEFT);
    textStyle(NORMAL);
    text("0 days", x2+1, 5);
    text("365 days", x2+1, 365*yscale + 5);
    stroke(grey);
    strokeWeight(0.5);
    line(x1,0,x2,0);
    line(x1,365*yscale,x2,365*yscale);
    
    //LOAD YEAR ARRAY
    var yearCol = here.getColumn(0);
    
    //SPECIFY COLUMN FOR SELECTED INDEX 
    var trendCol = here.getColumn(inputTrendCol);
    
    //SELECT FIRST (1950) AND LAST (2010) TREND VALUES
    if (inputTrendCol == 32) {
    trend1 = 365 - trendCol[firstRow]; 
    trend2 = 365 - trendCol[lastRow];  
    }
    else {
    trend1 = trendCol[firstRow]; 
    trend2 = trendCol[lastRow];
    }
    
    //print("first row = " + trend1);
    //print("last row = " + trend2);
    
    //DISPLAY TREND LINE
    stroke(0);
    strokeWeight(1.5);
    line(x1,trend1*yscale,x2,trend2*yscale);
    
    //DISPLAY TREND VALUES
    noStroke();
    fill(white);
    rect(x2, trend2*yscale - 20, 40, 35);
    fill(black);
    textFont(sans);
    textSize(flg);
    textAlign(RIGHT);
    textStyle(BOLD);
    text(round(trend1), x1 - 5, trend1*yscale - 1);
    textAlign(LEFT);
    text(round(trend2), x2 + 5, trend2*yscale - 1);
    textSize(fmed);
    textStyle(NORMAL);
    textAlign(RIGHT);
    text(yearCol[firstRow], x1 - 5, round(trend1*yscale)+12);
    textAlign(LEFT);
    text(yearCol[lastRow], x2 + 5, round(trend2*yscale)+12);
    
    //DISPLAY LOCATION INFORMATION
    loadJSON("here_info.json", displayInfo);
        
    pop();
    
    //------- DIFFERENCE VISUALIZATION --------- //
    
    push();
    translate(0, yHalf+30);
    
    //DISPLAY DIFFERENCE VISUALIZATION TITLE
    var diffText = "Trend difference from 1950 - 2010:";
    textFont(sans);
    textStyle(NORMAL);
    textSize(fmed);
    textAlign(LEFT);
    fill(grey);
    textLeading(20);
    text(diffText, x1, -80, 220, 60);
    
    //FIND THE DIFFERENCE BETWEEN THE TWO TREND VALUES
    var diff = round(trend2) - round(trend1);
    
    //GRADIENT DISPLAY
    var changeScale = ((vizWidth-(x1*2))/2)/gradientScale;
    var pos = abs(diff*changeScale);
    
    //DISPLAY NUMBER FOR AMOUNT OF CHANGE ABOVE SCALE
    textFont(sans);
    textSize(fxlg);
    textStyle(BOLD);
    textAlign(CENTER);
    stroke(0);
    fill(0);
    var morefewer; //for display summary of change below
    
    if (diff <= 0) {
        text(diff, xHalf-pos, -20);
        line(xHalf-pos-10, -15, xHalf-pos, -5);
        line(xHalf-pos, -5, xHalf-pos+10, -15);
        morefewer = " FEWER ";
      }
    else {
      text("+" + diff, xHalf+pos-5, -20);
      line(xHalf+pos-10, -15, xHalf+pos, -5);
      line(xHalf+pos, -5, xHalf+pos+10, -15);
      morefewer = " MORE ";
    }
    
    setGradient(x1, 0, xHalf - x1, 15, idxColorOp, white);
    setGradient(xHalf, 0, xHalf - x1, 15, white, idxColor);
    
    // GRADIENT LABELS 0 - 50
      for (var i = -50; i <= 50; i = i + 25) {
        var xMark = (i*changeScale)+xHalf;
        stroke(grey);
        line(xMark, 20, xMark, 25);
        fill(grey);
        noStroke();
        textAlign(CENTER);
        textStyle(NORMAL);
        textSize(fsm);
        text(i, xMark, 35);
      }
      
    // SUMMARY OF CHANGE TEXT
    var changeText;
    if (diff === 0) {
    changeText = "THE TREND INDICATES NO CHANGE IN " + idxText + " SINCE 1950.";  
    }
    else {
    changeText = "THE TREND INDICATES "  + abs(diff) + morefewer + idxText + " SINCE 1950.";
    }
    textAlign(LEFT);
    textSize(flg);
    fill(grey);
    textLeading(24);
    textStyle(BOLD);
    text (changeText, x1, yThird/3.3, 220, 110);
    
    pop();
    
    }
  }
  
}

function displayInfo(hereInfo) {
  
  for (var h = 0; h < hereInfo.length; h++) {
    var infoABID = hereInfo[h].AB_ID;
    
    if(infoABID == ABID){
      textFont(sans);
      textAlign(LEFT);
      fill(black);
      textSize(fsm);
      textStyle(NORMAL);
      text("AT: ", x1, 28);
      textStyle(BOLD);
      textSize(flg);
      text(hereInfo[h].Lat + ", " + hereInfo[h].Lon, x1 + 20, 28);
      //textSize(fmed);
      //textStyle(NORMAL);
      //text(hereInfo[h].Elev + "m above sea level", 0, 25);
      //text(hereInfo[h].NRNAME + " Natural Region", 0, 45);
      //text(hereInfo[h].NSRNAME + " Subregion", 0, 65);
    }
  }
}


function setGradient(x, y, w, h, c1, c2) {
  noFill();

  for (var i = x; i <= x+w; i++) {
    var inter = map(i, x, x+w, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(i, y, i, y+h);
  }
}




