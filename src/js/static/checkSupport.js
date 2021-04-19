// удаляем класс, устанавливающий признак отключенного JS
document.documentElement.classList.remove('no-js');

// проверяется поддержка формата WebP
checkWebPSupport();

function checkWebPSupport(fn) {
  const root = document.documentElement;
  const WebP = new Image();
  let isSupported = false;

  WebP.addEventListener('load', isSupportedWebp);
  WebP.addEventListener('error', isSupportedWebp);

  function isSupportedWebp() {
    isSupported = (WebP.height === 1);

    if (isSupported) {
      if (root.className.indexOf('no-webp') >= 0) {
        root.className = root.className.replace(/\bno-webp\b/, 'webp');
      } else {
        root.className += ' webp';
      }
    }

    if (fn) {
      fn(isSupported);
    }
  }

  WebP.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
}


