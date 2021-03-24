import {swapPendingStatusBtn} from './utils';

// обработка переключения кнопок в фильтре категорий товаров на главной странце
const btnClass = 'js-category-filter-btn';
const activeClass = 'active';
const submitBtn = document.querySelector('.js-category-submit-btn');

const categoryFilterForm = document.querySelector('.js-category-filter-container');
if (categoryFilterForm) {

  categoryFilterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    getData(evt.target);
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', (evt) => {
      evt.preventDefault();

      swapPendingStatusBtn(submitBtn, {isPending: true});

      getData(categoryFilterForm)
        .then(() => {
          swapPendingStatusBtn(submitBtn, {isPending: false});
        });
    });
  }
  // кнопки переключения фильтра выбора категории товара
  const categoryFilterBtns = categoryFilterForm.querySelectorAll(`.${btnClass}`);
  // скрытого поля input[hidden], на который отражается значение выбраной категории в активной кнопке
  // и через который информация передается внуть формы
  const hiddenInput = document.querySelector('.js-category-filter-input');

  categoryFilterForm.addEventListener('click', (evt) => {
    // обрабатываем только если клик по одной из кнопок смены категории товара
    // и эта кнопка еще не активна
    if (evt.target.closest(`.${btnClass}`) && !evt.target.closest(`.${activeClass}`)) {
      evt.preventDefault();

      // изменяем стили для кнопок
      // убираем стиль активности со всех кнопок
      categoryFilterBtns.forEach((btn) => {
        btn.classList.remove(activeClass);
        btn.removeAttribute('tabindex');
      });
      // устанавливаем стиль активности только для кнопки, по которой был клик
      evt.target.classList.add(activeClass);
      // дополнительно устанавливается tabindex = -1 для актвной кнопки
      evt.target.setAttribute('tabindex', '-1');

      swapPendingStatusBtn(evt.target, {isPending: true});

      hiddenInput.value = evt.target.dataset.productId;

      // отправляем данные при клике на кнопку выбора категории товаров
      getData(categoryFilterForm)
      .then(() => {
        swapPendingStatusBtn(evt.target, {isPending: false});
      });
    }
  });
}

// временная заглушка для отправки данных формы
function getData(form) {
  return fetch('https://httpbin.org/delay/5', {method: 'POST', body: new FormData(form)})
    .then((response) => response.json())
    .then((result) => console.log(result.form));
}
