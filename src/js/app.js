// классы для управления и идентификации состоянием открытия мобильного меню и модальных окон
const showMenuClass = 'show-menu';
const showModalClass = 'show-modal';
const hideScrollClass = 'hide-scroll';

// все модальные окна
const modalList = document.querySelectorAll('[id^="modal"]');

document.body.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {

    if (document.body.classList.contains(showMenuClass) && !document.body.classList.contains(showModalClass)) {
      document.body.classList.remove(showMenuClass);
      document.body.classList.remove(hideScrollClass);
    } else if (document.body.classList.contains(showModalClass)) {
      modalList.forEach((modal) => {
        modal.style.display = 'none';
      });

      document.body.classList.remove(showModalClass);

      if (!document.body.classList.contains(showMenuClass)) {
        document.body.classList.remove(hideScrollClass);
      }
    }
  }
});
