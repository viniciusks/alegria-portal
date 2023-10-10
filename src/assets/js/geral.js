(function () {
  "use strict";

  var joyScript = {
    init: function () {
      this.Basic.init();
    },

    Basic: {
      init: function () {
        this.EiStickyMenu();
      },
      animeScroll: function () {
        var $target = $(".navbar"),
          animationClass = "eisticky-menu-content-overlay",
          widthClassLogo = "new-logo-width",
          documentTop = $(document).scrollTop();
        $target.each(function () {
          if (documentTop <= 250) {
            $target.removeClass("fixed-top");
          } else {
            $target.addClass("fixed-top");
          }
        });
      },
      EiStickyMenu: function () {
        jQuery(window).on("scroll", function () {
          if (jQuery(window).scrollTop() > 100) {
            jQuery(".main-header-eight").addClass("eisticky-menu-bg-overlay ");
          } else {
            jQuery(".main-header-eight").removeClass(
              "eisticky-menu-bg-overlay "
            );
          }
        });
        $(".navigation-eight a").on("click", function () {
          if (
            location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
          ) {
            var target = $(this.hash);
            if (target.length) {
              $("html, body").animate(
                {
                  scrollTop: target.offset().top - 49,
                },
                1000
              );
              return false;
            }
          }
        });
        $(".appi-ei-open_mobile_menu").on("click", function () {
          $(".appi-ei-mobile_menu_wrap").toggleClass("mobile_menu_on");
        });
        $(".appi-ei-open_mobile_menu").on("click", function () {
          $("body").toggleClass("mobile_menu_overlay_on");
        });
        if ($(".appi-ei-mobile_menu li.dropdown ul").length) {
          $(".appi-ei-mobile_menu li.dropdown").append(
            '<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>'
          );
          $(".appi-ei-mobile_menu li.dropdown .dropdown-btn").on(
            "click",
            function () {
              $(this).prev("ul").slideToggle(500);
            }
          );
        }
      },
    },
  };

  jQuery(document).ready(function () {
    joyScript.init();
    $(document).scroll(function () {
      joyScript.Basic.animeScroll();
    });
  });
})();
