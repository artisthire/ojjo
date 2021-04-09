// удаляем класс, устанавливающий признак отключенного JS
// document.body.classList.remove('no-js');

// общий код, который используется для закрытия модальных окон и мобильного меню при нажатии кнопки Escape
// классы для управления и идентификации состоянием открытия мобильного меню и модальных окон
const showMenuClass = 'show-menu';
const showModalClass = 'show-modal';
const hideScrollClass = 'hide-scroll';

// все модальные окна
const modalList = document.querySelectorAll('[id^="modal"]');

document.body.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {

    // если показывается только мобильное меню
    if (document.body.classList.contains(showMenuClass) && !document.body.classList.contains(showModalClass)) {
      // убираем меню
      document.body.classList.remove(showMenuClass);
      // разрешаем скроллинг страницы
      document.body.classList.remove(hideScrollClass);
    } else if (document.body.classList.contains(showModalClass)) {
      // если показывается модальное окно
      // скрываем все окна
      modalList.forEach((modal) => {
        modal.style.display = 'none';
      });

      // убираем класс показвающий, что открыто модально окно
      document.body.classList.remove(showModalClass);
      // а также убираем класс запрещающий скроллинг страницы, но только если до этого не показывалось мобильное меню
      // для которого также важен запрет прокручивания страницы
      if (!document.body.classList.contains(showMenuClass)) {
        document.body.classList.remove(hideScrollClass);
      }
    }
  }
});
