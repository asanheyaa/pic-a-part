
const popUpFormSwiper = document.querySelector('.pop-up-form-action__swiper');

if (popUpFormSwiper) {
	const swiper = new Swiper(popUpFormSwiper, {
		spaceBetween: 15,
		pagination: {
			el: '.pop-up-form-action__pagination',
		},
	});
}


const aboutHomwSwiper = document.querySelector('.home-about__swiper');

if (aboutHomwSwiper) {
	let mobileSwiper = null;

	function toggleMobileSwiper() {
		const isMobile = window.innerWidth <= 767.98;

		if (mobileSwiper && !isMobile) {
			mobileSwiper.destroy(true, true);
			mobileSwiper = null;
			return;
		}

		if (!mobileSwiper && isMobile) {
			mobileSwiper = new Swiper(aboutHomwSwiper, {
				slidesPerView: 1,
				spaceBetween: 30,
				centeredSlides: false,
				speed: 800,
				autoHeight: true,
				navigation: {
					nextEl: '.home-about__nav-next',
					prevEl: '.home-about__nav-prev',
				},
				breakpoints: {
					460: {
						spaceBetween: 12,
					},
				}
			});
		}
	}

	toggleMobileSwiper();

	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(toggleMobileSwiper, 120);
	});
}


// const mobileSwiperContainers = document.querySelectorAll('[data-mobile-swiper]');

// if (mobileSwiperContainers) {
// 	const mobileSwipers = [];

// 	function toggleMobileSwipers() {
// 		const isMobile = window.innerWidth <= 767.98;

// 		mobileSwiperContainers.forEach((container, index) => {
// 			if (mobileSwipers[index]) {
// 				if (!isMobile) {
// 					mobileSwipers[index].destroy(true, true);
// 					mobileSwipers[index] = null;
// 				}
// 				return;
// 			}

// 			if (isMobile) {
// 				const swiper = new Swiper(container, {
// 					slidesPerView: 1,
// 					spaceBetween: 30,
// 					centeredSlides: false,

// 					speed: 800,
// 					autoHeight: true,
// 					navigation: {
// 						nextEl: '.home-about__nav-next',
// 						prevEl: '.home-about__nav-prev',
// 					},
// 					breakpoints: {
// 						// when window width is >= 320px
// 						460: {
// 							spaceBetween: 12,
// 						},
// 					}
// 				});

// 				mobileSwipers[index] = swiper;
// 			}
// 		});
// 	}

// 	toggleMobileSwipers();

// 	let resizeTimer;
// 	window.addEventListener('resize', () => {
// 		clearTimeout(resizeTimer);
// 		resizeTimer = setTimeout(toggleMobileSwipers, 120);
// 	});
// }

const inventoryHomeSwiper = document.querySelector('.home-locations__swiper');
if (inventoryHomeSwiper) {
	const swiper = new Swiper(inventoryHomeSwiper, {
		spaceBetween: 30,
		speed: 800,
		slidesPerView: 1,
		
		observer: true,      
		observeParents: true,  
		loop: true,
		pagination: {
			el: '.home-locations__pagination',
			clickable: true,
		},
		breakpoints: {
			// when window width is >= 320px
			768: {
				direction: "vertical",
			},
		}
	});
}

const reviewsHomeSwiper = document.querySelector('.body-home-reviews__swiper');

if (reviewsHomeSwiper) {
	const swiper = new Swiper(reviewsHomeSwiper, {
		spaceBetween: 30,
		speed: 800,
		slidesPerView:1,
		pagination: {
			el: '.body-home-reviews__progress-line',
			type: 'progressbar',
		},
		navigation: {
			nextEl: '.body-home-reviews__button-next',
			prevEl: '.body-home-reviews__button-prev',
		},
		breakpoints: {
			// when window width is >= 320px
			992: {
				slidesPerView: 2.5,
			},
			830: {
				slidesPerView: 2,
			},
			600: {
				slidesPerView: 1.5,
			},
		}
	});
}

const statsHomeSwiper = document.querySelector('.content-home-stats__swiper');

if (statsHomeSwiper) {
	let mobileSwiper = null;

	function toggleMobileSwiper() {
		const isMobile = window.innerWidth <= 767.98;

		if (mobileSwiper && !isMobile) {
			mobileSwiper.destroy(true, true);
			mobileSwiper = null;
			return;
		}

		if (!mobileSwiper && isMobile) {
			mobileSwiper = new Swiper(statsHomeSwiper, {
				slidesPerView: 1.2,
				spaceBetween: 16,
				centeredSlides: true,
				speed: 800,
				autoHeight: true,
				
				breakpoints: {
					460: {
						spaceBetween: 20,
					},
				}
			});
		}
	}

	toggleMobileSwiper();

	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(toggleMobileSwiper, 120);
	});
}