$(function () {
    const nav = $('#nav');
    const wrapper = $('#wrapper');
    const header = $('#header');
    const navOffset = nav.offset().top;
    const navHeight = nav.height();

    $(window).scroll(function () {
        const scrolled = $(this).scrollTop();

        if (scrolled > navOffset) {
            wrapper.addClass('nav-fixed');
            header.css({ marginBottom: navHeight });
        } else if (scrolled < navOffset) {
            wrapper.removeClass('nav-fixed');
            header.css({ marginBottom: 0 });
        }
    });
});
