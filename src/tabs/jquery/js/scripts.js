$(function () {
    $('.tabs__triggers-item').click(function (e) {
        e.preventDefault();

        // Вариант 1
        $('.tabs__triggers-item').removeClass('tabs__triggers-item--active');
        $('.tabs__content-item').removeClass('tabs__content-item--active');

        $(this).addClass('tabs__triggers-item--active');
        $($(this).attr('href')).addClass('tabs__content-item--active');

        // Вариант 2
        // $(this)
        //     .addClass('tabs__triggers-item--active')
        //     .siblings()
        //     .removeClass('tabs__triggers-item--active');

        // $($(this).attr('href'))
        //     .addClass('tabs__content-item--active')
        //     .siblings()
        //     .removeClass('tabs__content-item--active');
    });

    $('.tabs__triggers-item:first').click();
});
