$(function () {
    const wrapper = $('#wrapper');
    const footerHeight = $('#footer').height();
    const documentHeight = $(document).height();
    const contentRightOffset = $('.content__right').offset().top;
    const contentRightInner = $('.content-right-inner');
    const asideFixedTopClassname = 'aside-fixed--top';
    const asideFixedBottomClassname = 'aside-fixed--bottom';

    $(window).scroll(function () {
        const scrolled = $(this).scrollTop();

        if (scrolled > contentRightOffset) {
            wrapper.addClass(asideFixedTopClassname);
        } else if (scrolled < contentRightOffset) {
            wrapper.removeClass(asideFixedTopClassname);
        }

        const bottomFixPoint = documentHeight - (contentRightInner.height() + footerHeight);

        if (scrolled > bottomFixPoint) {
            wrapper.removeClass(asideFixedTopClassname);
            wrapper.addClass(asideFixedBottomClassname);
            contentRightInner.css({
                top: bottomFixPoint - contentRightOffset
            });
        } else if (
            wrapper.hasClass(asideFixedBottomClassname) &&
            scrolled < bottomFixPoint
        ) {
            wrapper.removeClass(asideFixedBottomClassname);
            wrapper.addClass(asideFixedTopClassname);
            contentRightInner.css({ top: 'auto' });
        }
    });
});
