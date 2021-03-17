// обработка отрытия/закрытия мобильного меню
const burgerBtn = document.getElementById('burger-btn');
const documentBody = document.body;

// добавляется к BODY при открытии меню
const activeClass = 'show-menu';
// используется для закрытия меню при клике вне его области
const headerHeadClass = 'js-header-head';
// расширение выше которого убирается класс показа меню на BODY
const mediaQueryList = window.matchMedia('(min-width: 485px)');

// переключение меню при клике на кнопку открытия/закрытия
burgerBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  toggleMenu(!documentBody.classList.contains(activeClass));
});

// закрытие меню при клике вне области меню
documentBody.addEventListener('click', (evt) => {
  if (!evt.target.closest(`.${headerHeadClass}`)) {
    toggleMenu(false);
  }
});

// убираем класс показа меню с BODY на экранах где показывается полная (не мобильная) версия меню
mediaQueryList.addEventListener('change', (evt) => {
  if (evt.matches && documentBody.classList.contains(activeClass)) {
    documentBody.classList.remove(activeClass);
  }
});

// функция для добавления аттрибутов к DOM-элементам при открытии/закрытии меню
function toggleMenu(isShowed) {
  if (isShowed) {
    burgerBtn.setAttribute('aria-label', 'Закрыть меню');
    burgerBtn.setAttribute('title', 'Закрыть меню');
    documentBody.classList.add(activeClass);
  } else {
    burgerBtn.setAttribute('aria-label', 'Открыть меню');
    burgerBtn.setAttribute('title', 'Открыть меню');
    documentBody.classList.remove(activeClass);
  }
}
