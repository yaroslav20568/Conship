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
		slidesPerView: 1,
		pagination: {
				el: '.intro__swiper-pagination',
				clickable: true
		},
	});

	const characteristicsItems = document.querySelectorAll('.types-containers__item-characteristics');
	const btnTypesContainers = document.querySelectorAll('.types-containers__item-btn');
	
	btnTypesContainers.forEach((btnTypeContainer, i) => {
		btnTypeContainer.addEventListener('click', () => {
			if(!btnTypeContainer.classList.contains('active')) {
				btnTypeContainer.classList.add('active');
				characteristicsItems[i].style.display = 'block';
				btnTypeContainer.firstElementChild.textContent = 'Hide details';
			} else {
				btnTypeContainer.classList.remove('active');
				characteristicsItems[i].style.display = 'none';
				btnTypeContainer.firstElementChild.textContent = 'Show details';
			}
		});
	});

	window.addEventListener('orientationchange', () => {
		burgerBtn.classList.remove('active');
		headerBottomGroup.classList.remove('active');
		if(document.documentElement.clientWidth < 650) {
			characteristicsItems.forEach((characteristicsItem) => {
				characteristicsItem.style.display = 'block';
			});
		}
	});
});