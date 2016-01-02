

jQuery(document).ready(function ($) {
  
//fadeIntro();
    
var options = {
      $FillMode: 1,                                     //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
      $ArrowKeyNavigation: false,   			                //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
      $SlideDuration: 800,                              //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
      $DragOrientation: 0,   
      $ArrowNavigatorOptions: {                         //[Optional] Options to specify and enable arrow navigator or not
        $Class: $JssorArrowNavigator$,                  //[Requried] Class to create arrow navigator instance
        $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
        $AutoCenter: 2,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
      }
    };

var jssor_slider1 = new $JssorSlider$("slider1_container", options);

var slideNum = 0;  

$('#prevBut').click(function () {
  prevSlide();
});

$('#nextBut').click(function () {
  nextSlide();
});

$('#beginViz').click(function () {
  fadeIntro();
});

$('#skipIntro').click(function () {
  fadeIntro();
});


  
function prevSlide() {
  
      slideNum--;
      
      if (slideNum === 0) {
        $('#prevBut').addClass('hide');
        $('#abMap').addClass('hide');
        $("#intro-shape").removeClass('slide1').addClass('slide0');
        $("#intro-image").removeClass('slide1').addClass('slide0');
        $("#intro-canvas").removeClass('hide');
      }
      if (slideNum === 1) {
        $('#nextBut').addClass('light');
        $('#prevBut').removeClass('hide');
        $('#abMap').removeClass('stationsMap');
        $("#intro-shape").removeClass('slide2').addClass('slide1');
        $("#intro-image").removeClass('slide2').addClass('trans').addClass('slide1');
      }
      if (slideNum === 2 ) {
        $('#prevBut').removeClass('light');
        $('#prevBut').removeClass('hide');
        $('#abMap').removeClass('hide');
        $("#intro-shape").removeClass('slide3').addClass('slide2');
        $("#intro-image").removeClass('slide3').addClass('slide2');
      }
      if (slideNum === 3) {
        $('#nextBut').removeClass('hide').removeClass('light');
        $('#prevBut').removeClass('hide').addClass('light');
        $("#intro-shape").removeClass('slide4').addClass('slide3');
        $("#intro-image").removeClass('slide4').addClass('slide3');
    }
}  

function nextSlide() {
    
    slideNum++;  //track current slide
    
    if (slideNum === 1) {
      $('#abMap').removeClass('hide');
      $('#prevBut').removeClass('hide');
      $("#intro-shape").removeClass('slide0').addClass('slide1');
      $("#intro-image").removeClass('slide0').addClass('slide1');
      $("#intro-canvas").addClass('hide');
    }
    
    if (slideNum === 2) {
      $('#nextBut').removeClass('light');
      $('#prevBut').removeClass('hide');
      $('#abMap').addClass('stationsMap');
      $("#intro-shape").removeClass('slide1').addClass('slide2');
      $("#intro-image").removeClass('trans').removeClass('slide1').addClass('slide2');
    }
    if (slideNum === 3) {
      $('#abMap').addClass('hide');
      $("#intro-shape").removeClass('slide2').addClass('slide3');
      $("#intro-image").removeClass('slide2').addClass('slide3');
      $('#prevBut').addClass('light');
      $('#nextBut').removeClass('light');
    }
    if (slideNum === 4) {
      $("#intro-shape").removeClass('slide3').addClass('slide4');
      $("#intro-image").removeClass('slide3').addClass('slide4');
      $('#nextBut').addClass('hide');
    }
    
  }

});    



function fadeIntro() {
  $("#intro").fadeOut('slow');
} 
