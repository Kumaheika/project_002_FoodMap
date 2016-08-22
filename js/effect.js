$(function () {
  var $body = $('body');
  var nav = $(".nav_area");
  var hight_point = $(window).height();
  var fixed = "fixed";
  var $navBTN = $(".navBTN"); // Nav選單

  //主選單變化控制
  $(window).scroll(function () {
    //獲取現在螢幕scrolltop
    var scrollVal = $(this).scrollTop();
    console.log(scrollVal);

    if( $(this).scrollTop() > 0 ) {
      nav.addClass(fixed);
    } else {
      nav.removeClass(fixed);
    }
  })

  //錨點移動
  // var $tab01 = $('div.tab01').offset().top;
  // $('#gotab01').click(function(e) {
  //   e.preventDefault();
  //   var $body = $('body');
  //   $body.animate({
  //     scrollTop: $('div.tab01').offset().top
  //   }, 500, "swing");
  //   return false;
  // });

  //主選單按鈕
  $navBTN.on("click", function (e) {
    var $target = $(this).attr("data-target");
    var $scrollTop = $($target).offset().top;
    e.preventDefault();
    anmation_Swing ($scrollTop);
  });
  //animate function
  function anmation_Swing (where) {
    $body.animate({
      scrollTop: where
    }, 500, "swing");
  }

});
