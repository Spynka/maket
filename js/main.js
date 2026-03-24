(function() {
    // Текущий год в футере
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Кнопка наверх
    const toTopBtn = document.getElementById('toTopBtn');
    if (toTopBtn) {
        toTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Связаться - плавный скролл
    const contactHeader = document.getElementById('contact-header');
    const burgerContact = document.getElementById('burger-contact');
    
    function scrollToContact() {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (contactHeader) {
        contactHeader.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToContact();
        });
    }
    
    if (burgerContact) {
        burgerContact.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToContact();
            const burgerToggle = document.getElementById('burger-toggle');
            if (burgerToggle) burgerToggle.checked = false;
        });
    }

    // Форма обратной связи
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо! Сообщение отправлено (демо).');
            contactForm.reset();
        });
    }

    // Закрытие бургер-меню при клике на ссылку
    const burgerLinks = document.querySelectorAll('.burger-menu a');
    const burgerToggle = document.getElementById('burger-toggle');
    
    burgerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (burgerToggle) burgerToggle.checked = false;
        });
    });

    // Плавный скролл для якорных ссылок на главной странице
    const anchorLinks = document.querySelectorAll('#main-page a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
                if (burgerToggle) burgerToggle.checked = false;
            }
        });
    });

    // Кнопка "больше работ" - переход к первому проекту
    const moreWorksLink = document.getElementById('more-works-link');
    if (moreWorksLink) {
        moreWorksLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'projects/project-1.html';
        });
    }

    // Эффект при скролле для хедера
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.style.background = 'rgba(245, 243, 240, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(245, 243, 240, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        lastScroll = currentScroll;
    });
})();