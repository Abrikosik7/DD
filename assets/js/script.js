// script.js - Interactive elements for OcOO Biohitech website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    initMobileNav();

    // Gallery modal
    initGalleryModal();

    // Contact form handling
    initContactForm();

    // Form field animations and validation
    initFormFieldAnimations();

    // Mycorrhiza product navigation (if exists)
    initProductNav();

    // Smooth scroll to form
    initSmoothScroll();
});

// Mobile Navigation
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
    mobileBtn.setAttribute('aria-label', 'Toggle navigation menu');
    mobileBtn.setAttribute('aria-expanded', 'false');

    // Insert button before nav
    header.insertBefore(mobileBtn, nav);

    // Toggle menu on click
    mobileBtn.addEventListener('click', function() {
        const isExpanded = nav.classList.toggle('nav--open');
        mobileBtn.setAttribute('aria-expanded', isExpanded);
        mobileBtn.classList.toggle('active');
    });

    // Close menu when clicking outside or on links
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target)) {
            nav.classList.remove('nav--open');
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.classList.remove('active');
        }
    });

    nav.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            nav.classList.remove('nav--open');
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.classList.remove('active');
        }
    });
}

// Gallery Modal with animations
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item img');

    if (galleryItems.length === 0) return;

    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <div class="modal-controls">
                <button class="modal-prev" aria-label="Previous image">&larr;</button>
                <button class="modal-next" aria-label="Next image">&rarr;</button>
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
        const figcaption = img.closest('figure').querySelector('figcaption');
        modalCaption.textContent = figcaption ? figcaption.textContent : '';
        modalCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    // Close modal functions
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }

    // Navigation
    modalPrev.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModalImage();
    });

    modalNext.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateModalImage();
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        } else if (e.key === 'ArrowLeft' && modal.classList.contains('active')) {
            modalPrev.click();
        } else if (e.key === 'ArrowRight' && modal.classList.contains('active')) {
            modalNext.click();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && modal.classList.contains('active')) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateModalImage();
        } else if (e.key === 'ArrowRight' && modal.classList.contains('active')) {
            currentIndex = (currentIndex + 1) % images.length;
            updateModalImage();
        }
    });
}

// Form Field Animations and Live Validation
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

        // Add label animation
        const label = this.parentElement.querySelector('label');
        if (label) {
            field.addEventListener('focus', function() {
                label.classList.add('label--active');
            });

            if (field.value) {
                label.classList.add('label--active');
            }
        }
    });
}

// Field Validation
function validateField(field) {
    const fieldType = field.name;
    const value = field.value.trim();
    const fieldContainer = field.parentElement;

    // Reset states
    fieldContainer.classList.remove('field--error', 'field--success');

    if (!value) {
        return; // Don't show error for empty optional fields
    }

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
    const fieldType = field.name;
    let helpText = '';

    switch(fieldType) {
        case 'name':
            helpText = 'Введите ваше имя (минимум 2 символа)';
            break;
        case 'contact':
            helpText = 'Телефон: +996... или Email: name@email.com';
            break;
        case 'company':
            helpText = 'Название вашей организации (необязательно)';
            break;
        case 'msg':
            helpText = 'Опишите задачу минимум 10 символами';
            break;
    }

    if (helpText && !field.parentElement.querySelector('.help')) {
        const helpEl = document.createElement('p');
        helpEl.className = 'help';
        helpEl.textContent = helpText;
        field.parentElement.appendChild(helpEl);
    }
}

function showErrorMessage(field, fieldType) {
    let errorText = '';

    switch(fieldType) {
        case 'name':
            errorText = 'Имя должно содержать минимум 2 символа';
            break;
        case 'contact':
            errorText = 'Введите корректный номер телефона или email';
            break;
        case 'company':
            errorText = 'Минимум 2 символа';
            break;
        case 'msg':
            errorText = 'Сообщение должно содержать минимум 10 символов';
            break;
    }

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

// Contact Form Handling with Notifications
function initContactForm() {
    const form = document.getElementById('feedback');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        if (!validateForm(form)) {
            showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
            return;
        }

        const formData = new FormData(form);
        const name = formData.get('name').trim();
        const contact = formData.get('contact').trim();
        const company = formData.get('company').trim() || '';
        const message = formData.get('msg').trim();

        // Disable submit button and show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        submitBtn.classList.add('loading');

        // Simulate form submission (in real app, send to server)
        setTimeout(() => {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');

            // Show success notification
            showNotification('✓ Спасибо! Ваша заявка принята. Мы свяжемся с вами в течение 12-20 часов.', 'success');

            // Reset form
            form.reset();
            
            // Remove field states
            document.querySelectorAll('.field').forEach(field => {
                field.classList.remove('field--success', 'field--error', 'field--focused');
            });

            // Clear validation messages
            document.querySelectorAll('.error-message, .success-indicator').forEach(el => {
                el.remove();
            });

        }, 1500);
    });
}

function validateForm(form) {
    const fields = form.querySelectorAll('[required]');
    let isValid = true;

    fields.forEach(field => {
        if (!field.value.trim()) {
            field.parentElement.classList.add('field--error');
            isValid = false;
        } else if (!validateFieldContent(field)) {
            field.parentElement.classList.add('field--error');
            isValid = false;
        }
    });

    return isValid;
}

function validateFieldContent(field) {
    const value = field.value.trim();
    const fieldType = field.name;

    if (fieldType === 'name' && value.length < 2) return false;
    if (fieldType === 'contact') {
        const isPhone = /^\+?\d[\d\s\-\(\)]{5,}$/.test(value);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!isPhone && !isEmail) return false;
    }
    if (fieldType === 'msg' && value.length < 10) return false;

    return true;
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');
    notification.textContent = message;

    document.body.appendChild(notification);

    // Add animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);

    // Allow manual close
    notification.addEventListener('click', function() {
        this.classList.remove('show');
        setTimeout(() => {
            this.remove();
        }, 300);
    });
}

// Smooth Scroll to Form
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

// Placeholder for initProductNav
function initProductNav() {
    // Will be implemented if needed
}

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Reset form
        form.reset();

        // Show success message
        alert('Спасибо! Ваше сообщение отправлено в WhatsApp.');
    });
}

// Mycorrhiza Product Navigation (placeholder - assuming a product section exists)
function initProductNav() {
    const navItems = document.querySelectorAll('.product-nav-item');
    const sections = document.querySelectorAll('.product-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}