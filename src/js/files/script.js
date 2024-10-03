// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

gsap.registerPlugin(ScrollTrigger);

// const lenis = new Lenis()
// lenis.on('scroll', (e) => {
//   // console.log(e)
// })
// lenis.on('scroll', ScrollTrigger.update)
// gsap.ticker.add((time)=>{
//   lenis.raf(time * 1000)
// })
// gsap.ticker.lagSmoothing(0)



document.addEventListener("DOMContentLoaded", function() {


  // 1. ПЛАВНАЯ ПРОКРУТКА СТРАНИЦЫ =========================
  function smoothScroll(smoothness = 0.08, inertia = 0.85) {
    let scrollPosition = window.pageYOffset;
    let targetPosition = scrollPosition;
    let isScrolling = false;
    let isDraggingScrollbar = false;
  
    function updateScroll() {
        scrollPosition += (targetPosition - scrollPosition) * smoothness;
        window.scrollTo(0, scrollPosition);
  
        if (Math.abs(targetPosition - scrollPosition) > 0.5) {
            requestAnimationFrame(updateScroll);
        } else {
            isScrolling = false;
        }
    }
  
    function startScroll(event) {
        if (!isDraggingScrollbar) {
            targetPosition += event.deltaY * inertia;
            targetPosition = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, targetPosition));
            event.preventDefault();
  
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(updateScroll);
            }
        }
    }
  
    function onScroll() {
        if (!isScrolling) {
            scrollPosition = window.pageYOffset;
            targetPosition = scrollPosition;
        }
    }
  
    function onMouseDown() {
        isDraggingScrollbar = true;
    }
  
    function onMouseUp() {
        isDraggingScrollbar = false;
        scrollPosition = window.pageYOffset;
        targetPosition = scrollPosition;
    }
  
    function initSmoothScroll() {
        if (document.body.getAttribute('data-smooth-scroll') === 'true') {
            window.addEventListener('wheel', startScroll, { passive: false });
            window.addEventListener('scroll', onScroll);
            window.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mouseup', onMouseUp);
        } else {
            window.removeEventListener('wheel', startScroll);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        }
    }
  
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-smooth-scroll') {
                initSmoothScroll();
            }
        });
    });
  
    observer.observe(document.body, { attributes: true });
  
    initSmoothScroll();
  }
  
  if (document.body.getAttribute('data-smooth-scroll') === 'true') {
    smoothScroll(0.1, 0.85);
  }
  // =======================================================================



    // == SPLIT TYPE =========================================================
    const splitTextLines = document.querySelectorAll('.split-lines');
    const splitTextWords = document.querySelectorAll('.split-words');
    const splitTextChars = document.querySelectorAll('.split-chars');
    const splitTextBoth = document.querySelectorAll('.split-both');
    const splitSetSpan = document.querySelectorAll('.split-words.set-span');
    
    function initSplitType() {
      // Если существуют элементы с классом .split-lines
      if (splitTextLines.length > 0) {
        splitTextLines.forEach(element => {
          new SplitType(element, { types: 'lines' });
        });
      }
    
      // Если существуют элементы с классом .split-words
      if (splitTextWords.length > 0) {
        splitTextWords.forEach(element => {
      new SplitType(element, { types: 'words' });

          // Проставляем индексы для всех слов
          const words = element.querySelectorAll('.word');
          words.forEach((word, index) => {
            word.style.setProperty('--index', index);
          });
        });
      }
    
      // Если существуют элементы с классом .split-chars
      if (splitTextChars.length > 0) {
        splitTextChars.forEach(element => {
      new SplitType(element, { types: 'chars' });

          const chars = element.querySelectorAll('.char');
          chars.forEach((char, index) => {
            char.style.setProperty('--index', index);
          });
        });
      }
    
      // Если существуют элементы с классом .split-both
      if (splitTextBoth.length > 0) {
        splitTextBoth.forEach(element => {
      new SplitType(element, { types: 'lines, words' });

          // Проставляем индексы для всех слов
          const words = element.querySelectorAll('.word');
          words.forEach((word, index) => {
            word.style.setProperty('--index', index);
          });
        });
  }

      // Добавляем <span> для каждого слова внутри .split-words.set-span
      if (splitSetSpan.length > 0) {
        splitSetSpan.forEach(splitSetSpan => {
          const words = splitSetSpan.querySelectorAll('.word');
          
          words.forEach(word => {
            const text = word.textContent.trim();
            word.innerHTML = `<span class="word-span">${text}</span>`;
          });
        });
      }
    }
    
    // Инициализация SplitType при загрузке
    initSplitType();
    
    // Создаем ResizeObserver для отслеживания изменений размера окна
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        initSplitType();
      });
    });
    // Наблюдаем за изменениями в элементе body (можно выбрать другой контейнер, если нужно)
    resizeObserver.observe(document.body);
    // =======================================================================



    setTimeout(() => {
  
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        ScrollTrigger.refresh();
      
        const heroSection = document.querySelector('.hero');
        const heroImg = document.querySelector('.hero__img');
        const logoAc = document.querySelector('.logo-ac');
      
        if (heroImg && logoAc) {
            const scrollPosY = window.pageYOffset;
      
            window.scrollTo(0, 0);
      
            function getOffset(el) {
              const rect = el.getBoundingClientRect();
              return {
                top: rect.top + window.pageYOffset,
                left: rect.left + window.pageXOffset,
                width: rect.width,
                height: rect.height
              };
            }
      
            const heroImgInitial = getOffset(heroImg);
            const logoAcPosition = getOffset(logoAc);
      
            window.scrollTo(0, scrollPosY);
      
            gsap.to(heroImg, {
              scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "80% center",
                scrub: 1,
                onEnter: () => {
                  // Удаляем класс при начале анимации
                  heroImg.classList.remove('_anim-end');
                  logoAc.classList.remove('_anim-end');
                },
                onUpdate: (self) => {
                  // Убираем класс, когда движение идет в обратном направлении
                  if (self.direction < 0) { // Если скроллим обратно (self.direction < 0)
                    heroImg.classList.remove('_anim-end');
                    logoAc.classList.remove('_anim-end');
                  }
                },
                onLeave: () => {
                  // Добавляем класс, когда скроллим до конца секции
                  heroImg.classList.add('_anim-end');
                  logoAc.classList.add('_anim-end');
                }
              },
              width: logoAcPosition.width,
              // left: logoAcPosition.left,
              left: logoAcPosition.left + logoAcPosition.width / 2,
              top: logoAcPosition.top,
              ease: "none",
            });
        }
    
    }, 200);
    
    





  });


  // Сброс скролла при перезагрузке страницы
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Сброс скролла при повороте экрана или изменении размеров окна
window.addEventListener('orientationchange', () => {
  window.scrollTo(0, 0);
  location.reload();
});

