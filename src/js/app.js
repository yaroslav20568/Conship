import { animations } from './functions/animations.js';

document.addEventListener('DOMContentLoaded', () => {
	const burgerBtn = document.querySelector('.header__burger');
	const headerBottomGroup = document.querySelector('.header__bottom-group');

	burgerBtn.addEventListener('click', () => {
		if(!burgerBtn.classList.contains('active')) {
			burgerBtn.classList.add('active');
			headerBottomGroup.classList.add('active');
		} else {
			burgerBtn.classList.remove('active');
			headerBottomGroup.classList.remove('active');
		}
	});

	const introSwiper = new Swiper('.intro__swiper', {
		speed: 400,
		spaceBetween: 100,
		slidesPerView: 1,
		pagination: {
				el: '.intro__swiper-pagination',
				clickable: true
		},
	});
});