
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    sendOrderForm();
});

function sendOrderForm() {
    const orderForm = document.querySelector('[data-order-form]');
    const url = orderForm.action;

    orderForm.addEventListener('submit', (e) => {
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