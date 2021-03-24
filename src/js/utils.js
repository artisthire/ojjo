export function swapPendingStatusBtn(btn, options = {isPending: true}) {
  if (options.isPending) {
    btn.classList.add('pending');
    btn.setAttribute('disabled', 'true');
  } else {
    btn.classList.remove('pending');
    btn.removeAttribute('disabled');
  }
}
