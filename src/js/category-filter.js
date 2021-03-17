const btnClass = 'js-category-filter-btn';
const activeClass = 'active';

const categoryFilterBtns = document.querySelectorAll(`.${btnClass}`);
const btnContainer = document.querySelector('.js-category-filter-container');

btnContainer.addEventListener('click', (evt) => {
  if (evt.target.closest(`.${btnClass}`)) {
    evt.preventDefault();

    categoryFilterBtns.forEach((btn) => btn.classList.remove(activeClass));
    evt.target.classList.add(activeClass);
  }
});
