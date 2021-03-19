// кнопки открытия модальных окон
const modalBtnList = document.querySelectorAll('[data-modal-id]');

const hideScrollClass = 'hide-scroll';
const showModalClass = 'show-modal';
const showMobileMenuClass = 'show-menu';
// общие переменные, которые используются для идентификации текущего открытого модального окна и кнопки закрытия в нем
let currentActiveModal;
let currentCloseBtn;

modalBtnList.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();

    // модальное окно ищется по ID, который берется из аттрибута data-modal-id кнопки
    const targetModal = document.querySelector(`#${btn.dataset.modalId}`);

    if (targetModal) {
      if (currentActiveModal) {
        hideModal();
      }

      currentActiveModal = targetModal;
      showModal();
    }
  });
});

function showModal() {
  currentCloseBtn = currentActiveModal.querySelector('.js-modal-close-btn');
  // показываем модальное окно
  currentActiveModal.style.display = '';
  document.body.classList.add(hideScrollClass);
  document.body.classList.add(showModalClass);
  // добавляем обработчики закрытия модального окна
  // при клике на кнопке закрытия
  currentCloseBtn.addEventListener('click', hideModal);
  // при клике вне контента модального окна по подложке
  currentActiveModal.addEventListener('click', closeModal);
}

function hideModal() {
  // скрываем модальное окно
  currentActiveModal.style.display = 'none';
  // убрать класс сокрытия скролла только если не показано мобильное меню сайта
  if (!document.body.classList.contains(showMobileMenuClass)) {
    document.body.classList.remove(hideScrollClass);
  }

  document.body.classList.remove(showModalClass);
  // удаляем обработчики закрытия
  currentCloseBtn.removeEventListener('click', hideModal);
  currentActiveModal.removeEventListener('click', closeModal);

  currentActiveModal = null;
}

function closeModal(evt) {
  // срабатывает только при клике вне контента модального окна
  if (!evt.target.closest('.js-modal-content')) {
    hideModal();
  }
}
