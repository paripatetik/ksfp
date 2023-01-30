'use strict'
if (document.querySelector(".icon-menu")) {

    document.addEventListener("click", function (e) {
        if (e.target.closest('.icon-menu')) {
            document.documentElement.classList.toggle("menu-open");
            document.documentElement.classList.toggle('lock');
        }
    });
};

window.addEventListener('load', windwoLoad);


function windwoLoad() {

    document.body.classList.add('loaded');

    if(document.querySelector('.main-slider')){
        new Swiper('.main-slider', {
            speed: 2000,
            effect: 'slide',

            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.bullets__items',
                type: 'bullets',
                clickable: true,
              },
        });
    }

    const items = document.querySelectorAll('[data-item]');

    const options = {
        threshold: 0.2
    }

    const callback = (entries) =>{
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active')
            }
        });
    }

    const observer = new IntersectionObserver(callback, options);

    items.forEach(item =>{
        observer.observe(item)
    });
}

//======

document.addEventListener("DOMContentLoaded", (e)=> {

    //dom об'єкти елементів контролю
              var av = document.getElementById("av-tag");
              var playTime = document.getElementsByClassName("play-time")[0];
              var playBtn=document.getElementsByClassName("play-btn")[0];
              var curTime=document.getElementById("cur-time");
              var volume = document.getElementById("volume");
              var speaker=document.getElementById("speaker");
    
    //змінна для того, щоб відстежувати чи відбувається відтворення звуку
              var isPlaying = false;
    
              av.onloadedmetadata = function() {
                curTime.max=av.duration;
                };
                
    //функція виведення поточного часу відтворення
              av.ontimeupdate=function() {
                
                  var sec_num = av.currentTime;
                  var hours   = Math.floor(sec_num / 3600);
                  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                  var seconds = sec_num - (hours * 3600) - (minutes * 60);
                  seconds=Math.round(seconds);
    
                  if (hours < 10) {
                    hours   = "0"+hours;
                  }
                  if (minutes < 10) {
                    minutes = "0"+minutes;
                  }
                  if (seconds < 10) { seconds = "0"+seconds; } playTime.innerHTML = minutes+':'+seconds; 
                  if(isPlaying) curTime.value=av.currentTime; 
             }; 
    //функція для встановлення гучності
             volume.onchange=function() { 
    
                  av.volume = volume.value/10;
             }; 
    //функція для встановлення початку відтворення
             curTime.onchange=function() { 
    
                  av.pause(); av.currentTime=curTime.value; av.play(); 
             }; 
    //функція для вімк/вивмк гучності
             speaker.onclick=function() { 
             
              if(volume.value==0) { 
                 volume.value=10; av.volume=1;
              } else { 
                 volume.value=0; av.volume=0;
              } }; 
    //функція для play/pause та зображення кнопки відтворення
             playBtn.addEventListener("click", (a)=> {
    
              if(isPlaying)
              {
                av.pause();
                isPlaying=false;
                playBtn.innerHTML="<img src='img/smile.png' alt='#' class='img-audio pause-smile' active>";
              }
              else
              {
                av.play();
                isPlaying=true;
                playBtn.innerHTML="<img src='img/smile.png' alt='#' class='img-audio play-smile'>";
              }
              
            });
    
    
});

//========
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
};
function FLS(message) {
	setTimeout(() => {
		if (window.FLS) {
			console.log(message);
		}
	}, 0);
};
const flsModules = {};
function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); }
};
function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove("menu-open");
};
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = '';
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = 'header.header';
			const headerElement = document.querySelector(headerItem);
			if (!headerElement.classList.contains('_header-scroll')) {
				headerElement.style.cssText = `transition-duration: 0s;`;
				headerElement.classList.add('_header-scroll');
				headerItemHeight = headerElement.offsetHeight;
				headerElement.classList.remove('_header-scroll');
				setTimeout(() => {
					headerElement.style.cssText = ``;
				}, 0);
			} else {
				headerItemHeight = headerElement.offsetHeight;
			}
		}
		let options = {
			speedAsDuration: true,
			speed: speed,
			header: headerItem,
			offset: offsetTop,
			easing: 'easeOutQuad',
		};
		// Закриваємо меню, якщо воно відкрите
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;

		if (typeof SmoothScroll !== 'undefined') {
			// Прокручування з використанням доповнення
			new SmoothScroll().animateScroll(targetBlockElement, '', options);
		} else {
			// Прокручування стандартними засобами
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		}
		FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
	} else {
		FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
	}
};
let bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        setTimeout((() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = "0px";
            }
            body.style.paddingRight = "0px";
            document.documentElement.classList.remove("lock");
        }), delay);
        bodyLockStatus = false;
        setTimeout((function() {
            bodyLockStatus = true;
        }), delay);
    }
};
let bodyLockStatus = true;
let addWindowScrollEvent = false;