// window.addEventListener('resize', () => {
//   window.scrollTo(0, 0);
//   location.reload();
// });

let lastWindowWidth = window.innerWidth;

window.addEventListener('resize', () => {
  const currentWindowWidth = window.innerWidth;
  
  // Проверяем, изменилось ли значение ширины
  if (currentWindowWidth !== lastWindowWidth) {
    window.scrollTo(0, 0);
    location.reload(); // Обновляем страницу только при изменении ширины
  }
  
  // Обновляем значение ширины для будущих сравнений
  lastWindowWidth = currentWindowWidth;
});


function stopOverscroll(element) {
  element = gsap.utils.toArray(element)[0] || window;
  (element === document.body || element === document.documentElement) && (element = window);
    let lastScroll = 0,
    lastTouch,
    forcing,
    forward = true,
    isRoot = element === window,
    scroller = isRoot ? document.scrollingElement : element,
    ua = window.navigator.userAgent + "",
    getMax = isRoot
      ? () => scroller.scrollHeight - window.innerHeight
      : () => scroller.scrollHeight - scroller.clientHeight,
    addListener = (type, func) =>
      element.addEventListener(type, func, { passive: false }),
    revert = () => {
      scroller.style.overflowY = "auto";
      forcing = false;
    },
    kill = () => {
      forcing = true;
      scroller.style.overflowY = "hidden";
      !forward && scroller.scrollTop < 1
        ? (scroller.scrollTop = 1)
        : (scroller.scrollTop = getMax() - 1);
      setTimeout(revert, 1);
    },
    handleTouch = (e) => {
      let evt = e.changedTouches ? e.changedTouches[0] : e,
        forward = evt.pageY <= lastTouch;
      if (
        ((!forward && scroller.scrollTop <= 1) ||
          (forward && scroller.scrollTop >= getMax() - 1)) &&
        e.type === "touchmove"
      ) {
        e.preventDefault();
      } else {
        lastTouch = evt.pageY;
      }
    },
    handleScroll = (e) => {
      if (!forcing) {
        let scrollTop = scroller.scrollTop;
        forward = scrollTop > lastScroll;
        if (
          (!forward && scrollTop < 1) ||
          (forward && scrollTop >= getMax() - 1)
        ) {
          e.preventDefault();
          kill();
        }
        lastScroll = scrollTop;
      }
    };
  if ("ontouchend" in document && !!ua.match(/Version\/[\d\.]+.*Safari/)) {
    addListener("scroll", handleScroll);
    addListener("touchstart", handleTouch);
    addListener("touchmove", handleTouch);
  }
  scroller.style.overscrollBehavior = "none";
}

stopOverscroll();
