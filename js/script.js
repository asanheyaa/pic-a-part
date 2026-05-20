// burger-menu
const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', (e) => {
	burgerMenu.classList.toggle('_active');
	document.querySelector('.header-menu').classList.toggle('_active');
	document.body.classList.toggle('_lock');
});

// A function that moves elements to other blocks depending on the size of the screen. (Used when adapting the page to different devices.)
function dynamicAdaptiv() {
	class DynamicAdapt {
		constructor(type) {
			this.type = type
		}

		init() {
			// массив объектов
			this.оbjects = []
			this.daClassname = '_dynamic_adapt_'
			// массив DOM-элементов
			this.nodes = [...document.querySelectorAll('[data-da]')]

			// наполнение оbjects обьектами
			this.nodes.forEach((node) => {
				const data = node.dataset.da.trim()
				const dataArray = data.split(',')
				const оbject = {}
				оbject.element = node
				оbject.parent = node.parentNode
				оbject.destination = document.querySelector(`${dataArray[0].trim()}`)
				оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767'
				оbject.place = dataArray[2] ? dataArray[2].trim() : 'last'
				оbject.index = this.indexInParent(оbject.parent, оbject.element)
				this.оbjects.push(оbject)
			})
			this.arraySort(this.оbjects)

			// массив уникальных медиа-запросов
			this.mediaQueries = this.оbjects
				.map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
				.filter((item, index, self) => self.indexOf(item) === index)
			// навешивание слушателя на медиа-запрос
			// и вызов обработчика при первом запуске
			this.mediaQueries.forEach((media) => {
				const mediaSplit = media.split(',')
				const matchMedia = window.matchMedia(mediaSplit[0])
				const mediaBreakpoint = mediaSplit[1]

				// массив объектов с подходящим брейкпоинтом
				const оbjectsFilter = this.оbjects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint)
				matchMedia.addEventListener('change', () => {

					this.mediaHandler(matchMedia, оbjectsFilter)
				})
				this.mediaHandler(matchMedia, оbjectsFilter)
			})
		}

		// Основная функция
		mediaHandler(matchMedia, оbjects) {
			if (matchMedia.matches) {
				оbjects.forEach((оbject) => {
					// оbject.index = this.indexInParent(оbject.parent, оbject.element);
					this.moveTo(оbject.place, оbject.element, оbject.destination)
				})
			} else {
				оbjects.forEach(({ parent, element, index }) => {
					if (element.classList.contains(this.daClassname)) {
						this.moveBack(parent, element, index)
					}
				})
			}
		}

		// Функция перемещения
		moveTo(place, element, destination) {
			element.classList.add(this.daClassname)
			if (place === 'last' || place >= destination.children.length) {
				destination.append(element)
				return
			}
			if (place === 'first') {
				destination.prepend(element)
				return
			}
			destination.children[place].before(element)
		}

		// Функция возврата
		moveBack(parent, element, index) {
			element.classList.remove(this.daClassname)
			if (parent.children[index] !== undefined) {
				parent.children[index].before(element)
			} else {
				parent.append(element)
			}
		}

		// Функция получения индекса внутри родителя
		indexInParent(parent, element) {
			return [...parent.children].indexOf(element)
		}

		// Функция сортировки массива по breakpoint и place
		// по возрастанию для this.type = min
		// по убыванию для this.type = max
		arraySort(arr) {
			if (this.type === 'min') {
				arr.sort((a, b) => {
					if (a.breakpoint === b.breakpoint) {
						if (a.place === b.place) {
							return 0
						}
						if (a.place === 'first' || b.place === 'last') {
							return -1
						}
						if (a.place === 'last' || b.place === 'first') {
							return 1
						}
						return 0
					}
					return a.breakpoint - b.breakpoint
				})
			} else {
				arr.sort((a, b) => {
					if (a.breakpoint === b.breakpoint) {
						if (a.place === b.place) {
							return 0
						}
						if (a.place === 'first' || b.place === 'last') {
							return 1
						}
						if (a.place === 'last' || b.place === 'first') {
							return -1
						}
						return 0
					}
					return b.breakpoint - a.breakpoint
				})
				return
			}
		}
	}

	let da = new DynamicAdapt('max');
	da.init();
}

