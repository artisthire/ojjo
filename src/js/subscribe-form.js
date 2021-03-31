// обработка формы подписки на рассылку

import {swapPendingStatusBtn} from './utils';

const submitBtnSelector = 'button[type="submit"]';
const emailInputSelector = 'input';
// поле, куда выводится сообщение о успешной или не успешной подписке на рассылку
const resultFieldClass = 'js-subscribe-form-message';
// сообщения, которые выводятся в поле в зависимости от результата подписки
const successMessage = 'Вы успешно подписаны!';
const rejectMessage = 'Ошибка. Попробуйте позже!';
// время показа сообщения
const showMessageTime = 3000;

const subscribeFrom = document.querySelector('.js-subscribe-form');
// флаг индикации того, что данные формы находятся в процессе отправки
// используется для предотвращения повторной отправки и изменения email пока отправляется предыдущий запрос
let isSendingData = false;

if (subscribeFrom) {
  const submitBtn = subscribeFrom.querySelector(`${submitBtnSelector}`);
  const input = subscribeFrom.querySelector(`${emailInputSelector}`);
  const messageContainer = subscribeFrom.querySelector(`.${resultFieldClass}`);

  input.addEventListener('keydown', (evt) => {
    if (isSendingData) {
      evt.preventDefault();
    }
  });

  subscribeFrom.addEventListener('submit', (evt) => {
    evt.preventDefault();
    swapPendingStatusBtn(submitBtn, {isPending: true});
    isSendingData = true;
    // временная отправка формы на тестовый адрес
    fetch('https://httpbin.org/delay/3', {method: 'POST', body: new FormData(subscribeFrom)})
      .then((response) => {
        if (messageContainer && response.ok) {
          messageContainer.textContent = successMessage;
        }
        return response.json();
      })
      .then((result) => console.log(result.form))
      .catch((error) => {
        if (messageContainer) {
          messageContainer.textContent = rejectMessage;
        }

        console.log(error.message);
      })
      .finally(() => {
        swapPendingStatusBtn(submitBtn, {isPending: false});
        isSendingData = false;

        if (messageContainer) {
          messageContainer.style.display = 'block';
          // сообщение показывается не 3 сек., а потом исчезает
          setTimeout(() => {
            messageContainer.style.display = 'none';
          }, showMessageTime);
        }
      });
  });
}
