// функция добавляющая декоративный эффект ожидания отправки данных на кнопки форм
// isPending: true - добавить эффект
// isPending: false - убрать эффект
export function swapPendingStatusBtn(btn, options = {isPending: true}) {
  if (options.isPending) {
    btn.classList.add('pending');
    btn.setAttribute('disabled', 'true');
  } else {
    btn.classList.remove('pending');
    btn.removeAttribute('disabled');
  }
}
