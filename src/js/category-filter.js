const btnClass = 'js-category-filter-btn';
const hiddenInputClass = 'js-category-filter-input';
const activeClass = 'active';

const btnContainer = document.querySelector('.js-category-filter-container');
const categoryFilterBtns = btnContainer.querySelectorAll(`.${btnClass}`);
const hiddenInput = document.querySelector(`.${hiddenInputClass}`);

btnContainer.addEventListener('click', (evt) => {
  if (evt.target.closest(`.${btnClass}`)) {
    evt.preventDefault();

    categoryFilterBtns.forEach((btn) => {
      btn.classList.remove(activeClass);
      btn.removeAttribute('tabindex');
    });

    evt.target.classList.add(activeClass);
    evt.target.setAttribute('tabindex', '-1');

    hiddenInput.value = evt.target.dataset.productId;
  }
});
