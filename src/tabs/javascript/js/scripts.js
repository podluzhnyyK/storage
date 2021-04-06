// С начальным обнулением
document.querySelectorAll('.tabs__triggers-item').forEach((item) =>
    item.addEventListener('click', function (e) {
        e.preventDefault();

        const id = e.target.getAttribute('href').replace('#', '');
        const targetTabContent = document.getElementById(id);
        const tabs = document.querySelectorAll('.tabs__triggers-item');
        const content = document.querySelectorAll('.tabs__content-item');

        tabs.forEach((child) => child.classList.remove('tabs__triggers-item--active'));
        content.forEach((child) =>
            child.classList.remove('tabs__content-item--active')
        );

        item.classList.add('tabs__triggers-item--active');
        targetTabContent.classList.add('tabs__content-item--active');
    })
);

document.querySelector('.tabs__triggers-item').click();

// С перебором детей
// document.querySelectorAll('.tabs__triggers-item').forEach((item) =>
//     item.addEventListener('click', function (e) {
//         e.preventDefault();

//         const id = e.target.getAttribute('href').replace('#', '');
//         const targetTabContent = document.getElementById(id);

//         const toggleClasses = (parent, currentItem, className) => {
//             Array.from(parent.children).forEach((child) => {
//                 if (child !== currentItem) {
//                     child.classList.remove(className);
//                 } else {
//                     child.classList.add(className);
//                 }
//             });
//         };

//         // Табы
//         toggleClasses(
//             document.querySelector('.tabs__triggers'),
//             item,
//             'tabs__triggers-item--active'
//         );

//         // Контент
//         toggleClasses(
//             document.querySelector('.tabs__content'),
//             targetTabContent,
//             'tabs__content-item--active'
//         );
//     })
// );

// document.querySelector('.tabs__triggers-item').click();
