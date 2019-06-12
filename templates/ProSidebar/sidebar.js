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

  // expand the menu when page is loaded.
  var submenu = $("#sidebar-submenu1");
  submenu.slideUp(200);
  if (submenu.parent().hasClass("active")) {
    submenu.parent().removeClass("active");
    submenu.removeClass("active");
  } else {
    submenu.parent().removeClass("active");
    submenu.slideDown(200);
    submenu.addClass("active");
  }
  /*
  $("#sidebar-submenu1").slideUp(200);
  if ($("#sidebar-dropdown1").hasClass("active")) {
    $("#sidebar-dropdown1").removeClass("active");
    $("#sidebar-submenu1").removeClass("active");
  } else {
    $("#sidebar-dropdown1").removeClass("active");
    $("#sidebar-submenu1").slideDown(200);
    $("#sidebar-submenu1").addClass("active");
}*/

});
