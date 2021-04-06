$(function () {
    $(".accordion__item-trigger").click(function () {
      //     const parent = $(this).parent();
  
      //     if (parent.hasClass("accordion__item--active")) {
      //       parent.removeClass("accordion__item--active");
      //     } else {
      //       $('.accordion__item').removeClass("accordion__item--active");
      //       parent.addClass("accordion__item--active");
      //     }
  
      $(this).parent().toggleClass("accordion__item--active");
    });
  });
  