dynamicAdaptiv()

// dropdown Menu function
function selectMenu() {
	const selects = document.querySelectorAll('[data-select-menu]');

	// data-select-menu main data-atribute
	// data-select-menu-button open close dropdown menu
	// data-select-menu-value value of data-select-menu-button
	// data-select-menu-drop-down body of dropdown menu
	// data-select-menu-option options of dropdown menu

	if (selects) {

		document.documentElement.addEventListener('click', collapseSelects)

		selects.forEach(select => {

			const selectButton = select.querySelector('[data-select-menu-button]');
			const selectOptions = select.querySelectorAll('[data-select-menu-option]');

			selectButton.addEventListener('click', selectToggle)
			selectOptions.forEach(el => {
				el.addEventListener('click', selectChoose)
			});
		});



		function selectToggle(e) {
			const parent = e.target.closest('[data-select-menu]'),
				selectBody = parent.querySelector('[data-select-menu-drop-down]');
			parent.classList.toggle('_active')
			_slideToggle(selectBody, 300)
		}

		function selectChoose(e) {
			const parent = e.target.closest('[data-select-menu]'),
				selectValue = parent.querySelector('[data-select-menu-value]'),
				selectBody = parent.querySelector('[data-select-menu-drop-down]');
			let valueItem = this.innerText;
			selectValue.innerHTML = valueItem;
			parent.classList.remove('_active')
			_slideUp(selectBody, 300)
		}

		function collapseSelects(e) {
			const targetClick = e.target.closest('[data-select-menu]')
			selects.forEach(select => {
				if (!targetClick || targetClick !== select) {
					select.classList.remove('_active')
					const selectBody = select.querySelector('[data-select-menu-drop-down]');
					_slideUp(selectBody, 300)
				}
			});

		}

		let _slideUp = (target, duration = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');

				target.style.transitionProperty = 'height, margin, padding';
				target.style.transitionDuration = duration + 'ms';
				target.style.height = target.offsetHeight + 'px';
				target.offsetHeight;
				target.style.overflow = 'hidden';
				target.style.height = 0;
				target.style.paddingTop = 0;
				target.style.paddingBottom = 0;
				target.style.marginTop = 0;
				target.style.marginBottom = 0;
				window.setTimeout(() => {
					target.style.display = 'none';
					target.style.removeProperty('height');
					target.style.removeProperty('padding-top');
					target.style.removeProperty('padding-bottom');
					target.style.removeProperty('margin-top');
					target.style.removeProperty('margin-bottom');
					target.style.removeProperty('overflow');
					target.style.removeProperty('transition-duration');
					target.style.removeProperty('transition-property');
					target.classList.remove('_slide');
				}, duration);
			}
		}

		let _slideDown = (target, duration = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');

				target.style.removeProperty('display');
				let display = window.getComputedStyle(target).display;
				if (display === 'none')
					display = 'block'

				target.style.display = display;
				let height = target.offsetHeight;
				target.style.overflow = 'hidden';
				target.style.height = 0;
				target.style.paddingTop = 0;
				target.style.paddingBottom = 0;
				target.style.marginTop = 0;
				target.style.marginBottom = 0;
				target.offsetHeight;
				target.style.transitionProperty = 'height, margin, padding';
				target.style.transitionDuration = duration + 'ms';
				target.style.height = height + 'px';
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				window.setTimeout(() => {
					target.style.removeProperty('height');
					target.style.removeProperty('overflow');
					target.style.removeProperty('transition-duration');
					target.style.removeProperty('transition-property');
					target.classList.remove('_slide');
				}, duration);
			}

		}

		let _slideToggle = (target, duration = 500) => {
			if (window.getComputedStyle(target).display === 'none') {
				return _slideDown(target, duration);
			} else {
				_slideUp(target, duration);
			}
		}
	}


}

