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
     
     // // Создаем ResizeObserver для отслеживания изменений размера окна
     // const resizeObserver = new ResizeObserver(entries => {
     //   entries.forEach(entry => {
     //     initSplitType();
     //   });
     // });
     // // Наблюдаем за изменениями в элементе body (можно выбрать другой контейнер, если нужно)
     // resizeObserver.observe(document.body);
     
     // Создаем ResizeObserver для отслеживания изменений размера окна
     const resizeObserver = new ResizeObserver(entries => {
       requestAnimationFrame(() => {
         entries.forEach(entry => {
           initSplitType();
         });
       });
     });
     // Наблюдаем за изменениями в элементе body (можно выбрать другой контейнер, если нужно)
     resizeObserver.observe(document.body);
  
     // =======================================================================


     

     const valuesSection = document.querySelector('.values');
     const valuesContent = document.querySelector('.values__content');
     const valuesItemsContainer = document.querySelector('.values__items');
     const valuesItems = document.querySelectorAll('.values__item');
     const infoItems = document.querySelectorAll('.info-values__item');
     const lineEl = document.querySelector('.line-values');

     const heroSection = document.querySelector('.hero');
     const heroImg = document.querySelector('.hero__img');
     const logoAc = document.querySelector('.logo-ac');
     
     const headerEl = document.querySelector('.header');
     const whoSection = document.querySelector('.who');

     const focusSection = document.querySelector('.focus');
     const focusSubTitle = document.querySelector('.focus__subtitle');
     const focusEl = document.querySelector('.focus__el');

     const footerSection = document.querySelector('.footer');
     const footerContainer = document.querySelector('.footer__container');

    setTimeout(() => {
  
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        ScrollTrigger.refresh();

      //   if (heroImg) {
      //     const scrollPosY = window.pageYOffset;
      //     window.scrollTo(0, 0);
    
      //     function getOffset(el) {
      //       const rect = el.getBoundingClientRect();
      //       return {
      //         top: rect.top + window.pageYOffset,
      //         left: rect.left + window.pageXOffset,
      //         width: rect.width,
      //         height: rect.height
      //       };
      //     }
    
      //     const logoAcPosition = getOffset(logoAc);
      //     window.scrollTo(0, scrollPosY);
    
      //     gsap.to(heroImg, {
      //       scrollTrigger: {
      //         trigger: heroSection,
      //         start: "top top",
      //         end: "80% center",
      //         scrub: 1,
      //         onEnter: () => {
      //           // Удаляем класс при начале анимации
      //           heroImg.classList.remove('_anim-end');
      //           logoAc.classList.remove('_anim-end');
      //         },
      //         onUpdate: (self) => {
      //           // Убираем класс, когда движение идет в обратном направлении
      //           if (self.direction < 0) {
      //             heroImg.classList.remove('_anim-end');
      //             logoAc.classList.remove('_anim-end');
      //           }
      //         },
      //         onLeave: () => {
      //           // Добавляем класс, когда скроллим до конца секции
      //           heroImg.classList.add('_anim-end');
      //           logoAc.classList.add('_anim-end');
      //         }
      //       },
      //       width: logoAcPosition.width,
      //       left: logoAcPosition.left + logoAcPosition.width / 2,
      //       top: logoAcPosition.top + logoAcPosition.height / 2,
      //       ease: "none",
      //     });
      // }


      if (heroImg) {

        // 1. устанавливаем начальные значения
        gsap.set(heroImg, {
          top: "50%",
          left: "50%",
          scale: 0.5,
          opacity: 0,
          transform: "translate(-50%, -50%)"
        });


        let breakPoint = 51.311; // 820.98px
        let mm2 = gsap.matchMedia();
  
        mm2.add({
          isDesktop: `(min-width: ${breakPoint}em)`,
          isMobile: `(max-width: ${breakPoint}em)`
        }, (context) => {
        
          let {isDesktop, isMobile} = context.conditions;
        
          if (isDesktop) {
               // 2. Начальная анимация после загрузки страницы
              gsap.timeline()
              .to(heroImg, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
              })
              .to(heroImg, {
                left: "75%",
                duration: 0.85,
                ease: "power2.out",
                onComplete: function() {
                  // 3. продолжаем после завершения первой анимации
                  startScrollAnimation(); 
                }
              });
          }
          if (isMobile) {
             // 2. Начальная анимация после загрузки страницы
             gsap.timeline()
             .to(heroImg, {
               opacity: 1,
               scale: 1,
               duration: 0.5,
               ease: "power2.out"
             })
             .to(heroImg, {
               top: "30%",
               duration: 0.5,
               ease: "power2.out",
               onComplete: function() {
                 // 3. продолжаем после завершения первой анимации
                 startScrollAnimation(); 
               }
             });
          }
        });

        
        function startScrollAnimation() {
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
        
          const logoAcPosition = getOffset(logoAc);
          window.scrollTo(0, scrollPosY);
        
          gsap.to(heroImg, {
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "70% center",
              scrub: 1,
              onEnter: () => {
                heroImg.classList.remove('_anim-end');
                logoAc.classList.remove('_anim-end');
              },
              onUpdate: (self) => {
                if (self.direction < 0) {
                  heroImg.classList.remove('_anim-end');
                  logoAc.classList.remove('_anim-end');
                }
              },
              onLeave: () => {
                heroImg.classList.add('_anim-end');
                logoAc.classList.add('_anim-end');
              }
            },
            width: logoAcPosition.width,
            left: logoAcPosition.left + logoAcPosition.width / 2,
            top: logoAcPosition.top + logoAcPosition.height / 2,
            ease: "none",
          });
        }
      }
      





      if (whoSection) {
        gsap.to(headerEl, {
          scrollTrigger: {
            trigger: whoSection,
            start: "-5% top",
            end: "bottom top",
            scrub: 1,
            onEnter: () => document.documentElement.classList.add('_who-block'),
            onLeave: () => document.documentElement.classList.remove('_who-block'),
            onEnterBack: () => document.documentElement.classList.add('_who-block'),
            onLeaveBack: () => document.documentElement.classList.remove('_who-block'),
          },
        });
      }

      if (focusSection) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: focusSection,
            start: "top center", 
            end: "bottom top",
            scrub: 1, 
            anticipatePin: 1,
          }
        });
        tl.to(focusSubTitle, {
          top: "50%",
          duration: 3
        });
        tl.to(focusEl, {
          top: "50%",
          duration: 3,
        },"<0.5");
        // tl.to(focusEl, {
        //   top: "50%",
        //   duration: 3,
        // });
        tl.to(focusEl, {
          width: "100%",
          height: "100%",
          top: "50%",
          duration: 3,
        });
        ScrollTrigger.create({
          trigger: focusSection,
          start: "top top",
          // end: "+=1200",
          endTriger: focusSection,
          scrub: true,
          pin: focusSection,
        });
      }




        let breakPoint = 43.811; // 700.98px
        let mm = gsap.matchMedia();
  
        mm.add({
          isDesktop: `(min-width: ${breakPoint}em)`,
          isMobile: `(max-width: ${breakPoint}em)`
        }, (context) => {
        
          let {isDesktop, isMobile} = context.conditions;
        
          if (isDesktop) {
            if (valuesSection) {
              const scrollTriggerConfig = {
                trigger: valuesSection,
                start: "top center",
                end: "90% bottom",
                scrub: 1,
                onUpdate: function(self) {
                  let progress = self.progress; 
                  
                  if (progress > 0 && progress < 1) {
                    valuesSection.classList.remove('_show-el');
                  } else {
                    valuesSection.classList.add('_show-el');
                  }
                }
              };
              // Анимация для valuesItems
              gsap.to(valuesItems, {
                y: 0,
                duration: 3,
                stagger: 0.6,
                scrollTrigger: scrollTriggerConfig,
              });
              // Анимация для infoItems
              gsap.to(infoItems, {
                y: 0,
                duration: 1,
                scrollTrigger: scrollTriggerConfig, 
              });
              // Анимация для lineEl
              gsap.to(lineEl, {
                y: 0,
                duration: 1,
                scrollTrigger: scrollTriggerConfig,
              });
            }

            if (footerSection) {
              gsap.to(footerContainer, {
                // y: 0,
                // duration: 2,
                transform: 'translate(0%, 0%)',
                scrollTrigger: {
                  trigger: footerSection,
                  start: "top bottom",
                  end: "bottom bottom",
                  scrub: true,
                },
              });
            }
           
          }
          if (isMobile) {
          }
        });
      
    }, 200);

  
   
    const mediaQuery = window.matchMedia('(max-width: 43.811em)');

    if (valuesItemsContainer && valuesItems) {
      let hoverTimeout;
      
      function setVideoContainerHeight(videoContainer) {
        if (mediaQuery.matches) { 
          const videoWidth = videoContainer.offsetWidth; 
          const videoHeight = videoWidth * (210 / 353); 
          videoContainer.style.height = `${videoHeight}px`;
        } else {
          videoContainer.style.height = ''; 
        }
      }
      
      // Функция для активации нужного элемента
      function setActiveClass(index) {
        infoItems.forEach((item, i) => {
          item.classList.remove('_active');
          const video = item.querySelector('video');
          const videoContainer = item.querySelector('.info-values__video');
          if (video) {
            video.pause();
          }
          if (videoContainer) {
            videoContainer.style.height = ''; 
          }
          
          valuesItems[i].classList.remove('_active'); // Убираем класс _active с valuesItems
        });
      
        hoverTimeout = setTimeout(() => {
          if (infoItems[index]) {
            infoItems[index].classList.add('_active');
            valuesItems[index].classList.add('_active'); // Добавляем класс _active к соответствующему элементу valuesItems
      
            const activeVideo = infoItems[index].querySelector('video');
            const activeVideoContainer = infoItems[index].querySelector('.info-values__video');
            if (activeVideo) {
              activeVideo.play();
            }
            if (activeVideoContainer) {
              setVideoContainerHeight(activeVideoContainer); 
            }
          }
        }, 100);
      }
      
      valuesItems.forEach((item, index) => {
        item.addEventListener('mouseenter', (event) => {
          
           // Логика для экранов с шириной больше, чем mediaQuery
          if (!mediaQuery.matches) {
            // Проверяем наличие класса _show-el
            if (!valuesSection.classList.contains('_show-el')) {
              return; // Если класс _show-el не добавлен, не выполняем логику
            }
          }

          event.stopPropagation();
          clearTimeout(hoverTimeout);
          setActiveClass(index);
          valuesItemsContainer.classList.add('_active');
          lineEl.classList.add('_active');
        });
      });


      valuesContent.addEventListener('mouseleave', (event) => {

            // Условие для ширины больше чем mediaQuery
          if (mediaQuery.matches) {
            return; // Если ширина экрана меньше 43.811em, не выполняем логику
          }

        event.stopPropagation();
        clearTimeout(hoverTimeout);


         // Если класс _show-el отсутствует, активные состояния уже были сброшены
        if (!valuesSection.classList.contains('_show-el')) {
          return;
        }
      
        infoItems.forEach((item, i) => {
          item.classList.remove('_active');
          const video = item.querySelector('video');
          const videoContainer = item.querySelector('.info-values__video');
          if (video) {
            video.pause();
          }
          if (videoContainer) {
            videoContainer.style.height = '';
          }
      
          valuesItems[i].classList.remove('_active'); // Убираем класс _active при выходе мыши
        });
      
        valuesItemsContainer.classList.remove('_active');
        lineEl.classList.remove('_active');
      });

        // Ловим событие изменения класса _show-el только на экранах больше mediaQuery
        if (!mediaQuery.matches) {
          const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
              if (mutation.attributeName === 'class') {
                const hasShowEl = valuesSection.classList.contains('_show-el');
              
                if (!hasShowEl) {
                  // Если класс _show-el убран, удаляем все активные состояния
                  infoItems.forEach((item, i) => {
                    item.classList.remove('_active');
                    const video = item.querySelector('video');
                    const videoContainer = item.querySelector('.info-values__video');
                    if (video) {
                      video.pause();
                    }
                    if (videoContainer) {
                      videoContainer.style.height = '';
                    }
                    valuesItems[i].classList.remove('_active'); // Убираем класс _active
                  });
                
                  valuesItemsContainer.classList.remove('_active');
                  lineEl.classList.remove('_active');
                }
              }
            }
          });
        
          // Наблюдаем за изменениями класса _show-el у valuesSection
          observer.observe(valuesSection, { attributes: true });
        }

    }
  


    // -------------------------------------
  }); // end DOMContentLoaded ---------------------------------------------------------------
  // ------------------------------


  window.addEventListener('unload', () => {
    window.scrollTo(0, 0);
  });
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
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





window.addEventListener('load', () => {
  const mediaQuery = window.matchMedia('(min-width: 43.811em)'); // 43.811em = 701px

  function setMaxHeight() {
    const infoItems = document.querySelectorAll('.info-values__item');
    const infoCards = document.querySelectorAll('.info-values__card');
    const valuesContent = document.querySelector('.values__content');

    if (mediaQuery.matches) {
      let maxHeight = 0;
      infoCards.forEach((card, index) => {
        const cardHeight = card.getBoundingClientRect().height;
        if (cardHeight > maxHeight) {
          maxHeight = cardHeight;
        }
      });

      infoItems.forEach(item => {
        item.style.minHeight = `${maxHeight}px`;
      });
      valuesContent.style.minHeight = `${maxHeight}px`;

    }
  }

  setMaxHeight();
  mediaQuery.addEventListener('change', setMaxHeight);
});
