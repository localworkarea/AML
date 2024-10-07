(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    function getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
                const header = document.querySelector(".header");
                if (header) header.style.paddingRight = "";
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            const header = document.querySelector(".header");
            if (header) header.style.paddingRight = lockPaddingValue;
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
        const targetBlockElement = document.querySelector(targetBlock);
        if (targetBlockElement) {
            let headerItem = "";
            let headerItemHeight = 0;
            if (noHeader) {
                headerItem = "header.header";
                const headerElement = document.querySelector(headerItem);
                if (!headerElement.classList.contains("_header-scroll")) {
                    headerElement.style.cssText = `transition-duration: 0s;`;
                    headerElement.classList.add("_header-scroll");
                    headerItemHeight = headerElement.offsetHeight;
                    headerElement.classList.remove("_header-scroll");
                    setTimeout((() => {
                        headerElement.style.cssText = ``;
                    }), 0);
                } else headerItemHeight = headerElement.offsetHeight;
            }
            let options = {
                speedAsDuration: true,
                speed,
                header: headerItem,
                offset: offsetTop,
                easing: "easeOutQuad"
            };
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
            if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                window.scrollTo({
                    top: targetBlockElementPosition,
                    behavior: "smooth"
                });
            }
            functions_FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
        } else functions_FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
    };
    let addWindowScrollEvent = false;
    function pageNavigation() {
        document.addEventListener("click", pageNavigationAction);
        document.addEventListener("watcherCallback", pageNavigationAction);
        function pageNavigationAction(e) {
            if (e.type === "click") {
                const targetElement = e.target;
                if (targetElement.closest("[data-goto]")) {
                    const gotoLink = targetElement.closest("[data-goto]");
                    const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                    const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                    const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                    const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                    if (modules_flsModules.fullpage) {
                        const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fp-section]");
                        const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
                        if (fullpageSectionId !== null) {
                            modules_flsModules.fullpage.switchingSection(fullpageSectionId);
                            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                        }
                    } else gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                    e.preventDefault();
                }
            } else if (e.type === "watcherCallback" && e.detail) {
                const entry = e.detail.entry;
                const targetElement = entry.target;
                if (targetElement.dataset.watch === "navigator") {
                    document.querySelector(`[data-goto]._navigator-active`);
                    let navigatorCurrentItem;
                    if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                        const element = targetElement.classList[index];
                        if (document.querySelector(`[data-goto=".${element}"]`)) {
                            navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                            break;
                        }
                    }
                    if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                }
            }
        }
        if (getHash()) {
            let goToHash;
            if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
            goToHash ? gotoblock_gotoBlock(goToHash, true, 500, 20) : null;
        }
    }
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                if (!header.classList.contains("_header-scroll")) {
                    header.classList.add("_header-scroll");
                    document.documentElement.classList.add("_scroll-dwn");
                }
                if (headerShow) {
                    if (scrollTop > scrollDirection) {
                        if (header.classList.contains("_header-show")) header.classList.remove("_header-show");
                    } else if (!header.classList.contains("_header-show")) header.classList.add("_header-show");
                    timer = setTimeout((() => {
                        if (!header.classList.contains("_header-show")) header.classList.add("_header-show");
                    }), headerShowTimer);
                }
            } else {
                if (header.classList.contains("_header-scroll")) {
                    header.classList.remove("_header-scroll");
                    document.documentElement.classList.remove("_scroll-dwn");
                }
                if (headerShow) if (header.classList.contains("_header-show")) header.classList.remove("_header-show");
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767.98";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint / 16}em),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    gsap.registerPlugin(ScrollTrigger);
    document.addEventListener("DOMContentLoaded", (function() {
        function smoothScroll(smoothness = .08, inertia = .85) {
            let scrollPosition = window.pageYOffset;
            let targetPosition = scrollPosition;
            let isScrolling = false;
            let isDraggingScrollbar = false;
            function updateScroll() {
                scrollPosition += (targetPosition - scrollPosition) * smoothness;
                window.scrollTo(0, scrollPosition);
                if (Math.abs(targetPosition - scrollPosition) > .5) requestAnimationFrame(updateScroll); else isScrolling = false;
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
                if (document.body.getAttribute("data-smooth-scroll") === "true") {
                    window.addEventListener("wheel", startScroll, {
                        passive: false
                    });
                    window.addEventListener("scroll", onScroll);
                    window.addEventListener("mousedown", onMouseDown);
                    window.addEventListener("mouseup", onMouseUp);
                } else {
                    window.removeEventListener("wheel", startScroll);
                    window.removeEventListener("scroll", onScroll);
                    window.removeEventListener("mousedown", onMouseDown);
                    window.removeEventListener("mouseup", onMouseUp);
                }
            }
            const observer = new MutationObserver((mutations => {
                mutations.forEach((mutation => {
                    if (mutation.attributeName === "data-smooth-scroll") initSmoothScroll();
                }));
            }));
            observer.observe(document.body, {
                attributes: true
            });
            initSmoothScroll();
        }
        if (document.body.getAttribute("data-smooth-scroll") === "true") smoothScroll(.1, .85);
        const splitTextLines = document.querySelectorAll(".split-lines");
        const splitTextWords = document.querySelectorAll(".split-words");
        const splitTextChars = document.querySelectorAll(".split-chars");
        const splitTextBoth = document.querySelectorAll(".split-both");
        const splitSetSpan = document.querySelectorAll(".split-words.set-span");
        function initSplitType() {
            if (splitTextLines.length > 0) splitTextLines.forEach((element => {
                new SplitType(element, {
                    types: "lines"
                });
            }));
            if (splitTextWords.length > 0) splitTextWords.forEach((element => {
                new SplitType(element, {
                    types: "words"
                });
                const words = element.querySelectorAll(".word");
                words.forEach(((word, index) => {
                    word.style.setProperty("--index", index);
                }));
            }));
            if (splitTextChars.length > 0) splitTextChars.forEach((element => {
                new SplitType(element, {
                    types: "chars"
                });
                const chars = element.querySelectorAll(".char");
                chars.forEach(((char, index) => {
                    char.style.setProperty("--index", index);
                }));
            }));
            if (splitTextBoth.length > 0) splitTextBoth.forEach((element => {
                new SplitType(element, {
                    types: "lines, words"
                });
                const words = element.querySelectorAll(".word");
                words.forEach(((word, index) => {
                    word.style.setProperty("--index", index);
                }));
            }));
            if (splitSetSpan.length > 0) splitSetSpan.forEach((splitSetSpan => {
                const words = splitSetSpan.querySelectorAll(".word");
                words.forEach((word => {
                    const text = word.textContent.trim();
                    word.innerHTML = `<span class="word-span">${text}</span>`;
                }));
            }));
        }
        initSplitType();
        const resizeObserver = new ResizeObserver((entries => {
            entries.forEach((entry => {
                initSplitType();
            }));
        }));
        resizeObserver.observe(document.body);
        setTimeout((() => {
            ScrollTrigger.getAll().forEach((trigger => trigger.kill()));
            ScrollTrigger.refresh();
            const heroSection = document.querySelector(".hero");
            const heroImg = document.querySelector(".hero__img");
            const logoAc = document.querySelector(".logo-ac");
            const headerEl = document.querySelector(".header");
            const whoSection = document.querySelector(".who");
            if (heroImg) {
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
                        end: "80% center",
                        scrub: 1,
                        onEnter: () => {
                            heroImg.classList.remove("_anim-end");
                            logoAc.classList.remove("_anim-end");
                        },
                        onUpdate: self => {
                            if (self.direction < 0) {
                                heroImg.classList.remove("_anim-end");
                                logoAc.classList.remove("_anim-end");
                            }
                        },
                        onLeave: () => {
                            heroImg.classList.add("_anim-end");
                            logoAc.classList.add("_anim-end");
                        }
                    },
                    width: logoAcPosition.width,
                    left: logoAcPosition.left + logoAcPosition.width / 2,
                    top: logoAcPosition.top,
                    ease: "none"
                });
            }
            if (whoSection) gsap.to(headerEl, {
                scrollTrigger: {
                    trigger: whoSection,
                    start: "-5% top",
                    end: "bottom top",
                    scrub: 1,
                    onEnter: () => document.documentElement.classList.add("_who-block"),
                    onLeave: () => document.documentElement.classList.remove("_who-block"),
                    onEnterBack: () => document.documentElement.classList.add("_who-block"),
                    onLeaveBack: () => document.documentElement.classList.remove("_who-block")
                }
            });
        }), 200);
        const valuesContent = document.querySelector(".values__content");
        const valuesItemsContainer = document.querySelector(".values__items");
        const valuesItems = document.querySelectorAll(".values__item");
        const infoItems = document.querySelectorAll(".info-values__item");
        const lineEl = document.querySelector(".line");
        const mediaQuery = window.matchMedia("(max-width: 43.811em)");
        let hoverTimeout;
        function setVideoContainerHeight(videoContainer) {
            if (mediaQuery.matches) {
                const videoWidth = videoContainer.offsetWidth;
                const videoHeight = videoWidth * (210 / 353);
                videoContainer.style.height = `${videoHeight}px`;
            } else videoContainer.style.height = "";
        }
        function setActiveClass(index) {
            infoItems.forEach(((item, i) => {
                item.classList.remove("_active");
                const video = item.querySelector("video");
                const videoContainer = item.querySelector(".info-values__video");
                if (video) video.pause();
                if (videoContainer) videoContainer.style.height = "";
                valuesItems[i].classList.remove("_active");
            }));
            hoverTimeout = setTimeout((() => {
                if (infoItems[index]) {
                    infoItems[index].classList.add("_active");
                    valuesItems[index].classList.add("_active");
                    const activeVideo = infoItems[index].querySelector("video");
                    const activeVideoContainer = infoItems[index].querySelector(".info-values__video");
                    if (activeVideo) activeVideo.play();
                    if (activeVideoContainer) setVideoContainerHeight(activeVideoContainer);
                }
            }), 100);
        }
        valuesItems.forEach(((item, index) => {
            item.addEventListener("mouseenter", (event => {
                event.stopPropagation();
                clearTimeout(hoverTimeout);
                setActiveClass(index);
                valuesItemsContainer.classList.add("_active");
                lineEl.classList.add("_active");
            }));
        }));
        valuesContent.addEventListener("mouseleave", (event => {
            event.stopPropagation();
            clearTimeout(hoverTimeout);
            infoItems.forEach(((item, i) => {
                item.classList.remove("_active");
                const video = item.querySelector("video");
                const videoContainer = item.querySelector(".info-values__video");
                if (video) video.pause();
                if (videoContainer) videoContainer.style.height = "";
                valuesItems[i].classList.remove("_active");
            }));
            valuesItemsContainer.classList.remove("_active");
            lineEl.classList.remove("_active");
        }));
    }));
    window.addEventListener("beforeunload", (() => {
        window.scrollTo(0, 0);
    }));
    window.addEventListener("orientationchange", (() => {
        window.scrollTo(0, 0);
        location.reload();
    }));
    let lastWindowWidth = window.innerWidth;
    window.addEventListener("resize", (() => {
        const currentWindowWidth = window.innerWidth;
        if (currentWindowWidth !== lastWindowWidth) {
            window.scrollTo(0, 0);
            location.reload();
        }
        lastWindowWidth = currentWindowWidth;
    }));
    function stopOverscroll(element) {
        element = gsap.utils.toArray(element)[0] || window;
        (element === document.body || element === document.documentElement) && (element = window);
        let lastTouch, forcing, lastScroll = 0, forward = true, isRoot = element === window, scroller = isRoot ? document.scrollingElement : element, ua = window.navigator.userAgent + "", getMax = isRoot ? () => scroller.scrollHeight - window.innerHeight : () => scroller.scrollHeight - scroller.clientHeight, addListener = (type, func) => element.addEventListener(type, func, {
            passive: false
        }), revert = () => {
            scroller.style.overflowY = "auto";
            forcing = false;
        }, kill = () => {
            forcing = true;
            scroller.style.overflowY = "hidden";
            !forward && scroller.scrollTop < 1 ? scroller.scrollTop = 1 : scroller.scrollTop = getMax() - 1;
            setTimeout(revert, 1);
        }, handleTouch = e => {
            let evt = e.changedTouches ? e.changedTouches[0] : e, forward = evt.pageY <= lastTouch;
            if ((!forward && scroller.scrollTop <= 1 || forward && scroller.scrollTop >= getMax() - 1) && e.type === "touchmove") e.preventDefault(); else lastTouch = evt.pageY;
        }, handleScroll = e => {
            if (!forcing) {
                let scrollTop = scroller.scrollTop;
                forward = scrollTop > lastScroll;
                if (!forward && scrollTop < 1 || forward && scrollTop >= getMax() - 1) {
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
    window.addEventListener("load", (() => {
        const mediaQuery = window.matchMedia("(min-width: 43.811em)");
        function setMaxHeight() {
            if (mediaQuery.matches) {
                const infoItems = document.querySelectorAll(".info-values__item");
                const valuesContent = document.querySelector(".values__content");
                let maxHeight = 0;
                infoItems.forEach((item => {
                    const itemHeight = item.offsetHeight;
                    if (itemHeight > maxHeight) maxHeight = itemHeight;
                }));
                infoItems.forEach((item => {
                    item.style.minHeight = `${maxHeight}px`;
                    valuesContent.style.minHeight = `${maxHeight}px`;
                }));
            }
        }
        setMaxHeight();
        mediaQuery.addListener(setMaxHeight);
    }));
    window["FLS"] = false;
    isWebp();
    addLoadedClass();
    menuInit();
    pageNavigation();
    headerScroll();
})();