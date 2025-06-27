/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import {
	Navigation,
	Pagination
} from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// if (document.querySelector('.advantages__slider ')) {
	// 	new Swiper('.advantages__slider ', {
	// 		// modules: [Navigation],
	// 		observer: true,
	// 		observeParents: true,
	// 		slidesPerView: 3,
	// 		spaceBetween: 20,
	// 		//autoHeight: true,
	// 		speed: 500,
	// 		// touchAngle: 20,
	// 		//touchRatio: 0,
	// 		//simulateTouch: false,
	// 		//loop: true,
	// 		//preloadImages: false,
	// 		//lazy: true,
	// 		// Брейкпоінти
	// 		breakpoints: {
	// 			320: {
	// 				slidesPerView: 1.05,
	// 				spaceBetween: 16,
	// 			},
	// 			920: {
	// 				slidesPerView: 3,
	// 				spaceBetween: 20,
	// 			},

	// 		},
	// 		// Події
	// 		on: {

	// 		}
	// 	});
	// }
	if (document.querySelector('.sliders__slider')) {
		const sliderEl = document.querySelector('.sliders__slider');
		const sectionWrapper = sliderEl.closest('.section-wrapper');

		const slider = new Swiper(sliderEl, {
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 400,

			pagination: {
				el: sliderEl.querySelector('.swiper-pagination'),
				clickable: true,
			},

			navigation: {
				prevEl: sliderEl.querySelector('.swiper-button-prev'),
				nextEl: sliderEl.querySelector('.swiper-button-next'),
			},

			on: {
				init(swiper) {
					updateSectionClass(swiper.activeIndex);
				},
				slideChange(swiper) {
					updateSectionClass(swiper.activeIndex);
				}
			}
		});

		function updateSectionClass(index) {
			sectionWrapper.classList.forEach(className => {
				if (/^slide-active-\d+$/.test(className)) {
					sectionWrapper.classList.remove(className);
				}
			});

			const newClass = `slide-active-${String(index + 1).padStart(2, '0')}`;
			sectionWrapper.classList.add(newClass);
		}
	}

	// if (document.querySelector('.swiper')) { // Вказуємо склас потрібного слайдера
	// 	// Створюємо слайдер
	// 	new Swiper('.swiper', { // Вказуємо склас потрібного слайдера
	// 		// Підключаємо модулі слайдера
	// 		// для конкретного випадку
	// 		modules: [Navigation],
	// 		observer: true,
	// 		observeParents: true,
	// 		slidesPerView: 1,
	// 		spaceBetween: 0,
	// 		//autoHeight: true,
	// 		speed: 800,

	// 		//touchRatio: 0,
	// 		//simulateTouch: false,
	// 		//loop: true,
	// 		//preloadImages: false,
	// 		//lazy: true,

	// 		/*
	// 		// Ефекти
	// 		effect: 'fade',
	// 		autoplay: {
	// 			delay: 3000,
	// 			disableOnInteraction: false,
	// 		},
	// 		*/

	// 		// Пагінація
	// 		/*
	// 		pagination: {
	// 			el: '.swiper-pagination',
	// 			clickable: true,
	// 		},
	// 		*/

	// 		// Скроллбар
	// 		/*
	// 		scrollbar: {
	// 			el: '.swiper-scrollbar',
	// 			draggable: true,
	// 		},
	// 		*/

	// 		// Кнопки "вліво/вправо"
	// 		navigation: {
	// 			prevEl: '.swiper-button-prev',
	// 			nextEl: '.swiper-button-next',
	// 		},
	// 		/*
	// 		// Брейкпоінти
	// 		breakpoints: {
	// 			640: {
	// 				slidesPerView: 1,
	// 				spaceBetween: 0,
	// 				autoHeight: true,
	// 			},
	// 			768: {
	// 				slidesPerView: 2,
	// 				spaceBetween: 20,
	// 			},
	// 			992: {
	// 				slidesPerView: 3,
	// 				spaceBetween: 20,
	// 			},
	// 			1268: {
	// 				slidesPerView: 4,
	// 				spaceBetween: 30,
	// 			},
	// 		},
	// 		*/
	// 		// Події
	// 		on: {

	// 		}
	// 	});
	// }
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});