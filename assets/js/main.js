/**
 * OcOO Biohitech Main JavaScript
 * Handles: mobile navigation, gallery modal, form validation, notifications
 * Optimized and consolidated from multiple sources
 */

document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const yearEl = document.getElementById('y');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Initialize interactive components
    initMobileNav();
    initGalleryModal();
    initContactForm();
    initFormFieldAnimations();
    initSmoothScroll();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.nav');

    if (!nav) return;

    // Create mobile menu button
    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'mobile-nav-toggle';
    mobileBtn.innerHTML = `
        <span class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </span>
    `;
    mobileBtn.setAttribute('aria-label', 'Переключить меню навигации');
    mobileBtn.setAttribute('aria-expanded', 'false');

    // Insert button before nav
    header.insertBefore(mobileBtn, nav);

    // Toggle menu on click
    mobileBtn.addEventListener('click', function() {
        const isExpanded = nav.classList.toggle('nav--open');
        mobileBtn.setAttribute('aria-expanded', isExpanded);
        mobileBtn.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target)) {
            nav.classList.remove('nav--open');
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.classList.remove('active');
        }
    });

    // Close menu when clicking on link
    nav.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            nav.classList.remove('nav--open');
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.classList.remove('active');
        }
    });
}

/**
 * Gallery Modal with keyboard support
 */
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item img');

    if (galleryItems.length === 0) return;

    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal">
            <button class="modal-close" aria-label="Закрыть модал">&times;</button>
            <div class="modal-controls">
                <button class="modal-prev" aria-label="Предыдущее изображение">&larr;</button>
                <button class="modal-next" aria-label="Следующее изображение">&rarr;</button>
            </div>
            <img src="" alt="" class="modal-image">
            <div class="modal-caption"></div>
            <div class="modal-counter"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector('.modal-image');
    const modalCaption = modal.querySelector('.modal-caption');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');
    const modalCounter = modal.querySelector('.modal-counter');

    let currentIndex = 0;
    const images = Array.from(galleryItems);

    // Open modal on image click
    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            openModal(index);
        });
    });

    function openModal(index) {
        currentIndex = index;
        updateModalImage();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    function updateModalImage() {
        const img = images[currentIndex];
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        const figcaption = img.closest('figure')?.querySelector('figcaption');
        modalCaption.textContent = figcaption ? figcaption.textContent : '';
        modalCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }

    // Navigation
    modalPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModalImage();
    });

    modalNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateModalImage();
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateModalImage();
                break;
            case 'ArrowRight':
                currentIndex = (currentIndex + 1) % images.length;
                updateModalImage();
                break;
        }
    });
}

/**
 * Form Field Animations and Live Validation
 */
function initFormFieldAnimations() {
    const formFields = document.querySelectorAll('.field input, .field textarea, .field select');

    formFields.forEach(field => {
        // Focus animation
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('field--focused');
            showFieldHelp(this);
        });

        // Blur animation
        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('field--focused');
            validateField(this);
        });

        // Real-time validation
        field.addEventListener('input', function() {
            validateField(this);
        });

        // Label animation
        const label = field.parentElement.querySelector('label');
        if (label) {
            if (field.value) {
                label.classList.add('label--active');
            }
            field.addEventListener('focus', () => {
                label.classList.add('label--active');
            });
        }
    });
}

/**
 * Field Validation
 */
function validateField(field) {
    const fieldType = field.name;
    const value = field.value.trim();
    const fieldContainer = field.parentElement;

    fieldContainer.classList.remove('field--error', 'field--success');

    if (!value) return;

    let isValid = true;

    switch(fieldType) {
        case 'name':
            isValid = value.length >= 2;
            break;
        case 'contact':
            const isPhone = /^\+?\d[\d\s\-\(\)]{5,}$/.test(value);
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            isValid = isPhone || isEmail;
            break;
        case 'company':
            isValid = value.length >= 2 || value === '';
            break;
        case 'msg':
            isValid = value.length >= 10;
            break;
    }

    if (isValid && value) {
        fieldContainer.classList.add('field--success');
        addSuccessIndicator(field);
    } else if (!isValid && value) {
        fieldContainer.classList.add('field--error');
        showErrorMessage(field, fieldType);
    }
}

function showFieldHelp(field) {
    const helpMessages = {
        name: 'Введите ваше имя (минимум 2 символа)',
        contact: 'Телефон: +996... или Email: name@email.com',
        company: 'Название вашей организации (необязательно)',
        msg: 'Опишите задачу минимум 10 символами'
    };

    const helpText = helpMessages[field.name];
    if (helpText && !field.parentElement.querySelector('.help')) {
        const helpEl = document.createElement('p');
        helpEl.className = 'help';
        helpEl.textContent = helpText;
        field.parentElement.appendChild(helpEl);
    }
}

function showErrorMessage(field, fieldType) {
    const errorMessages = {
        name: 'Имя должно содержать минимум 2 символа',
        contact: 'Введите корректный номер телефона или email',
        company: 'Минимум 2 символа',
        msg: 'Сообщение должно содержать минимум 10 символов'
    };

    const errorText = errorMessages[fieldType];
    const fieldContainer = field.parentElement;
    let errorEl = fieldContainer.querySelector('.error-message');

    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-message';
        fieldContainer.appendChild(errorEl);
    }

    errorEl.textContent = errorText;
}

function addSuccessIndicator(field) {
    const fieldContainer = field.parentElement;
    if (!fieldContainer.querySelector('.success-indicator')) {
        const indicator = document.createElement('span');
        indicator.className = 'success-indicator';
        indicator.textContent = '✓';
        fieldContainer.appendChild(indicator);
    }
}

/**
 * Contact Form Handler
 */
function initContactForm() {
    const form = document.getElementById('feedback');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm(form)) {
            showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        submitBtn.classList.add('loading');

        // Simulate form submission
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');

            showNotification('✓ Спасибо! Ваша заявка принята. Мы свяжемся с вами в течение 12-20 часов.', 'success');

            form.reset();
            
            document.querySelectorAll('.field').forEach(field => {
                field.classList.remove('field--success', 'field--error', 'field--focused');
            });

            document.querySelectorAll('.error-message, .success-indicator, .help').forEach(el => {
                el.remove();
            });
        }, 1500);
    });
}

function validateForm(form) {
    const fields = form.querySelectorAll('[required]');
    let isValid = true;

    fields.forEach(field => {
        if (!field.value.trim() || !validateFieldContent(field)) {
            field.parentElement.classList.add('field--error');
            isValid = false;
        }
    });

    return isValid;
}

function validateFieldContent(field) {
    const value = field.value.trim();
    const fieldType = field.name;

    switch(fieldType) {
        case 'name':
            return value.length >= 2;
        case 'contact':
            const isPhone = /^\+?\d[\d\s\-\(\)]{5,}$/.test(value);
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            return isPhone || isEmail;
        case 'msg':
            return value.length >= 10;
        default:
            return true;
    }
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    const removeNotification = () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    };

    setTimeout(removeNotification, 5000);
    notification.addEventListener('click', removeNotification);
}

/**
 * Smooth Scroll Navigation
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#contacts') {
                e.preventDefault();
                const targetId = href === '#contacts' ? 'feedback' : href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => {
                        targetElement.focus();
                    }, 500);
                }
            }
        });
    });
}

