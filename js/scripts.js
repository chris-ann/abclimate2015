var mapy;
var csvFile;
var lon;
var lat;
var vViz = 0;
var tViz = 1;
var log1 = 0;
var logFilter = [];
var hereLat;
var hereLon;
var ABID;

var COLORS = {'frostdays': red, 'gsl': red, 'warmdays': blue, 'tmean': blue};
var NCOLORS = {'frostdays': blue, 'gsl': green, 'warmdays': red, 'tmean': red};


function fadeLoader() {
  $(".loading").fadeOut('slow');
}

function initialize() {
  var mapOptions = {
    streetViewControl: false
  };
  var layer = "toner";
  mapy = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(55, -117),
    zoom: 5,
    mapTypeId: layer,
    mapTypeControlOptions: {
        mapTypeIds: [layer]
    }
  }, mapOptions);
  
  mapy.mapTypes.set(layer, new google.maps.StamenMapType(layer));

  // Load a GeoJSON from the same server as our demo.
  mapy.data.loadGeoJson('AB_10K-ID.json');
  
  // set initial style
  var baseStyle = {
    fillColor: 'white',
    fillOpacity: 0.0,
    strokeWeight: 0.05,
    strokeColor: '#6a6a6a'
  }
  mapy.data.setStyle(baseStyle);

  mapy.data.addListener('click', function(event) {
    mapy.data.revertStyle();
    hereLat = event.feature.getProperty('Lat');
    hereLon = event.feature.getProperty('Lon') + 0.5;
    
    csvFile = "59.4383,-111.8819.csv";
    //csvFile = "data/" + event.feature.getProperty('csvfile');
    print(csvFile);

    if (tViz === 1) {
        loadTable(csvFile, "header", runHere); 
        //Highlight selected cell
        mapy.data.overrideStyle(event.feature, {strokeWeight: 0.5, strokeColor: '#000000'});
    } 
     else if (vViz === 1){
       loadTable(csvFile, "header", runVariability);
       mapy.setCenter({lat: hereLat, lng: hereLon});
       mapy.setZoom(10);
         //Highlight selected cell
       mapy.data.overrideStyle(event.feature, {strokeWeight: 1, strokeColor: '#000000'});
   }
      
    ABID = event.feature.getProperty('AB_ID');
    
    //For CSV Download
    document.getElementById('exportdoc').href = csvFile;
    $("#exportdoc").addClass("exportShow");
    
    
  });
    
  jQuery('.filter').each(function(e) {
    
    jQuery(jQuery(this)).click(function(z) {
      
      z.preventDefault();
      what=$(this).attr('id');
      mapy.data.setStyle(baseStyle);
      
      if (tViz == 1){
        
        $(".spinner").fadeIn('5000'); // FADE IN THE LOADING ANIMATION
        
        mapy.data.setStyle({});
        jQuery('.filter').each(function() {
          $(this).removeClass('activeBut');
        });
        
        mapy.data.setStyle(function(feature) {
            var activeIndex = feature.getProperty(what);
            //print(activeIndex);
            var fillOp = activeIndex.fillOpacity;
            var posNeg = activeIndex.s;

            if (posNeg === 'p'){
                return {
                    fillOpacity: fillOp,
                    fillColor: COLORS[what],
                    strokeWeight: 0.05
                };
            } else {
                return {
                    fillOpacity: fillOp,
                    fillColor: NCOLORS[what],
                    strokeWeight: 0.05
                };
            }
            
          //return {'fillOpacity': feature.k[what]['fillOpacity'], 'strokeWeight': 0.05, 'fillColor': (feature.k[what]['s'] == 'p' ? COLORS[what] : NCOLORS[what])};
        });
        
        $(".spinner").fadeOut('3000'); // FADE OUT AFTER MAP LOADS... BUT IT ALWAYS FADES OUT BEFORE MAP IS DONE
  
      }
      
      $(this).toggleClass("activeBut");
      
      if (csvFile !== undefined) {
        if(tViz == 1){loadTable(csvFile, "header", runHere);}
        else if (vViz == 1){loadTable(csvFile, runVariability); }
      }
      else { 
        if(tViz == 1){runHere();} 
        else if (vViz == 1){loadTable(csvFile, "header", runVariability); }
      }
      
      
    });
  });
  
  // Set intital clicked item 
  jQuery('#gs').click();
  document.getElementById("gttoggle").checked = true;
  
  
  $("#detail").click(function(){
    
    logFilter[log1] = what;
    log1++;

    print(logFilter[0]);

    if (tViz == 1){
      vViz = 1;
      tViz = 0;
      $(".transformdiv").toggleClass('vActive');
      mapy.panTo({lat: hereLat, lng: hereLon});
      mapy.setZoom(10);
      mapy.data.setStyle({
          fillColor: 'white',
          fillOpacity: 0.0,
          strokeWeight: 0.05,
          strokeColor: '#000000'
        });
      mapy.data.overrideStyle(event.feature, {strokeWeight: 1, strokeColor: '#000000'});
      loadTable(csvFile, "header", runVariability);
    }
  });
  
  $("#summary").click(function(){
    if (vViz == 1 ) {
      vViz = 0;
      tViz = 1;
      $(".transformdiv").toggleClass('vActive');
      $('.filter').removeClass('activeBut');
      jQuery('#' + logFilter[0]).click();
      mapy.panTo({lat: hereLat, lng: hereLon});
      loadTable(csvFile, "header", runHere);
      log1 = 0;
      print(logFilter[0]);
    }
  });
  
  
  $("#goHome").click(function(){
    $(".showPage").removeClass('showPage');
  });
  
}

google.maps.event.addDomListener(window, 'load', initialize);


$(document).ready(function(){
      // change filter selection on input
    $(":input").click(function(event){
      var target = "#" + event.target.value;
      jQuery(target + ' li:first-child a').click();
    });
});

