$(document).ready(function () {
  // FUNÇÃO QUE ADICIONA UMA CLASSE AO DESCER O SCROLL
  var $target = $(".appheader-content"),
    animationClass = "eisticky-menu-content-overlay",
    widthClassLogo = "new-logo-width";

  function animeScroll() {
    var documentTop = $(document).scrollTop();
    $target.each(function () {
      if (documentTop <= 100) {
        $(this).removeClass(animationClass);
        $("#logo").removeClass(widthClassLogo);
      } else {
        $(this).addClass(animationClass);
        $("#logo").addClass(widthClassLogo);
      }
    });
  }
  animeScroll();

  $(document).scroll(function () {
    animeScroll();
  });
  // END BLOCO
});