selectMenu()

// dropdown menu
const MatchMedia = {
	mobile: window.matchMedia(`(width <= 797.98px)`),
}
class BaseComponent {
	constructor() {
		if (this.constructor === BaseComponent) {
			throw new Error('Невозможно создать экземпляр абстрактного класса BaseComponent!')
		}
	}

	getProxyState(initialState) {
		return new Proxy(initialState, {
			get: (target, prop) => {
				return target[prop]
			},
			set: (target, prop, newValue) => {
				const oldValue = target[prop]

				target[prop] = newValue

				if (newValue !== oldValue) {
					this.updateUI()
				}

				return true
			},
		})
	}

	/**
	 * Перерисовка UI в ответ на обновление состояния
	 */
	updateUI() {
		throw new Error('Необходимо реализовать метод updateUI!')
	}
}
const rootSelector = '[data-js-select]'

class Select extends BaseComponent {
	selectors = {
		root: rootSelector,
		originalControl: '[data-js-select-original-control]',
		button: '[data-js-select-button]',
		dropdown: '[data-js-select-dropdown]',
		option: '[data-js-select-option]',
	}

	stateClasses = {
		isExpanded: 'is-expanded',
		isSelected: 'is-selected',
		isCurrent: 'is-current',
		isOnTheLeftSide: 'is-on-the-left-side',
		isOnTheRightSide: 'is-on-the-right-side',
	}

	stateAttributes = {
		ariaExpanded: 'aria-expanded',
		ariaSelected: 'aria-selected',
		ariaActiveDescendant: 'aria-activedescendant',
	}

	initialState = {
		isExpanded: false,
		currentOptionIndex: null,
		selectedOptionElement: null,
	}

	constructor(rootElement) {
		super()
		this.rootElement = rootElement
		this.originalControlElement = this.rootElement.querySelector(this.selectors.originalControl)
		this.buttonElement = this.rootElement.querySelector(this.selectors.button)
		this.dropdownElement = this.rootElement.querySelector(this.selectors.dropdown)
		this.optionElements = this.dropdownElement.querySelectorAll(this.selectors.option)
		this.state = this.getProxyState({
			...this.initialState,
			currentOptionIndex: this.originalControlElement.selectedIndex,
			selectedOptionElement: this.optionElements[this.originalControlElement.selectedIndex],
		})
		this.fixDropdownPosition()
		this.updateTabIndexes()
		this.bindEvents()
	}

	updateUI() {
		const {
			isExpanded,
			currentOptionIndex,
			selectedOptionElement,
		} = this.state

		const newSelectedOptionValue = selectedOptionElement.textContent.trim()

		const updateOriginalControl = () => {
			this.originalControlElement.value = newSelectedOptionValue
		}

		const updateButton = () => {
			this.buttonElement.textContent = newSelectedOptionValue
			this.buttonElement.classList.toggle(this.stateClasses.isExpanded, isExpanded)
			this.buttonElement.setAttribute(this.stateAttributes.ariaExpanded, isExpanded)
			this.buttonElement.setAttribute(
				this.stateAttributes.ariaActiveDescendant,
				this.optionElements[currentOptionIndex].id
			)
		}

		const updateDropdown = () => {
			this.dropdownElement.classList.toggle(this.stateClasses.isExpanded, isExpanded)
		}

		const updateOptions = () => {
			this.optionElements.forEach((optionElement, index) => {
				const isCurrent = currentOptionIndex === index
				const isSelected = selectedOptionElement === optionElement

				optionElement.classList.toggle(this.stateClasses.isCurrent, isCurrent)
				optionElement.classList.toggle(this.stateClasses.isSelected, isSelected)
				optionElement.setAttribute(this.stateAttributes.ariaSelected, isSelected)
			})
		}

		updateOriginalControl()
		updateButton()
		updateDropdown()
		updateOptions()
	}

