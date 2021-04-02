// обработка отрытия/закрытия мобильного меню

// добавляется к BODY при открытии меню
const showMenuClass = 'show-menu';
const hideScrollClass = 'hide-scroll';
// класс для показа модальных окон
// используется для контроля удаления возможности прокрутки окна
// только если не показывается модальное окно, требующее такого же запрета прокрутки
const showModalClass = 'show-modal';
// используется для закрытия меню при клике вне его области
const headerContentClass = 'js-header-content';
// расширение экрана, выше которого скрывается мобильное меню
const mobileMediaResolution = 485;

// кнопка переключения меню
const burgerBtn = document.getElementById('burger-btn');
// общая область меню, содержащая непосредственно контент и подложку
// используется для закрытия меню при клике вне контента по подложке
const headerContainer = document.querySelector('.js-header-container');
const body = document.body;

// переключение меню при клике на кнопку открытия/закрытия
burgerBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  body.classList.contains(showMenuClass) ? hideMenu() : showMenu();
});

const mediaQueryList = window.matchMedia(`(min-width: ${mobileMediaResolution}px)`);
// убираем класс показа меню с BODY на экранах где показывается полная (не мобильная) версия меню
mediaQueryList.addEventListener('change', (evt) => {
  if (evt.matches && body.classList.contains(showMenuClass)) {
    body.classList.remove(showMenuClass);

    // убираем сокрытие скролла только если до этого не показывалось модальное окно
    if (!document.body.classList.contains(`${showModalClass}`)) {
      body.classList.remove(hideScrollClass);
    }

    // удаляем обработчик закрытия меню при клике вне области контента меню
    headerContainer.removeEventListener('click', onMenuContainerClick);
  }
});

// обработчик закрытия меню при клике вне области контента меню
function onMenuContainerClick(evt) {
  // закрываем мобильное меню при клике вне области контента
  // если при этом мобильное меню было открыто (добавлен соответствующий класс к BODY)
  //  && !evt.target.closest('.js-modal-container')
  if (!evt.target.closest(`.${headerContentClass}`) && body.classList.contains(showMenuClass)) {
    hideMenu();
  }
}

// функция отображения меню
function showMenu() {
  burgerBtn.setAttribute('aria-label', 'Закрыть меню');
  burgerBtn.setAttribute('title', 'Закрыть меню');
  body.classList.add(showMenuClass);
  body.classList.add(hideScrollClass);

  // добавляем обработчик закрытия меню при клике вне области контента меню
  headerContainer.addEventListener('click', onMenuContainerClick);
}

// функция скрывающая меню
function hideMenu() {
  burgerBtn.setAttribute('aria-label', 'Открыть меню');
  burgerBtn.setAttribute('title', 'Открыть меню');

  body.classList.remove(showMenuClass);
  body.classList.remove(hideScrollClass);

  // удаляем обработчик закрытия меню при клике вне области контента меню
  headerContainer.removeEventListener('click', onMenuContainerClick);
}
