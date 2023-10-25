
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    sendOrderForm();
    initCarousels();
    initDetails4Mobile();
});

function sendOrderForm() {
    const orderForm = document.querySelector('[data-order-form]');
    const url = orderForm.action;

    orderForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(url, {
            method:'post', 
            body: new FormData(orderForm)
        })
        .then((response) => {
            if (response.status === 200) {
                orderForm.innerHTML = `
                    <p class="lead">✅ Заявка успешно отправлена.</p>
                `;
            } else {
                orderForm.innerHTML = `
                    <p class="lead">❗ При отправке заявки возникли проблемы.</p>
                `;
            }
        })
        .catch(() => {
            orderForm.innerHTML = `
                <p class="lead">❗ При отправке заявки возникли проблемы.<br>
                Попробуйте позвонить нам</p>
            `;
        });;
        
    });
}

function initScrollAnimations() {
    if (!'IntersectionObserver' in window) {
        return;
    }

    const observerElements = document.querySelectorAll('[data-animate]');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px',
        threshold: 0,
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    [].forEach.call(observerElements, (element) => observer.observe(element));

    function observerCallback(entries) {
        entries?.forEach(entry => {
            const animateEl = entry.target;

            if (entry.intersectionRatio > 0) {
                animateEl?.classList.remove('will-animate');
                observer.unobserve(entry.target);
                return;
            }
            animateEl?.classList.add('will-animate');
        });
    }
}

function initCarousels() {
    const carouselList = document.querySelectorAll('[data-splide]');

    carouselList?.forEach(carousel => {
        const hasArrows = JSON.parse(carousel.dataset.splide).arrows;
        const slidesPerPage = JSON.parse(carousel.dataset.splide).perPage;
        let splide = new Splide(carousel, {
            type: 'loop',
            perPage: slidesPerPage || 3,
            padding: { right: '15rem' },
            gap: 30,
            arrows: hasArrows || true,
            pagination: false,
            breakpoints: {
                1200: {
                    perPage: 2,
                },
                1024: {
                    perPage: 1,
                },
                767: {
                    perPage: 1,
                    padding: { left: 'var(--gutter)', right: '8rem' },
                },
                560: {
                    gap: 25,
                    padding: { left: '1rem', right: '3rem' },
                },
            },
        })

        carousel.querySelector('[data-splide-btn-next]')?.addEventListener('click', () => {
            splide.go('+1')
        });
        carousel.querySelector('[data-splide-btn-prev]')?.addEventListener('click', () => {
            splide.go('-1')
        });
        splide.mount();
    });
}

function initDetails4Mobile() {
    const mediaQuery = window.matchMedia('(max-width: 375px)');
    const detailsList = document.querySelectorAll('[data-details-on-mobile]');

    function handleResize(e) {
        const isDetailOpen = !e.matches;
        detailsList.forEach((details) => {
          details.open = isDetailOpen;
        });
    }

    mediaQuery.addListener(handleResize);

    handleResize(mediaQuery);
}