	toggleExpandedState() {
		this.state.isExpanded = !this.state.isExpanded
	}

	expand() {
		this.state.isExpanded = true
	}

	collapse() {
		this.state.isExpanded = false
	}

	fixDropdownPosition() {
		const viewportWidth = document.documentElement.clientWidth
		const halfViewportX = viewportWidth / 2
		const { width, x } = this.buttonElement.getBoundingClientRect()
		const buttonCenterX = x + width / 2
		const isButtonOnTheLeftViewportSide = buttonCenterX < halfViewportX

		this.dropdownElement.classList.toggle(
			this.stateClasses.isOnTheLeftSide,
			isButtonOnTheLeftViewportSide
		)

		this.dropdownElement.classList.toggle(
			this.stateClasses.isOnTheRightSide,
			!isButtonOnTheLeftViewportSide
		)
	}

	updateTabIndexes(isMobileDevice = MatchMedia.mobile.matches) {
		this.originalControlElement.tabIndex = isMobileDevice ? 0 : -1
		this.buttonElement.tabIndex = isMobileDevice ? -1 : 0
	}

	get isNeedToExpand() {
		const isButtonFocused = document.activeElement === this.buttonElement

		return (!this.state.isExpanded && isButtonFocused)
	}

	selectCurrentOption() {
		this.state.selectedOptionElement = this.optionElements[this.state.currentOptionIndex]
	}

	onButtonClick = () => {
		this.toggleExpandedState()
	}

	onClick = (event) => {
		const { target } = event

		const isButtonClick = target === this.buttonElement
		const isOutsideDropdownClick =
			target.closest(this.selectors.dropdown) !== this.dropdownElement

		if (!isButtonClick && isOutsideDropdownClick) {
			this.collapse()
			return
		}

		const isOptionClick = target.matches(this.selectors.option)

		if (isOptionClick) {
			this.state.selectedOptionElement = target
			this.state.currentOptionIndex = [...this.optionElements]
				.findIndex((optionElement) => optionElement === target)
			this.collapse()
		}
	}

	onArrowUpKeyDown = () => {
		if (this.isNeedToExpand) {
			this.expand()
			return
		}

		if (this.state.currentOptionIndex > 0) {
			this.state.currentOptionIndex--
		}
	}

	onArrowDownKeyDown = () => {
		if (this.isNeedToExpand) {
			this.expand()
			return
		}

		if (this.state.currentOptionIndex < this.optionElements.length - 1) {
			this.state.currentOptionIndex++
		}
	}

	onSpaceKeyDown = () => {
		if (this.isNeedToExpand) {
			this.expand()
			return
		}

		this.selectCurrentOption()
		this.collapse()
	}

	onEnterKeyDown = () => {
		if (this.isNeedToExpand) {
			this.expand()
			return
		}

		this.selectCurrentOption()
		this.collapse()
	}

	onKeyDown = (event) => {
		const { code } = event

		const action = {
			ArrowUp: this.onArrowUpKeyDown,
			ArrowDown: this.onArrowDownKeyDown,
			Space: this.onSpaceKeyDown,
			Enter: this.onEnterKeyDown,
		}[code]

		if (action) {
			event.preventDefault()
			action()
		}
	}

	onMobileMatchMediaChange = (event) => {
		this.updateTabIndexes(event.matches)
	}

	onOriginalControlChange = () => {
		this.state.selectedOptionElement = this.optionElements[this.originalControlElement.selectedIndex]
	}

	bindEvents() {
		MatchMedia.mobile.addEventListener('change', this.onMobileMatchMediaChange)
		this.buttonElement.addEventListener('click', this.onButtonClick)
		document.addEventListener('click', this.onClick)
		this.rootElement.addEventListener('keydown', this.onKeyDown)
		this.originalControlElement.addEventListener('change', this.onOriginalControlChange)
	}
}

