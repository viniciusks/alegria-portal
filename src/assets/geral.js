$(document).ready(function () {
  // FUNÇÃO QUE ADICIONA UMA CLASSE AO DESCER O SCROLL
  var $target = $(".appheader-content"),
    animationClass = "eisticky-menu-content-overlay";

  function animeScroll() {
    var documentTop = $(document).scrollTop();
    $target.each(function () {
      if (documentTop <= 100) {
        $(this).removeClass(animationClass);
      } else {
        $(this).addClass(animationClass);
      }
    });
  }
  animeScroll();

  $(document).scroll(function () {
    animeScroll();
  });
  // END BLOCO

  $(".my-nav-mobile").on("click", function () {
    $('.appi-ei-mobile_menu_wrap').removeClass("mobile_menu_on");
  });
});
