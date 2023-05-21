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

	/* FORMS */
	const validateInputs = (inputs) => {
			let k = 0;

			inputs.forEach(input => {
					if(!input.value) {
							input.style.border = '1px solid red';
					} else {
							if(input.name === 'name' && /^[a-zA-Zа-яА-ЯёЁ ]+$/.test(input.value)) {
									k++;
									input.style.border = '1px solid #000';
							} else if(input.name === 'phone' && /^[0-9]{9,13}$/.test(input.value)) {
									k++;
									input.style.border = '1px solid #000';
							} else if(input.name === 'email' && /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i.test(input.value)) {
									k++;
									input.style.border = '1px solid #000';
							} else if(input.name === 'message') {
									k++;
									input.style.border = '1px solid #000';
							} else {
									k--;
									input.style.border = '1px solid red';
							}
					}
			});

			return k;
	};

	const resetInputs = (inputs) => {
			inputs.forEach(input => {
					input.value = '';
			});
	};

	const sendData = (k, inputs, formClass) => {
			if(inputs.length === k) {
					const form = document.querySelector(`.${formClass}`);
					let formData = new FormData(form); 
					// console.log(form);

					const formAlert = document.querySelector('.form-alert');
					const alertCloseBtn = document.querySelector('.form-alert__close');

					alertCloseBtn.addEventListener('click', () => {
							formAlert.classList.remove('active');
					});

					fetch('assets/sendMail.php', {
							method: 'POST',
							body: formData
					}).then(resp => {
							resetInputs(inputs);
							formAlert.classList.add('active');

							if(formClass === 'contacts-modal__form') {
									document.querySelector('.contacts-modal').classList.remove('modal--active');
									document.body.style.overflow = 'auto';
							}

							setTimeout(() => {
									formAlert.classList.remove('active');
							}, 5000);
					})
			}
	}

	const formFunction = (formClass, btnClass) => {
			const inputs = document.querySelectorAll(`.${formClass} input[type="text"], .${formClass} textarea`);
			const btn = document.querySelector(`.${btnClass}`);
			
			if(btn) {
					btn.addEventListener('click', (e) => {
							e.preventDefault();

							const k = validateInputs(inputs);

							sendData(k, inputs, formClass);
					});

					inputs.forEach(input => {
							input.addEventListener('input', () => {
									validateInputs(inputs);
							});
					});
			}
	};

	formFunction('contact-section__form', 'contact-section__submit');
	formFunction('contacts__form', 'contacts__submit');
	/* FORMS */
});