class SelectCollection {
	constructor() {
		this.init()
	}

	init() {
		document.querySelectorAll(rootSelector).forEach((element) => {
			new Select(element)
		})
	}
}

new SelectCollection()



// tabs function

function filterFunction() {
	const filters = document.querySelectorAll('[data-filter]');

	if (filters) {
		filters.forEach(filter => {
			const filterButtons = filter.querySelectorAll('[data-filter-category]');

			filterButtons.forEach(filterButton => {

				filterButton.addEventListener('click', (e) => {
					let filterSections = filter.querySelectorAll('[data-filter-content]')
					filterSections.forEach(filterSection => {
						if (filterSection.classList.contains('_show')) {
							filterSection.classList.remove('_show')
						}
						if (filterSection.classList.contains('_last-child')) {
							filterSection.classList.remove('_last-child')
						}

					});

					filterButtons.forEach(filterButton => {
						if (filterButton.classList.contains('_active')) {
							filterButton.classList.remove('_active')
						}
					});

					let seflButton = e.target,
						buttonId = seflButton.dataset.filterCategory

					if (buttonId === 'all') {
						filterSections.forEach((filterSection, index) => {
							filterSection.classList.add('_show')
							if (index === filterSections.length - 1) {
								filterSection.classList.add('_last-child')
							}
						});

					} else {
						const sectionsWithRightCategory = document.querySelectorAll(`[data-filter-content="${buttonId}"]`)

						sectionsWithRightCategory.forEach((sectionWithRightCategory, index) => {
							sectionWithRightCategory.classList.add('_show')
							if (index === sectionsWithRightCategory.length - 1) {
								sectionWithRightCategory.classList.add('_last-child')
							}
						});
					}

					seflButton.classList.add('_active')

				})
			});


		});
	}

}

filterFunction()

// PopUp function
function initPopups() {
	document.addEventListener('click', (e) => {
		const trigger = e.target.closest('[data-pop-up-trigger]');
		const activePopups = document.querySelectorAll('[data-pop-up-content]._active');
		if (trigger) {
			activePopups.forEach(activePopup => {
				activePopup.classList.remove('_active');
			});
			const id = trigger.dataset.popUpTrigger;
			const popup = document.querySelector(`[data-pop-up-content="${id}"]`);

			if (popup) {
				popup.classList.add('_active');
			}
			return; 
		}

	

		activePopups.forEach((popup) => {
			const id = popup.dataset.popUpContent
			if (!e.target.closest(`[data-pop-up-content]`)) {
				popup.classList.remove('_active');
			}
		});
	});
}

initPopups();


// spollers function

function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]');
	if (spollersArray.length > 0) {
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(',')[0];
		});

		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}
	}

	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(',')[0];
	});



	if (spollersMedia.length > 0) {

		const breakpoinsArray = [];
		spollersMedia.forEach((item) => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(',');
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
			breakpoint.item = item;
			breakpoinsArray.push(breakpoint);
		});

		let mediaQueries = breakpoinsArray.map((item) => {
			return '(' + item.type + "-width: " + item.value + 'px),' + item.value + ',' + item.type;
		});

		mediaQueries = mediaQueries.filter((item, index, self) => {
			return self.indexOf(item) === index;
		});

		mediaQueries.forEach((breakpoint) => {
			const paramsArray = breakpoint.split(',');
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			const spollersArray = breakpoinsArray.filter((item) => {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			matchMedia.addEventListener("change", function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}

	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach((spollersBlock) => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener('click', setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener('click', setSpollerAction)
			}
		});
	}

	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			})
		}
	}

	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollerBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();

		}
	}

	function hideSpollerBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}


	let _slideUp = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);

		}
	}

	let _slideDown = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (target.hidden) {
				target.hidden = false;
			}
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);

		}
	}

	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			_slideUp(target, duration);
		}
	}
}

spollers()
