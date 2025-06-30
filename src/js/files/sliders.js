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
	const sliderEl = document.querySelector('.sliders__slider');
	if (sliderEl) {
		const sectionWrapper = sliderEl.closest('.section-wrapper');
		let loadedSlideRemoved = false;

		// Добавляем временный класс при загрузке
		sectionWrapper.classList.add('loaded-slide');

		const slider = new Swiper(sliderEl, {
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 400,
			loop: true,

			watchSlidesProgress: true,
			watchSlidesVisibility: true,

			pagination: {
				el: sliderEl.querySelector('.swiper-pagination'),
				clickable: true,
			},

			navigation: {
				prevEl: sliderEl.querySelector('.swiper-button-prev'),
				nextEl: sliderEl.querySelector('.swiper-button-next'),
			},

			on: {
				init: function () {
					updateSlideBgClass(this.realIndex);
				},
				slideChange: function () {
					updateSlideBgClass(this.realIndex);
				},
				touchStart: removeLoadedClassOnce,
				sliderMove: removeLoadedClassOnce,
				navigationNext: removeLoadedClassOnce,
				navigationPrev: removeLoadedClassOnce,
			}
		});

		function updateSlideBgClass(realIndex) {
			sectionWrapper.classList.forEach(cls => {
				if (cls.startsWith('slide-active-')) {
					sectionWrapper.classList.remove(cls);
				}
			});
			const indexStr = String(realIndex).padStart(2, '0');
			sectionWrapper.classList.add(`slide-active-${indexStr}`);
		}

		function removeLoadedClassOnce() {
			if (!loadedSlideRemoved) {
				sectionWrapper.classList.remove('loaded-slide');
				loadedSlideRemoved = true;
			}
		}
	}
}

window.addEventListener("load", function () {
	initSliders();
});
