// обработка отрытия/закрытия модальных окон

// кнопки открытия модальных окон
const openModalBtns = document.querySelectorAll('[data-modal-id]');
const modalList = document.querySelectorAll('[id^="modal"]');

const hideScrollClass = 'hide-scroll';
const showModalClass = 'show-modal';
const showMobileMenuClass = 'show-menu';
const closeModalBtnClass = 'js-modal-close-btn';
// клас блока окружающего все активные кнопки внутри меню
// используется для идентификации клика вне меню
const fieldModalClass = 'js-modal-content';
// общие переменные, которые используются для идентификации текущего открытого модального окна и кнопки закрытия в нем
let currentActiveModal;
let currentCloseBtn;
// предварительно скрываем все модальные окна
modalList.forEach((modal) => (modal.style.display = 'none'));

openModalBtns.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();

    // модальное окно ищется по ID, который берется из аттрибута data-modal-id кнопки
    const targetModal = document.querySelector(`#${btn.dataset.modalId}`);

    if (targetModal) {
      // если показывается другое модально окно, скрыть его
      // используется для возможности открытия модальных окон из других модальных окон
      if (currentActiveModal) {
        hideModal();
      }

      // обновить ссылку на текущее активное модальное окно
      currentActiveModal = targetModal;
      // показать текущее активное модальное окно
      showModal();
    }
  });
});

function showModal() {
  currentCloseBtn = currentActiveModal.querySelector(`.${closeModalBtnClass}`);
  // показываем модальное окно
  document.body.classList.add(hideScrollClass);
  document.body.classList.add(showModalClass);
  currentActiveModal.style.display = 'block';
  // фокусировака на первом элементе ввода
  currentActiveModal.querySelector('input:not(:disabled)').focus();
  // добавляем обработчики закрытия модального окна
  // при клике на кнопке закрытия
  currentCloseBtn.addEventListener('click', hideModal);
  // при клике вне контента модального окна по подложке
  currentActiveModal.addEventListener('click', onBodyClick);
}

function hideModal() {
  // скрываем модальное окно
  document.body.classList.remove(showModalClass);
  // скрываем все модальные окна
  modalList.forEach((modal) => (modal.style.display = 'none'));
  // убрать класс сокрытия скролла только если не показано мобильное меню сайта
  if (!document.body.classList.contains(showMobileMenuClass)) {
    document.body.classList.remove(hideScrollClass);
  }

  // удаляем обработчики закрытия
  currentCloseBtn.removeEventListener('click', hideModal);
  currentActiveModal.removeEventListener('click', onBodyClick);

  currentActiveModal = null;
}

function onBodyClick(evt) {
  // срабатывает только при клике вне контента модального окна
  if (!evt.target.closest(`.${fieldModalClass}`)) {
    hideModal();
  }
}
