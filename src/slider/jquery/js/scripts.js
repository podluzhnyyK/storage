$(function () {
    let position = 0;
    const slidesToMove = 2;
    const slidesToShow = 3;
    const container = $('.wrapper');
    const track = $('.track');
    const btnNext = $('.btn-next');
    const btnPrev = $('.btn-prev');
    const itemWidth = container.width() / slidesToShow;
    const itemsCount = $('.item', track).length;
    const movePosition = slidesToMove * itemWidth;

    $('.item').each(function (index, item) {
        $(item).css({ minWidth: itemWidth });
    });

    btnNext.click(function () {
        const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

        position -= itemsLeft >= slidesToMove ? movePosition : itemsLeft * itemWidth;

        setPosition();
    });

    btnPrev.click(function () {
        const itemsLeft = Math.abs(position) / itemWidth;

        position += itemsLeft >= slidesToMove ? movePosition : itemsLeft * itemWidth;

        setPosition();
    });

    const setPosition = () => {
        track.css({
            transform: `translateX(${position}px)`
        });
        checkBtns();
    };

    const checkBtns = () => {
        btnPrev.prop('disabled', position === 0);
        btnNext.prop('disabled', position <= -(itemsCount - slidesToShow) * itemWidth);
    };

    checkBtns();
});
