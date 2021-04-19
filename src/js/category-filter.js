// обработка формы фильтрации категорий товаров

import {swapPendingStatusBtn} from './utils';

const categoryFilterForm = document.querySelector('.js-category-filter-container');
const filterInputClass = 'js-category-filter-btn';
let isSendingData = false;

if (categoryFilterForm) {
  // скрываем кнопку отправки формы, поскольку форма отправляется автоматически при смете категории товара
  // используется сокрытие скриптом, для того чтобы при отключении JS кнопка submit была доступна
  const submitBtn = categoryFilterForm.querySelector('button[type="submit"]');
  submitBtn.className = 'visually-hidden';
  submitBtn.setAttribute('tabindex', '-1');

  // предотвращает переключение кнопки мышью пока не завершится предыдущая отправка данных
  categoryFilterForm.addEventListener('click', (evt) => {
    if (evt.target.closest(`.${filterInputClass}`) && isSendingData) {
      evt.preventDefault();
    }
  });

  // предотвращает переключение кнопки клавиатурой пока не завершится предыдущая отправка данных
  categoryFilterForm.addEventListener('keydown', (evt) => {
    // для радиокнопок смена состояния проводится стрелками
    if (evt.code.includes('Arrow') && isSendingData) {
      evt.preventDefault();
    }
  });

  categoryFilterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(categoryFilterForm);
  });

  categoryFilterForm.addEventListener('change', () => {
    sendData(categoryFilterForm);
  });
}

// отправка данных формы
function sendData(form) {
  // находим выбранную кнопку фильтра
  const activeFilterBtn = categoryFilterForm.querySelector('input[type="radio"]:checked + label');
  // и устанавливаем ей индикацию ожидания получения данных
  swapPendingStatusBtn(activeFilterBtn, {isPending: true});
  // также устанавливае флаг отправки данных
  // для предотвращения повторной отправки до завершения предыдущей
  isSendingData = true;

  // для отправки данных формы
  return fetch('https://httpbin.org/delay/3', {method: 'POST', body: new FormData(form)})
    .then((response) => response.json())
    .then((result) => console.log(result.form))
    .catch((error) => console.log(error.message))
    // в финале убираем статус ожидания отправки данных
    .finally(() => {
      swapPendingStatusBtn(activeFilterBtn, {isPending: false});
      isSendingData = false;
    });
}
