// обработка отрытия/закрытия мобильного меню

// кнопка переключения меню
const burgerBtn = document.getElementById('burger-btn');
// общая область меню, содержащая непосредственно контент и подложку
// используется для закрытия меню при клике вне контента по подложке
const headerContainer = document.querySelector('.js-header-container');
const body = document.body;

// добавляется к BODY при открытии меню
const activeClass = 'show-menu';
const hideScrollClass = 'hide-scroll';
// используется для закрытия меню при клике вне его области
const headerContentClass = 'js-header-content';
// расширение экрана, выше которого скрывается мобильное меню
const mediaQueryList = window.matchMedia('(min-width: 485px)');

// переключение меню при клике на кнопку открытия/закрытия
burgerBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  body.classList.contains(activeClass) ? hideMenu() : showMenu();
});

// убираем класс показа меню с BODY на экранах где показывается полная (не мобильная) версия меню
mediaQueryList.addEventListener('change', (evt) => {
  if (evt.matches && body.classList.contains(activeClass)) {
    body.classList.remove(activeClass);

    // убираем сокрытие скролла только если до этого не показывалось модальное окно
    if (!document.body.classList.contains('show-modal')) {
      body.classList.remove(hideScrollClass);
    }

    // убараем обработчик закрытия меню общем контейнере шапки сайта
    headerContainer.removeEventListener('click', closeMenu);
  }
});

// обработчик закрытия меню при клике вне области контента меню
function closeMenu(evt) {
  // закрываем мобильное меню при клике вне области контента
  // если при этом мобильное меню было открыто (добавлен соответствующий класс к BODY)
  //  && !evt.target.closest('.js-modal-container')
  if (!evt.target.closest(`.${headerContentClass}`) && body.classList.contains(activeClass)) {
    hideMenu();
  }
}

// функция отображения меню
function showMenu() {
  burgerBtn.setAttribute('aria-label', 'Закрыть меню');
  burgerBtn.setAttribute('title', 'Закрыть меню');
  body.classList.add(activeClass);
  body.classList.add(hideScrollClass);

  // добавляем обработчик закрытия меню при клике вне области контента меню
  headerContainer.addEventListener('click', closeMenu);
}

// функция скрывающая меню
function hideMenu() {
  burgerBtn.setAttribute('aria-label', 'Открыть меню');
  burgerBtn.setAttribute('title', 'Открыть меню');

  body.classList.remove(activeClass);
  body.classList.remove(hideScrollClass);

  // удаляем обработчик закрытия меню при клике вне области контента меню
  headerContainer.removeEventListener('click', closeMenu);
}
