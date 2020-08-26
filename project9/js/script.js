$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        items:1,
        nav:true,
        dots:true,
        dotsData:true,
    });
  });

  $(document).ready(function(){
	$('.partnes__btn').click(function(){
		$('.partnes__grid_more').slideToggle(300);      
		return false;
	});
});