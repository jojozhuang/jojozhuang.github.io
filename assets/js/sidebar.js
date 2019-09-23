jQuery(function ($) {
  $(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if ($(this).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
      $(this).parent().removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this).next(".sidebar-submenu").slideDown(200);
      $(this).parent().addClass("active");
    }
  });

  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });
});

$(document).ready(function(){
  $("#show-sidebar").on("mouseover",function(event){
    $(".page-wrapper").addClass("toggled");
  });
  $(".page-content").on("mouseover",function(event){
    $(".page-wrapper").removeClass("toggled");
  });
});
