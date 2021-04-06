const KEY_CODE = {
    UNKNOWN: 0,
    SPACEBAR: 32,
    ENTER: 13,
    DOWN_ARROW: 40,
    UP_ARROW: 38,
    ESCAPE: 27,
    TAB: 9,
};

[...document.querySelectorAll('.select')].forEach((select) => {
    const trigger = select.querySelector('.select-trigger');
    const list = select.querySelector('.select-list');
    const listItems = [...list.querySelectorAll('.select-list__item')];
    const listItemsValues = [];
    let valuesArray = JSON.parse(select.dataset.values);

    listItems.forEach(item => listItemsValues.push(item.dataset.value));

    // Переключение фокуса по линиям
    const focusNextListItem = (direction) => {
        const focusedElementIndex = listItemsValues.indexOf(document.activeElement.dataset.value);
        let value = null;

        switch (direction) {
            case KEY_CODE.DOWN_ARROW:
                const notLastItem = focusedElementIndex < listItemsValues.length - 1;

                if (notLastItem) {
                    value = listItemsValues[focusedElementIndex + 1];
                }
                break;
            case KEY_CODE.UP_ARROW:
                const notFirstItem = focusedElementIndex > 0;

                if (notFirstItem) {
                    value = listItemsValues[focusedElementIndex - 1];
                }
                break;
        }

        if (value) {
            list.querySelector(`.select-list__item[data-value="${value}"]`).focus();
        }
    }

    const toggleList = () => {
        select.classList.toggle('select--active')

        const selectIsActive = select.classList.contains("select--active");

        list.setAttribute('aria-expanded', selectIsActive);
        trigger.setAttribute('aria-pressed', selectIsActive);
    };
    const hideList = () => {
        select.classList.remove('select--active')
        list.setAttribute('aria-expanded', false);
        trigger.setAttribute('aria-pressed', false);
    };

    const updateState = () => {
        // Активность в триггере
        trigger.innerHTML = '';

        if (valuesArray.length) {
            const renderBadge = (value) => (
                `<div class='select-trigger__badge' data-value=${value}>${value} <span>&times;</span></div>`
            );

            valuesArray.forEach((value) => {
                trigger.innerHTML += renderBadge(value);
            });
        } else {
            trigger.innerHTML = '<div class="select-trigger__empty">Выберите значение</div>';
        }

        // Активность в листе
        listItems.forEach((item) => item.classList.toggle("select-list__item--selected", valuesArray.includes(item.dataset.value)));
    };

    const toggleValue = (itemValue) => {
        if (valuesArray.includes(itemValue)) {
            valuesArray = valuesArray.filter((item) => item !== itemValue);
        } else {
            valuesArray.push(itemValue);
        }

        select.dataset.values = JSON.stringify(valuesArray);

        updateState();
    };

    // Клик на переключатель
    const triggerEvent = (event) => {
        if (event.type === 'click') {
            if (event.target.parentNode.classList.contains('select-trigger__badge')) {
                toggleValue(event.target.parentNode.dataset.value);
            } else {
                toggleList();
            }
        }

        if (event.type === 'keydown') {
            switch (event.keyCode) {
                case KEY_CODE.UNKNOWN:
                case KEY_CODE.SPACEBAR:
                case KEY_CODE.ENTER:
                    toggleList();
                    break;
                case KEY_CODE.DOWN_ARROW:
                    focusNextListItem(KEY_CODE.DOWN_ARROW);
                    break;
                case KEY_CODE.UP_ARROW:
                    focusNextListItem(KEY_CODE.UP_ARROW);
                    break;
                case KEY_CODE.ESCAPE:
                case KEY_CODE.TAB:
                    hideList();
                    break;
                default:
            }
        }
    }

    trigger.addEventListener('click', triggerEvent);
    trigger.addEventListener('keydown', triggerEvent);

    // Клик на элемент списка
    const listEvent = (event) => {
        const { value } = event.target.closest('.select-list__item').dataset;

        if (event.type === 'click') {
            toggleValue(value);
        }

        if (event.type === 'keydown') {
            switch (event.keyCode) {
                case KEY_CODE.UNKNOWN:
                case KEY_CODE.SPACEBAR:
                case KEY_CODE.ENTER:
                    toggleValue(value);
                    break;
                case KEY_CODE.DOWN_ARROW:
                    focusNextListItem(KEY_CODE.DOWN_ARROW);
                    break;
                case KEY_CODE.UP_ARROW:
                    focusNextListItem(KEY_CODE.UP_ARROW);
                    break;
                case KEY_CODE.ESCAPE:
                    hideList();
                    break;
                default:
            }
        }
    }

    list.addEventListener('click', listEvent);
    list.addEventListener('keydown', listEvent);

    // Клик вне списка
    document.addEventListener('mouseup', (event) => {
        if (!select.contains(event.target)) {
            hideList();
        }
    });
});
