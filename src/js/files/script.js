import { isMobile,_slideUp,_slideDown } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


 const menuBody = document.querySelector('.menu__body');
 if (menuBody) {
   _slideUp(menuBody, 0);
 
 }

// document.addEventListener('DOMContentLoaded', () => {
//   const snackImages = document.querySelectorAll('.tap-snack__img');
//   const resultBlock = document.querySelector('.tap-snack__result');
//   const resultTexts = document.querySelectorAll('.tap-snack__results-txt');

//   let currentIndex = 0;
//   let intervalId = null;
//   let gameEnded = false;

//   function startCycling() {
//     intervalId = setInterval(() => {
//       snackImages.forEach(img => img.classList.remove('_active'));
//       currentIndex = (currentIndex + 1) % snackImages.length;
//       snackImages[currentIndex].classList.add('_active');
//     }, 200);
//   }

//   function stopGame() {
//     if (gameEnded) return;
//     gameEnded = true;

//     clearInterval(intervalId);
//     resultBlock.classList.remove('_not-active');

//     // Убираем активные тексты
//     resultTexts.forEach(txt => txt.classList.remove('_active'));

//     // Показываем нужный
//     if (resultTexts[currentIndex]) {
//       resultTexts[currentIndex].classList.add('_active');
//     }

//     // Через 5 секунд — рестарт
//     // setTimeout(resetGame, 1000);
//   }

//   function resetGame() {
//     // Сброс
//     gameEnded = false;
//     currentIndex = 0;

//     snackImages.forEach((img, i) => {
//       img.classList.remove('_active');
//       if (i === 0) img.classList.add('_active');
//     });

//     resultTexts.forEach(txt => txt.classList.remove('_active'));
//     resultBlock.classList.add('_not-active');

//     // Повторно навешиваем обработчики
//     document.body.addEventListener('touchstart', stopHandler, { once: true });
//     document.body.addEventListener('mousedown', stopHandler, { once: true });

//     // Старт анимации
//     startCycling();
//   }

//   const stopHandler = () => stopGame();

//   // Инициализация
//   resetGame();
// });





// document.addEventListener('DOMContentLoaded', () => {
//   const snackImages = document.querySelectorAll('.tap-snack__img');
//   const resultBlock = document.querySelector('.tap-snack__result');
//   const resultTexts = document.querySelectorAll('.tap-snack__results-txt');
//   const restartButton = document.querySelector('.tap-snack__btn');

//   let currentIndex = 0;
//   let intervalId = null;
//   let gameEnded = false;

//   function startCycling() {
//     intervalId = setInterval(() => {
//       snackImages.forEach(img => img.classList.remove('_active'));
//       currentIndex = (currentIndex + 1) % snackImages.length;
//       snackImages[currentIndex].classList.add('_active');
//     }, 250);
//   }

//   function stopGame() {
//     if (gameEnded) return;
//     gameEnded = true;

//     clearInterval(intervalId);
//     resultBlock.classList.remove('_not-active');

//     // Убираем активные тексты
//     resultTexts.forEach(txt => txt.classList.remove('_active'));

//     // Показываем нужный результат
//     if (resultTexts[currentIndex]) {
//       resultTexts[currentIndex].classList.add('_active');
//     }

//     // Показываем кнопку рестарта
//     restartButton.classList.remove('_hidden');
//   }

//   function resetGame() {
//     gameEnded = false;
//     currentIndex = 0;

//     // Сброс состояний
//     snackImages.forEach((img, i) => {
//       img.classList.remove('_active');
//       if (i === 0) img.classList.add('_active');
//     });

//     resultTexts.forEach(txt => txt.classList.remove('_active'));
//     resultBlock.classList.add('_not-active');
//     restartButton.classList.add('_hidden');

//     // Навешиваем обработчики
//     document.body.addEventListener('touchstart', stopHandler, { once: true });
//     document.body.addEventListener('mousedown', stopHandler, { once: true });

//     // Старт анимации
//     startCycling();
//   }

//   const stopHandler = () => stopGame();

//   // Кнопка рестарта
//   restartButton.addEventListener('click', resetGame);

//   // Первый запуск
//   resetGame();
// });


document.addEventListener('DOMContentLoaded', () => {
  const snackImages = document.querySelectorAll('.tap-snack__img');
  const resultBlock = document.querySelector('.tap-snack__result');
  const resultTexts = document.querySelectorAll('.tap-snack__results-txt');
  const restartButton = document.querySelector('.tap-snack__btn');
  const tapSnack = document.querySelector('.tap-snack');

  let currentIndex = 0;
  let intervalId = null;
  let gameEnded = false;
  let gameStarted = false;

  function startCycling() {
    intervalId = setInterval(() => {
      snackImages.forEach(img => img.classList.remove('_active'));
      currentIndex = (currentIndex + 1) % snackImages.length;
      snackImages[currentIndex].classList.add('_active');
    }, 250);
  }

  function stopGame() {
    if (gameEnded) return;
    gameEnded = true;

    clearInterval(intervalId);
    resultBlock.classList.remove('_not-active');

    resultTexts.forEach(txt => txt.classList.remove('_active'));

    if (resultTexts[currentIndex]) {
      resultTexts[currentIndex].classList.add('_active');
    }

    restartButton.classList.remove('_hidden');
  }

function resetGame() {
  gameEnded = false;
  currentIndex = 0;

  snackImages.forEach((img, i) => {
    img.classList.remove('_active');
    if (i === 0) img.classList.add('_active');
  });

  resultTexts.forEach(txt => txt.classList.remove('_active'));
  resultBlock.classList.add('_not-active');
  restartButton.classList.add('_hidden');

  // Вешаем обработчики касания ТОЛЬКО на сам элемент игры
  tapSnack.addEventListener('touchstart', stopHandler, { once: true });
  tapSnack.addEventListener('mousedown', stopHandler, { once: true });

  startCycling();
}


  const stopHandler = () => stopGame();
  restartButton.addEventListener('click', resetGame);

  // Следим за появлением блока во вьюпорте
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !gameStarted) {
        gameStarted = true;
        resetGame();
        observer.unobserve(entry.target); // отключаем наблюдение после первого входа
      }
    });
  }, {
    root: null,
    threshold: 0.5 // минимум 50% элемента должно быть видно
  });

  if (tapSnack) {
    observer.observe(tapSnack);
  }
});