function pageNavigation() {
	// data-goto - вказати ID блоку
	// data-goto-header - враховувати header
	// data-goto-top - недокрутити на вказаний розмір
	// data-goto-speed - швидкість (тільки якщо використовується додатковий плагін)
	// Працюємо при натисканні на пункт
	document.addEventListener("click", pageNavigationAction);
	// Якщо підключено scrollWatcher, підсвічуємо поточний пункт меню
	document.addEventListener("watcherCallback", pageNavigationAction);
	// Основна функція
	function pageNavigationAction(e) {
		if (e.type === "click") {
			const targetElement = e.target;
			if (targetElement.closest('[data-goto]')) {
				const gotoLink = targetElement.closest('[data-goto]');
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
				const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				if (flsModules.fullpage) {
					const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest('[data-fp-section]');
					const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
					if (fullpageSectionId !== null) {
						flsModules.fullpage.switchingSection(fullpageSectionId);
						document.documentElement.classList.contains("menu-open") ? menuClose() : null;
					}
				} else {
					gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				}
				e.preventDefault();
			}
		} else if (e.type === "watcherCallback" && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			// Обробка пунктів навігації, якщо вказано значення navigator, підсвічуємо поточний пункт меню
			if (targetElement.dataset.watch === 'navigator') {
				const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
					navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
				} else if (targetElement.classList.length) {
					for (let index = 0; index < targetElement.classList.length; index++) {
						const element = targetElement.classList[index];
						if (document.querySelector(`[data-goto=".${element}"]`)) {
							navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
							break;
						}
					}
				}
				if (entry.isIntersecting) {
					// Бачимо об'єкт
					// navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
					navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
				} else {
					// Не бачимо об'єкт
					navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
				}
			}
		}
	}
	// Прокручування по хешу
	if (getHash()) {
		let goToHash;
		if (document.querySelector(`#${getHash()}`)) {
			goToHash = `#${getHash()}`;
		} else if (document.querySelector(`.${getHash()}`)) {
			goToHash = `.${getHash()}`;
		}
		goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
	}
}
pageNavigation();






class ScrollWatcher {
	constructor(props) {
		let defaultConfig = {
			logging: true,
		}
		this.config = Object.assign(defaultConfig, props);
		this.observer;
		!document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
	}
	// Оновлюємо конструктор
	scrollWatcherUpdate() {
		this.scrollWatcherRun();
	}
	// Запускаємо конструктор
	scrollWatcherRun() {
		document.documentElement.classList.add('watcher');
		this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
	}
	// Конструктор спостерігачів
	scrollWatcherConstructor(items) {
		if (items.length) {
			this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
			// Унікалізуємо параметри
			let uniqParams = uniqArray(Array.from(items).map(function (item) {
				return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
			}));
			// Отримуємо групи об'єктів з однаковими параметрами,
			// створюємо налаштування, ініціалізуємо спостерігач
			uniqParams.forEach(uniqParam => {
				let uniqParamArray = uniqParam.split('|');
				let paramsWatch = {
					root: uniqParamArray[0],
					margin: uniqParamArray[1],
					threshold: uniqParamArray[2]
				}
				let groupItems = Array.from(items).filter(function (item) {
					let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
					let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
					let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
					if (
						String(watchRoot) === paramsWatch.root &&
						String(watchMargin) === paramsWatch.margin &&
						String(watchThreshold) === paramsWatch.threshold
					) {
						return item;
					}
				});

				let configWatcher = this.getScrollWatcherConfig(paramsWatch);

				// Ініціалізація спостерігача зі своїми налаштуваннями
				this.scrollWatcherInit(groupItems, configWatcher);
			});
		} else {
			this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
		}
	}
	// Функція створення налаштувань
	getScrollWatcherConfig(paramsWatch) {
		//Створюємо налаштування
		let configWatcher = {}
		// Батько, у якому ведеться спостереження
		if (document.querySelector(paramsWatch.root)) {
			configWatcher.root = document.querySelector(paramsWatch.root);
		} else if (paramsWatch.root !== 'null') {
			this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
		}
		// Відступ спрацьовування
		configWatcher.rootMargin = paramsWatch.margin;
		if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
			this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
			return
		}
		// Точки спрацьовування
		if (paramsWatch.threshold === 'prx') {
			// Режим паралаксу
			paramsWatch.threshold = [];
			for (let i = 0; i <= 1.0; i += 0.005) {
				paramsWatch.threshold.push(i);
			}
		} else {
			paramsWatch.threshold = paramsWatch.threshold.split(',');
		}
		configWatcher.threshold = paramsWatch.threshold;

