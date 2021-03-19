// обработка переключения кнопок в фильтре категорий товаров на главной странце
const btnClass = 'js-category-filter-btn';
const activeClass = 'active';

const btnContainer = document.querySelector('.js-category-filter-container');
const categoryFilterBtns = btnContainer.querySelectorAll(`.${btnClass}`);
// скрытого поля input[hidden], на который отражается значение выбраной категории в активной кнопке
// и через который информация передается внуть формы
const hiddenInput = document.querySelector('.js-category-filter-input');

btnContainer.addEventListener('click', (evt) => {
  if (evt.target.closest(`.${btnClass}`)) {
    evt.preventDefault();

    categoryFilterBtns.forEach((btn) => {
      btn.classList.remove(activeClass);
      btn.removeAttribute('tabindex');
    });

    evt.target.classList.add(activeClass);
    // дополнительно устанавливается tabindex = -1 для актвной кнопки
    evt.target.setAttribute('tabindex', '-1');

    hiddenInput.value = evt.target.dataset.productId;
  }
});
