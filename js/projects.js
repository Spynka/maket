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

    // Навигация между проектами
    const projects = ['project-1.html', 'project-2.html', 'project-3.html', 'project-4.html', 'project-5.html'];
    
    // Получаем текущий проект из URL
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    let currentIndex = projects.indexOf(currentFile);
    
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    const counterSpan = document.getElementById('projectCounter');
    
    if (prevBtn && nextBtn && counterSpan && currentIndex !== -1) {
        counterSpan.textContent = (currentIndex + 1) + ' / ' + projects.length;
        
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = projects.length - 1;
            window.location.href = projects[newIndex];
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= projects.length) newIndex = 0;
            window.location.href = projects[newIndex];
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

    // Добавляем обработчик для клавиш влево/вправо для навигации между проектами
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && prevBtn) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && nextBtn) {
            nextBtn.click();
        }
    });
    
    // ========== ГАЛЕРЕЯ С МОДАЛЬНЫМ ОКНОМ ==========
    function initGallery() {
        // Собираем все изображения из галереи
        const galleryItems = document.querySelectorAll('.gallery-item');
        const modal = document.getElementById('modalGallery');
        
        // Если нет элементов галереи или модального окна - выходим
        if (!galleryItems.length || !modal) return;
        
        const modalImg = document.querySelector('.modal-image');
        const modalCaption = document.querySelector('.modal-caption');
        const counter = document.querySelector('.counter');
        const closeBtn = document.querySelector('.close-btn');
        const prevBtnModal = document.querySelector('.prev-btn');
        const nextBtnModal = document.querySelector('.next-btn');
        
        let currentIndex = 0;
        let images = [];
        
        // Собираем данные о всех изображениях
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('.gallery-image img');
            const caption = item.querySelector('.gallery-caption');
            
            if (img) {
                images.push({
                    src: img.src,
                    alt: img.alt || '',
                    caption: caption ? caption.textContent : ''
                });
                
                // Добавляем обработчик клика на каждое изображение
                item.style.cursor = 'pointer';
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = index;
                    openModal(currentIndex);
                });
            }
        });
        
        // Если нет изображений - выходим
        if (images.length === 0) return;
        
        // Открыть модальное окно
        function openModal(index) {
            if (!images[index]) return;
            
            modalImg.src = images[index].src;
            modalImg.alt = images[index].alt;
            modalCaption.textContent = images[index].caption;
            counter.textContent = `${index + 1} / ${images.length}`;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
            
            // Добавляем обработчики клавиш
            document.addEventListener('keydown', handleKeyDown);
        }
        
        // Закрыть модальное окно
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Возвращаем скролл
            document.removeEventListener('keydown', handleKeyDown);
        }
        
        // Показать следующее изображение
        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            updateModalImage();
        }
        
        // Показать предыдущее изображение
        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateModalImage();
        }
        
        // Обновить изображение в модальном окне
        function updateModalImage() {
            if (!images[currentIndex]) return;
            
            modalImg.src = images[currentIndex].src;
            modalImg.alt = images[currentIndex].alt;
            modalCaption.textContent = images[currentIndex].caption;
            counter.textContent = `${currentIndex + 1} / ${images.length}`;
        }
        
        // Обработка клавиш
        function handleKeyDown(e) {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
        
        // Добавляем обработчики событий
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (prevBtnModal) prevBtnModal.addEventListener('click', prevImage);
        if (nextBtnModal) nextBtnModal.addEventListener('click', nextImage);
        
        // Закрытие при клике на фон
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
        
        // Предотвращаем всплытие кликов на кнопках
        if (prevBtnModal) prevBtnModal.addEventListener('click', (e) => e.stopPropagation());
        if (nextBtnModal) nextBtnModal.addEventListener('click', (e) => e.stopPropagation());
        if (closeBtn) closeBtn.addEventListener('click', (e) => e.stopPropagation());
    }
    
    // Запускаем галерею после полной загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }
})();