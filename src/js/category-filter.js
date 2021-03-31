// обработка формы фильтрации категорий товаров

import {swapPendingStatusBtn} from './utils';

const categoryFilterForm = document.querySelector('.js-category-filter-container');
const filterInputClass = 'js-category-filter-btn';
const filterInputActiveClass = 'active';
// поскольку для интуитивной возможности переключения кнопок категорий товаров
// в форме используются обычные button[type='button']
// чтобы форма отправлялась обычным образом, значение активной кнопки фильтра категории
// отражается на скрытое поле внутри формы input[type='hidden']
const hiddenInputClass = 'js-category-filter-input';

if (categoryFilterForm) {

  categoryFilterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // находим активную кнопку категории товаров
    const activeFilterInput = categoryFilterForm.querySelector(`.${filterInputClass}.${filterInputActiveClass}`);
    // и устанавливаем ей индикацию ожидания получения данных
    swapPendingStatusBtn(activeFilterInput, {isPending: true});

    getData(evt.target)
      .finally(() => swapPendingStatusBtn(activeFilterInput, {isPending: false}));
  });

  // кнопки переключения фильтра выбора категории товара
  const categoryFilterBtns = categoryFilterForm.querySelectorAll(`.${filterInputClass}`);
  // скрытого поля input[hidden], на который отражается значение выбраной категории в активной кнопке
  // и через который информация передается внуть формы
  const hiddenInput = document.querySelector(`.${hiddenInputClass}`);

  categoryFilterForm.addEventListener('click', (evt) => {
    // обрабатываем только если клик по одной из кнопок смены категории товара
    // и эта кнопка еще не активна
    if (evt.target.closest(`.${filterInputClass}`) && !evt.target.closest(`.${filterInputActiveClass}`)) {
      evt.preventDefault();

      // изменяем стили для кнопок
      // убираем стиль активности со всех кнопок
      categoryFilterBtns.forEach((btn) => {
        btn.classList.remove(filterInputActiveClass);
        btn.removeAttribute('tabindex');
      });
      // устанавливаем стиль активности только для кнопки, по которой был клик
      evt.target.classList.add(filterInputActiveClass);
      // дополнительно устанавливается tabindex = -1 для актвной кнопки
      evt.target.setAttribute('tabindex', '-1');
      // показ визуального эффекта ожидания получения данных на активной кнопке фильтра
      swapPendingStatusBtn(evt.target, {isPending: true});
      // передача значения активной кнопки фильтра в скрытое поле формы
      hiddenInput.value = evt.target.dataset.productId;

      // отправляем данные при клике на кнопку выбора категории товаров
      getData(categoryFilterForm)
      .finally(() => {
        swapPendingStatusBtn(evt.target, {isPending: false});
      });
    }
  });
}

// временная заглушка для отправки данных формы
function getData(form) {
  return fetch('https://httpbin.org/delay/3', {method: 'POST', body: new FormData(form)})
    .then((response) => response.json())
    .then((result) => console.log(result.form))
    .catch((error) => console.log(error.message));
}
