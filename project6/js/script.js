$(document).ready(function(){
  $("#main").owlCarousel({
    items: 1,
    loop:true,
    responsive : {
      0 : {
       dots:false,
       autoplay : true
      },
      480 : {
        dots:false,
        autoplay : true
      },
      720 : {
        dots:true
      },
    }
  });
});

$(document).ready(function(){
  $("#news").owlCarousel({
    items: 3,
    loop:true,
    dots: false,
    nav: true,
    autoplay : true,
    margin: 50,
  });
});

$(document).ready(function(){
  $("#doc").owlCarousel({
    items: 3,
    loop:true,
    dots: true,
    autoplay : true,
    center:true,
    responsive : {
      0 : {
        items: 1 
      },
      480 : {
        items: 2 
      },
      720 : {
        items: 3 
      },
    }
    
  });
});

$(document).ready(function(){
  $("#rev").owlCarousel({
    items: 3,
    loop:true,
    dots: true,
    autoplay : true,
    center:true,
    responsive : {
      0 : {
        items: 1 
      },
      480 : {
        items: 2 
      },
      720 : {
        items: 3 
      },
    }
  });
});



