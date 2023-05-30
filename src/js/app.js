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

	// $("input[name='phone']").mask("999-99-99");

	/* FORMS */
	let k = 0;
	const validateInputs = (inputs) => {
			k = 0;
			inputs.forEach(input => {
					if(!input.value) {
							input.style.border = '1px solid red';
							if(input.name === 'phone' && input.value === '') {
								// k++;
								input.style.border = '1px solid #D9D9D9';
							}
					} else {
							if(input.name === 'name' && /^[a-zA-Zа-яА-ЯёЁ ]+$/.test(input.value)) {
									k++;
									input.style.border = '1px solid #D9D9D9';
							} else if(input.name === 'phone') {
								console.log('phone');
								if(document.querySelector('input[name="phone"]').value === '') {
									input.style.border = '1px solid red';
								} else {
									document.querySelector('input[name="email"]').style.border = '1px solid #D9D9D9';
								}
							} else if(input.name === 'email' && /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i.test(input.value)) {
									k++;
									input.style.border = '1px solid #D9D9D9';
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
			// if(inputs.length - 1 === k && document.querySelector("input[name='phone']").value != '' && document.querySelector("input[name='phone']").classList[1] != 'error') {
				if(inputs.length - 1 === k || (inputs.length - 2 === k && document.querySelector("input[name='phone']").value != '' && document.querySelector("input[name='phone']").classList[1] != 'error')) {
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

	/* FORM-SELECT */
	const input = document.querySelector("input[name='phone']");

	const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

	const iti = window.intlTelInput(input, {
		utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
	});

	const reset = () => {
		input.classList.remove("error");
	};

	const validateSelect = () => {
		reset();

		// console.log(1);
		// if(input.value === '') {
		// 	document.querySelector('input[name="email"]').style.border = '1px solid red';
		// } else {
		// 	document.querySelector('input[name="email"]').style.border = '1px solid #D9D9D9';
		// }

		if (input.value.trim()) {
			if (iti.isValidNumber()) {
				input.style.border = '1px solid #D9D9D9';
				k++;
			} else {
				input.classList.add("error");
				input.style.border = '1px solid red';
				k--;
				const errorCode = iti.getValidationError();
			}
		}
	};

	// on blur: validate
	input.addEventListener('blur', validateSelect);

	// on keyup / change flag: reset
	input.addEventListener('change', validateSelect);
	input.addEventListener('keyup', validateSelect);
	/* FORM-SELECT */
});