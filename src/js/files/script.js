import { isMobile,_slideUp,_slideDown } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


 const menuBody = document.querySelector('.menu__body');
 if (menuBody) {
   _slideUp(menuBody, 0);
 
 }



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






   const contacts = document.querySelector(".contacts");
  if (contacts) {
    const inner = contacts.querySelector(".contacts__container");
    const height = inner.offsetHeight;
    contacts.style.setProperty("--height", `${height}px`);
  }

});


// File choose from device (Form) ===============================
	const fileInputs = document.querySelectorAll(".input-file");

  if (fileInputs) {
    fileInputs.forEach(input => {
      const label = input.closest(".file-input__label");
      const labelText = label.querySelector(".input-file-att");
      const removeBtn = label.querySelector(".file-input__remove");
    
      input.addEventListener("change", () => {
        if (input.files.length > 0) {
          const file = input.files[0];
          labelText.textContent = file.name;
          label.classList.add("_file-attached");
        } else {
          labelText.textContent = "";
          label.classList.remove("_file-attached");
        }
      });
    
      removeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        input.value = ""; // сбрасываем выбранный файл
        labelText.textContent = "";
        label.classList.remove("_file-attached");
      });
    });
  }



  // Загрузка плагина маски только при клике на поле =================
// let inputmaskLoaded = false;

// document.addEventListener("focusin", async function (event) {
//   const input = event.target;

//   if (input.hasAttribute("data-mask") && !input.dataset.masked) {
//     if (!inputmaskLoaded) {
//       try {
//         await loadInputMask();
//         inputmaskLoaded = true;
//       } catch (e) {
//         console.error("Не удалось загрузить Inputmask:", e);
//         return;
//       }
//     }

//     // Получаем язык документа
//     const lang = document.documentElement.lang;

//     // Выбираем маску в зависимости от языка
//     const mask = (lang === "uk" || lang === "ru") 
//       ? "+38 (999) 999 99 99"
//       : "+99 999 999 99 99";

//     Inputmask({
//       mask: mask,
//       showMaskOnHover: false,
//       showMaskOnFocus: true
//     }).mask(input);

//     input.dataset.masked = "true";
//   }
// });

// function loadInputMask() {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.src = "https://cdn.jsdelivr.net/npm/inputmask@5.0.9/dist/inputmask.min.js";
//     script.onload = resolve;
//     script.onerror = reject;
//     document.head.appendChild(script);
//   });
// }

let inputmaskLoaded = false;
let userCountryCode = null;

document.addEventListener("focusin", async function (event) {
  const input = event.target;

  if (input.hasAttribute("data-mask") && !input.dataset.masked) {
    if (!inputmaskLoaded) {
      try {
        await loadInputMask();
        inputmaskLoaded = true;
      } catch (e) {
        console.error("Failed to load Inputmask:", e);
        return;
      }
    }

    // Получаем код страны пользователя один раз
    if (userCountryCode === null) {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("Geolocation request failed");
        const data = await res.json();
        userCountryCode = data.country || ""; // e.g., "UA"
      } catch (e) {
        console.warn("Could not detect the country, will check HTML language instead", e);
        userCountryCode = ""; // важно явно задать, чтобы не оставалось null
      }
    }

    // Маска по умолчанию
    let mask = "+99 999 999 99 99";

    if (userCountryCode === "UA") {
      // Если Украина — всегда украинская маска
      mask = "+38 (999) 999 99 99";
    } else if (userCountryCode) {
      // Если страна определена и это не Украина — всегда международная маска
      mask = "+99 999 999 99 99";
    } else {
      // Если страну определить не удалось — проверяем язык
      const lang = document.documentElement.lang;
      if (lang === "uk" || lang === "ru") {
        mask = "+38 (999) 999 99 99";
      } else {
        mask = "+99 999 999 99 99";
      }
    }

    Inputmask({
      mask: mask,
      showMaskOnHover: false,
      showMaskOnFocus: true
    }).mask(input);

    input.dataset.masked = "true";
  }
});

function loadInputMask() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/inputmask@5.0.9/dist/inputmask.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}


// =====================