		return configWatcher;
	}
	// Функція створення нового спостерігача зі своїми налаштуваннями
	scrollWatcherCreate(configWatcher) {
		this.observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				this.scrollWatcherCallback(entry, observer);
			});
		}, configWatcher);
	}
	// Функція ініціалізації спостерігача зі своїми налаштуваннями
	scrollWatcherInit(items, configWatcher) {
		// Створення нового спостерігача зі своїми налаштуваннями
		this.scrollWatcherCreate(configWatcher);
		// Передача спостерігачеві елементів
		items.forEach(item => this.observer.observe(item));
	}
	// Функція обробки базових дій точок спрацьовування
	scrollWatcherIntersecting(entry, targetElement) {
		if (entry.isIntersecting) {
			// Бачимо об'єкт
			// Додаємо клас
			!targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null;
			this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
		} else {
			// Не бачимо об'єкт
			// Забираємо клас
			targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null;
			this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
		}
	}
	// Функція відключення стеження за об'єктом
	scrollWatcherOff(targetElement, observer) {
		observer.unobserve(targetElement);
		this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
	}
	// Функція виведення в консоль
	scrollWatcherLogging(message) {
		this.config.logging ? FLS(`[Спостерігач]: ${message}`) : null;
	}
	// Функція обробки спостереження
	scrollWatcherCallback(entry, observer) {
		const targetElement = entry.target;
		// Обробка базових дій точок спрацьовування
		this.scrollWatcherIntersecting(entry, targetElement);
		// Якщо є атрибут data-watch-once прибираємо стеження
		targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
		// Створюємо свою подію зворотного зв'язку
		document.dispatchEvent(new CustomEvent("watcherCallback", {
			detail: {
				entry: entry
			}
		}));

		/*
		// Вибираємо потрібні об'єкти
		if (targetElement.dataset.watch === 'some value') {
			// пишемо унікальну специфіку
		}
		if (entry.isIntersecting) {
			//Бачимо об'єкт
		} else {
			//Не бачимо об'єкт
		}
		*/
	}
}
// Запускаємо та додаємо в об'єкт модулів
flsModules.watcher = new ScrollWatcher({});
    

//===== 

let spoon = document.querySelector('.bonus__spoon button');
let bonus = document.querySelector('.bonus__text');
let banka = document.querySelector('.bonus__banka');
let count = 0;
spoon.addEventListener('click', (e)=>{
	bonus.classList.add('active');
	if(count==3){
		banka.classList.add('active');
		count = 0; 
		window.setTimeout(function(){
			banka.classList.remove('active');
		}, 2000);
	}
	count++;
});


