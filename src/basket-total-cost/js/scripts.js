const formatNumber = (x) => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');

const totalPriceWrapper = document.getElementById('total-price');

const setTotalPrice = (value) => {
    totalPriceWrapper.textContent = formatNumber(value);
    totalPriceWrapper.dataset.value = value;
};

const getItemSubTotalPrice = (input) => Number(input.value) * Number(input.dataset.price);

const init = () => {
    let totalPrice = 0;

    [...document.querySelectorAll('.basket__item')].forEach((basketItem) => {
        totalPrice += getItemSubTotalPrice(basketItem.querySelector('.input'));
    });

    setTotalPrice(totalPrice);
};

const calculateSeparateItem = (basketItem, action) => {
    const input = basketItem.querySelector('.input');

    switch (action) {
        case 'plus':
            input.value++;
            setTotalPrice(Number(totalPriceWrapper.dataset.value) + Number(input.dataset.price));
            break;
        case 'minus':
            input.value--;
            setTotalPrice(Number(totalPriceWrapper.dataset.value) - Number(input.dataset.price));
            break;
    }

    basketItem.querySelector('.subtotal').textContent = `${formatNumber(getItemSubTotalPrice(input))} руб.`;
};

document.getElementById('basket').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-plus')) {
        calculateSeparateItem(
            event.target.closest('.basket__item'),
            'plus',
        );
    }

    if (event.target.classList.contains('btn-minus')) {
        const input = event.target.closest('.basket__item').querySelector('.input');

        if (Number(input.value) !== 0) {
            calculateSeparateItem(
                event.target.closest('.basket__item'),
                'minus',
            );
        }
    }
});

init();
