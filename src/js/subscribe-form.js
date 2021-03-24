const subscribeFrom = document.querySelector('.js-subscribe-form');

if (subscribeFrom) {
  const submitBtn = subscribeFrom.querySelector('button[type="submit"]');
  const messageContainer = subscribeFrom.querySelector('.js-subscribe-form-message');

  subscribeFrom.addEventListener('submit', (evt) => {
    evt.preventDefault();

    submitBtn.classList.add('pending');
    submitBtn.setAttribute('disabled', 'true');

    fetch('https://httpbin.org/delay/3', {method: 'POST', body: new FormData(subscribeFrom)})
      .then((response) => {
        if (response.ok) {
          messageContainer.textContent = 'Вы успешно подписаны!';
        } else {
          messageContainer.textContent = 'Ошибка. Попробуйте позже!';
        }
        submitBtn.classList.remove('pending');
        submitBtn.removeAttribute('disabled');
        messageContainer.style.display = 'block';
        setTimeout(() => {
          messageContainer.style.display = '';
        }, 3000);

        return response.json();
      })
      .then((result) => console.log(result.form));
  });
}
