const CURRENCY_CODE = {
    USD: 'USD',
    EUR: 'EUR',
    RUB: 'RUB',
};

const renderContent = (response) => {
    const { data } = response;
    let content = document.getElementById('data').innerHTML;

    Object
        .keys(data.rates)
        .map((rate) => {
            content += `
                <tr>
                    <td>${data.base}</td>
                    <td>${data.rates[rate].toFixed(2)}</td>
                </tr>
            `;
        });

    document.getElementById('data').innerHTML = content;
};

const getToday = () => {
    const date = new Date();

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

Promise
    .all([
        axios.get(`https://api.ratesapi.io/api/${getToday()}?base=${CURRENCY_CODE.USD}&symbols=${CURRENCY_CODE.RUB}`),
        axios.get(`https://api.ratesapi.io/api/${getToday()}?base=${CURRENCY_CODE.EUR}&symbols=${CURRENCY_CODE.RUB}`),
    ])
    .then(values => values.forEach(renderContent));


// =========

const getOptionsList = () => Object
    .keys(CURRENCY_CODE)
    .map((code) => `<option value=${CURRENCY_CODE[code]}>${CURRENCY_CODE[code]}</option>`)
    .join();

const calculate = (currencyfrom, currencyTo) => new Promise((resolve) => {
    resolve(axios.get(`https://api.ratesapi.io/api/${getToday()}?base=${currencyfrom}&symbols=${currencyTo}`));
});

const inputFrom = document.getElementById('input-from');
const inputTo = document.getElementById('input-to');
const selectFrom = document.getElementById('select-from');
const selectTo = document.getElementById('select-to');

selectFrom.innerHTML = getOptionsList();
selectTo.innerHTML = getOptionsList();

document.getElementById('currency-exchange').addEventListener('change', (event) => {
    switch (event.target.id) {
        case 'select-from':
        case 'select-to':
            calculate(selectFrom.value, selectTo.value).then((value) => {
                inputTo.value = value.data.rates[selectTo.value] * inputFrom.value;
            });

            break;
        case 'input-from':
            calculate(selectFrom.value, selectTo.value).then((value) => {
                inputTo.value = value.data.rates[selectTo.value] * event.target.value;
            });

            break;
        case 'input-to':
            calculate(selectTo.value, selectFrom.value).then((value) => {
                inputFrom.value = value.data.rates[selectFrom.value] * event.target.value;
            });

            break;
    }

    console.log(event.target.id);
});
