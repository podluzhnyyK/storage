[...document.querySelectorAll('.rating__item')].forEach(item =>
    item.addEventListener('click', () => {
        item.parentNode.dataset.totalValue = item.dataset.itemValue;
    })
);
