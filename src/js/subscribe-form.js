import {swapPendingStatusBtn} from './utils';

const subscribeFrom = document.querySelector('.js-subscribe-form');

if (subscribeFrom) {
  const submitBtn = subscribeFrom.querySelector('button[type="submit"]');
  const messageContainer = subscribeFrom.querySelector('.js-subscribe-form-message');

  subscribeFrom.addEventListener('submit', (evt) => {
    evt.preventDefault();
    swapPendingStatusBtn(submitBtn, {isPending: true});
    // временная отправка формы на тестовый адрес
    fetch('https://httpbin.org/delay/3', {method: 'POST', body: new FormData(subscribeFrom)})
      .then((response) => {
        if (messageContainer) {
          if (response.ok) {
            messageContainer.textContent = 'Вы успешно подписаны!';
          } else {
            messageContainer.textContent = 'Ошибка. Попробуйте позже!';
          }

          messageContainer.style.display = 'block';
          // сообщение показывается не 3 сек., а потом исчезает
          setTimeout(() => {
            messageContainer.style.display = 'none';
          }, 3000);
        }
        swapPendingStatusBtn(submitBtn, {isPending: false});
        return response.json();
      })
      .then((result) => console.log(result.form));
  });
}
