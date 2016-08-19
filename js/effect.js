$(function () {
  var nav = $(".nav_area");
  var hight_point = $(window).height();
  var fixed = "fixed";

  $(window).scroll(function () {
    if( $(this).scrollTop() > 0 ) {
      nav.addClass(fixed);
    } else {
      nav.removeClass(fixed);
    }
  })

});