///
class FullPage {
	constructor(element, options) {
		let config = {
			//===============================
			// Селектор, на якому не працює подія свайпа/колеса
			noEventSelector: '[data-no-event]',
			//===============================
			// Налаштування оболонки
			// Клас при ініціалізації плагіна
			сlassInit: 'fp-init',
			// Клас для врапера під час гортання
			wrapperAnimatedClass: 'fp-switching',
			//===============================
			// Налаштування секцій
			// СЕЛЕКТОР для секцій
			selectorSection: '[data-fp-section]',
			// Клас для активної секції
			activeClass: 'active-section',
			// Клас для Попередньої секції
			previousClass: 'previous-section',
			// Клас для наступної секції
			nextClass: 'next-section',
			// id початково активного класу
			idActiveSection: 0,
			//===============================
			// Інші налаштування
			// Свайп мишею
			// touchSimulator: false,
			//===============================
			// Ефекти
			// Ефекти: fade, cards, slider
			mode: element.dataset.fpEffect ? element.dataset.fpEffect : 'slider',
			//===============================
			// Булети
			// Активація буллетів
			bullets: element.hasAttribute('data-fp-bullets') ? true : false,
			// Клас оболонки буллетів
			bulletsClass: 'fp-bullets',
			// Клас буллета
			bulletClass: 'fp-bullet',
			// Клас активного буллета
			bulletActiveClass: 'fp-bullet-active',
			//===============================
			// Події
			// Подія створення
			onInit: function () { },
			// Подія перегортання секції
			onSwitching: function () { },
			// Подія руйнування плагіна
			onDestroy: function () { },
		}
		this.options = Object.assign(config, options);
		// Батьківський єлемент
		this.wrapper = element;
		this.sections = this.wrapper.querySelectorAll(this.options.selectorSection);
		// Активний слайд
		this.activeSection = false;
		this.activeSectionId = false;
		// Попередній слайд
		this.previousSection = false;
		this.previousSectionId = false;
		// Наступний слайд
		this.nextSection = false;
		this.nextSectionId = false;
		// Оболонка буллетів
		this.bulletsWrapper = false;
		// Допоміжна змінна
		this.stopEvent = false;
		if (this.sections.length) {
			// Ініціалізація елементів
			this.init();
		}
	}
	//===============================
	// Початкова ініціалізація
	init() {
		if (this.options.idActiveSection > (this.sections.length - 1)) return
		// Розставляємо id
		this.setId();
		this.activeSectionId = this.options.idActiveSection;
		// Присвоєння класів із різними ефектами
		this.setEffectsClasses();
		// Встановлення класів
		this.setClasses();
		// Встановлення стилів
		this.setStyle();
		// Встановлення булетів
		if (this.options.bullets) {
			this.setBullets();
			this.setActiveBullet(this.activeSectionId);
		}
		// Встановлення подій
		this.events();
		// Встановлюємо init клас
		setTimeout(() => {
			document.documentElement.classList.add(this.options.сlassInit);
			// Створення кастомної події
			this.options.onInit(this);
			document.dispatchEvent(new CustomEvent("fpinit", {
				detail: {
					fp: this
				}
			}));
		}, 0);
	}
	//===============================
	// Видалити
	destroy() {
		// Видалення подій
		this.removeEvents();
		// Видалення класів у секцій
		this.removeClasses();
		// Видалення класу ініціалізації
		document.documentElement.classList.remove(this.options.сlassInit);
		// Видалення класу анімації
		this.wrapper.classList.remove(this.options.wrapperAnimatedClass);
		// Видалення класів ефектів
		this.removeEffectsClasses();
		// Видалення z-index у секцій
		this.removeZIndex();
		// Видалення стилів
		this.removeStyle();
		// Видалення ID
		this.removeId();
		// Створення кастомної події
		this.options.onDestroy(this);
		document.dispatchEvent(new CustomEvent("fpdestroy", {
			detail: {
				fp: this
			}
		}));
	}
	//===============================
	// Встановлення ID для секцій
	setId() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.setAttribute('data-fp-id', index);
		}
	}
	//===============================
	// Видалення ID для секцій
	removeId() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.removeAttribute('data-fp-id');
		}
	}
	//===============================
	// Функція встановлення класів для першої, активної та наступної секцій
	setClasses() {
		// Збереження id для ПОПЕРЕДНЬОГО слайду (якщо такий є)
		this.previousSectionId = (this.activeSectionId - 1) >= 0 ?
			this.activeSectionId - 1 : false;

		// Збереження id для НАСТУПНОГО слайду (якщо такий є)
		this.nextSectionId = (this.activeSectionId + 1) < this.sections.length ?
			this.activeSectionId + 1 : false;

		// Встановлення класу та присвоєння елемента для АКТИВНОГО слайду
		this.activeSection = this.sections[this.activeSectionId];
		this.activeSection.classList.add(this.options.activeClass);

		// Встановлення класу та присвоєння елементу для ПОПЕРЕДНЬОГО слайду
		if (this.previousSectionId !== false) {
			this.previousSection = this.sections[this.previousSectionId];
			this.previousSection.classList.add(this.options.previousClass);
		} else {
			this.previousSection = false;
		}

		// Встановлення класу та присвоєння елемента для НАСТУПНОГО слайду
		if (this.nextSectionId !== false) {
			this.nextSection = this.sections[this.nextSectionId];
			this.nextSection.classList.add(this.options.nextClass);
		} else {
			this.nextSection = false;
		}
	}
	//===============================
	// Присвоєння класів із різними ефектами
	removeEffectsClasses() {
		switch (this.options.mode) {
			case 'slider':
				this.wrapper.classList.remove('slider-mode');
				break;

			case 'cards':
				this.wrapper.classList.remove('cards-mode');
				this.setZIndex();
				break;

			case 'fade':
				this.wrapper.classList.remove('fade-mode');
				this.setZIndex();
				break;

			default:
				break;
		}
	}
	//===============================
	// Присвоєння класів із різними ефектами
	setEffectsClasses() {
		switch (this.options.mode) {
			case 'slider':
				this.wrapper.classList.add('slider-mode');
				break;

			case 'cards':
				this.wrapper.classList.add('cards-mode');
				this.setZIndex();
				break;

			case 'fade':
				this.wrapper.classList.add('fade-mode');
				this.setZIndex();
				break;

			default:
				break;
		}
	}
	//===============================
	// Блокування напрямків скролла
	//===============================
	// Функція встановлення стилів
	setStyle() {
		switch (this.options.mode) {
			case 'slider':
				this.styleSlider();
				break;

			case 'cards':
				this.styleCards();
				break;

			case 'fade':
				this.styleFade();
				break;
			default:
				break;
		}
	}
	// slider-mode
	styleSlider() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			if (index === this.activeSectionId) {
				section.style.transform = 'translate3D(0,0,0)';
			} else if (index < this.activeSectionId) {
				section.style.transform = 'translate3D(0,-100%,0)';
			} else if (index > this.activeSectionId) {
				section.style.transform = 'translate3D(0,100%,0)';
			}
		}
	}
	// cards mode
	styleCards() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			if (index >= this.activeSectionId) {
				section.style.transform = 'translate3D(0,0,0)';
			} else if (index < this.activeSectionId) {
				section.style.transform = 'translate3D(0,-100%,0)';
			}
		}
	}
	// fade style 
	styleFade() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			if (index === this.activeSectionId) {
				section.style.opacity = '1';
				section.style.visibility = 'visible';
			} else {
				section.style.opacity = '0';
				section.style.visibility = 'hidden';
			}
		}
	}
	//===============================
	// Видалення стилів
	removeStyle() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.style.opacity = '';
			section.style.visibility = '';
			section.style.transform = '';
		}
	}
	//===============================
	// Функція перевірки чи повністю було прокручено елемент
	checkScroll(yCoord, element) {
		this.goScroll = false;

		// Чи є елемент і чи готовий до роботи 
		if (!this.stopEvent && element) {
			this.goScroll = true;
			// Якщо висота секції не дорівнює висоті вікна
			if (this.haveScroll(element)) {
				this.goScroll = false;
				const position = Math.round(element.scrollHeight - element.scrollTop);
				// Перевірка на те, чи повністю прокручена секція
				if (
					((Math.abs(position - element.scrollHeight) < 2) && yCoord <= 0) ||
					((Math.abs(position - element.clientHeight) < 2) && yCoord >= 0)
				) {
					this.goScroll = true;
				}
			}
		}
	}
	//===============================
	// Перевірка висоти 
	haveScroll(element) {
		return element.scrollHeight !== window.innerHeight
	}
	//===============================
	// Видалення класів 
	removeClasses() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.classList.remove(this.options.activeClass);
			section.classList.remove(this.options.previousClass);
			section.classList.remove(this.options.nextClass);
		}
	}
	//===============================
	// Збірник подій...
	events() {
		this.events = {
			// Колесо миші
			wheel: this.wheel.bind(this),

			// Свайп
			touchdown: this.touchDown.bind(this),
			touchup: this.touchUp.bind(this),
			touchmove: this.touchMove.bind(this),
			touchcancel: this.touchUp.bind(this),

			// Кінець анімації
			transitionEnd: this.transitionend.bind(this),

			// Клік для буллетів
			click: this.clickBullets.bind(this),
		}
		if (isMobile.iOS()) {
			document.addEventListener('touchmove', (e) => {
				e.preventDefault();
			});
		}
		this.setEvents();
	}
	setEvents() {
		// Подія колеса миші
		this.wrapper.addEventListener('wheel', this.events.wheel);
		// Подія натискання на екран
		this.wrapper.addEventListener('touchstart', this.events.touchdown);
		// Подія кліка по булетах
		if (this.options.bullets && this.bulletsWrapper) {
			this.bulletsWrapper.addEventListener('click', this.events.click);
		}
	}
	removeEvents() {
		this.wrapper.removeEventListener('wheel', this.events.wheel);
		this.wrapper.removeEventListener('touchdown', this.events.touchdown);
		this.wrapper.removeEventListener('touchup', this.events.touchup);
		this.wrapper.removeEventListener('touchcancel', this.events.touchup);
		this.wrapper.removeEventListener('touchmove', this.events.touchmove);
		if (this.bulletsWrapper) {
			this.bulletsWrapper.removeEventListener('click', this.events.click);
		}
	}
	//===============================
	// Функція кліка по булетах
	clickBullets(e) {
		// Натиснутий буллет
		const bullet = e.target.closest(`.${this.options.bulletClass}`);
		if (bullet) {
			// Масив усіх буллетів
			const arrayChildren = Array.from(this.bulletsWrapper.children);

			// id Натиснутого буллета
			const idClickBullet = arrayChildren.indexOf(bullet)

			// Перемикання секції
			this.switchingSection(idClickBullet)
		}
	}
	//===============================
	// Установка стилів для буллетів
	setActiveBullet(idButton) {
		if (!this.bulletsWrapper) return
		// Усі буллети
		const bullets = this.bulletsWrapper.children;

		for (let index = 0; index < bullets.length; index++) {
			const bullet = bullets[index];
			if (idButton === index) bullet.classList.add(this.options.bulletActiveClass);
			else bullet.classList.remove(this.options.bulletActiveClass);
		}
	}
	//===============================
	// Функція натискання тач/пера/курсора
	touchDown(e) {
		// Змінна для свайпа
		this._yP = e.changedTouches[0].pageY;
		this._eventElement = e.target.closest(`.${this.options.activeClass}`);
		if (this._eventElement) {
			// Вішаємо подію touchmove та touchup
			this._eventElement.addEventListener('touchend', this.events.touchup);
			this._eventElement.addEventListener('touchcancel', this.events.touchup);
			this._eventElement.addEventListener('touchmove', this.events.touchmove);
			// Тач стався
			this.clickOrTouch = true;

			//==============================
			if (isMobile.iOS()) {
				if (this._eventElement.scrollHeight !== this._eventElement.clientHeight) {
					if (this._eventElement.scrollTop === 0) {
						this._eventElement.scrollTop = 1;
					}
					if (this._eventElement.scrollTop === this._eventElement.scrollHeight - this._eventElement.clientHeight) {
						this._eventElement.scrollTop = this._eventElement.scrollHeight - this._eventElement.clientHeight - 1;
					}
				}
				this.allowUp = this._eventElement.scrollTop > 0;
				this.allowDown = this._eventElement.scrollTop < (this._eventElement.scrollHeight - this._eventElement.clientHeight);
				this.lastY = e.changedTouches[0].pageY;
			}
			//===============================

		}


	}
	//===============================
	// Подія руху тач/пера/курсора
	touchMove(e) {
		// Отримання секції, на якій спрацьовує подію
		const targetElement = e.target.closest(`.${this.options.activeClass}`);
		//===============================
		if (isMobile.iOS()) {
			let up = e.changedTouches[0].pageY > this.lastY;
			let down = !up;
			this.lastY = e.changedTouches[0].pageY;
			if (targetElement) {
				if ((up && this.allowUp) || (down && this.allowDown)) {
					e.stopPropagation();
				} else if (e.cancelable) {
					e.preventDefault();
				}
			}
		}
		//===============================
		// Перевірка на завершення анімації та наявність НЕ ПОДІЙНОГО блоку
		if (!this.clickOrTouch || e.target.closest(this.options.noEventSelector)) return
		// Отримання напряму руху
		let yCoord = this._yP - e.changedTouches[0].pageY;
		// Чи дозволено перехід? 
		this.checkScroll(yCoord, targetElement);
		// Перехід
		if (this.goScroll && Math.abs(yCoord) > 20) {
			this.choiceOfDirection(yCoord);
		}
	}
	//===============================
	// Подія відпускання від екрану тач/пера/курсора
	touchUp(e) {
		// Видалення подій
		this._eventElement.removeEventListener('touchend', this.events.touchup);
		this._eventElement.removeEventListener('touchcancel', this.events.touchup);
		this._eventElement.removeEventListener('touchmove', this.events.touchmove);
		return this.clickOrTouch = false;
	}
	//===============================
	// Кінець спрацьовування переходу
	transitionend(e) {
		if (e.target.closest(this.options.selectorSection)) {
			this.stopEvent = false;
			this.wrapper.classList.remove(this.options.wrapperAnimatedClass);
		}
	}
	//===============================
	// Подія прокручування колесом миші
	wheel(e) {
		// Перевірка на наявність НЕ ПОДІЙНОГО блоку
		if (e.target.closest(this.options.noEventSelector)) return
		// Отримання напряму руху
		const yCoord = e.deltaY;
		// Отримання секції, на якій спрацьовує подію
		const targetElement = e.target.closest(`.${this.options.activeClass}`);
		// Чи дозволено перехід? 
		this.checkScroll(yCoord, targetElement);
		// Перехід
		if (this.goScroll) this.choiceOfDirection(yCoord);
	}
	//===============================
	// Функція вибору напряму
	choiceOfDirection(direction) {
		// Зупиняємо роботу подій
		this.stopEvent = true;

		// Якщо слайд крайні, то дозволяємо події
		if (((this.activeSectionId === 0) && direction < 0) || ((this.activeSectionId === (this.sections.length - 1)) && direction > 0)) {
			this.stopEvent = false;
		}

		// Встановлення потрібних id
		if (direction > 0 && this.nextSection !== false) {
			this.activeSectionId = (this.activeSectionId + 1) < this.sections.length ?
				++this.activeSectionId : this.activeSectionId;
		} else if (direction < 0 && this.previousSection !== false) {
			this.activeSectionId = (this.activeSectionId - 1) >= 0 ?
				--this.activeSectionId : this.activeSectionId;
		}

		// Зміна слайдів
		if (this.stopEvent) this.switchingSection();
	}
	//===============================
	// Функція перемикання слайдів
	switchingSection(idSection = this.activeSectionId) {
		this.activeSectionId = idSection;
		// Встановлення події закінчення програвання анімації
		this.wrapper.classList.add(this.options.wrapperAnimatedClass);
		this.wrapper.addEventListener('transitionend', this.events.transitionEnd);
		// Видалення класів
		this.removeClasses();
		// Зміна класів 
		this.setClasses();
		// Зміна стилів
		this.setStyle();
		// Встановлення стилів для буллетів
		if (this.options.bullets) this.setActiveBullet(this.activeSectionId);
		// Створення події
		this.options.onSwitching(this);
		document.dispatchEvent(new CustomEvent("fpswitching", {
			detail: {
				fp: this
			}
		}));
	}
	//===============================
	// Встановлення булетів
	setBullets() {
		// Пошук оболонки буллетів
		this.bulletsWrapper = document.querySelector(`.${this.options.bulletsClass}`);

		// Якщо немає створюємо
		if (!this.bulletsWrapper) {
			const bullets = document.createElement('div');
			bullets.classList.add(this.options.bulletsClass);
			this.wrapper.append(bullets);
			this.bulletsWrapper = bullets;
		}

		// Створення буллетів
		if (this.bulletsWrapper) {
			for (let index = 0; index < this.sections.length; index++) {
				const span = document.createElement('span');
				span.classList.add(this.options.bulletClass);
				this.bulletsWrapper.append(span);
			}
		}
	}
	//===============================
	// Z-INDEX
	setZIndex() {
		let zIndex = this.sections.length
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.style.zIndex = zIndex;
			--zIndex;
		}
	}
	removeZIndex() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.style.zIndex = ''
		}
	}
}
// Запускаємо та додаємо в об'єкт модулів
if (document.querySelector('[data-fp]')) {
	flsModules.fullpage = new FullPage(document.querySelector('[data-fp]'), '');
}