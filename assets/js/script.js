// script.js - Interactive elements for OcOO Biohitech website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    initMobileNav();

    // Gallery modal
    initGalleryModal();

    // Contact form handling
    initContactForm();

    // Mycorrhiza product navigation (if exists)
    initProductNav();
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

// Gallery Modal
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item img');

    if (galleryItems.length === 0) return;

    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <img src="" alt="" class="modal-image">
            <div class="modal-caption"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector('.modal-image');
    const modalCaption = modal.querySelector('.modal-caption');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');

    // Open modal on image click
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            const figcaption = this.closest('figure').querySelector('figcaption');
            modalCaption.textContent = figcaption ? figcaption.textContent : '';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('feedback');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const contact = formData.get('contact');
        const company = formData.get('company') || '';
        const message = formData.get('msg');

        // Basic validation
        if (!name || !contact || !message) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        // Check if contact is phone or email
        const isPhone = /^\+?\d[\d\s\-\(\)]+$/.test(contact.trim());
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());

        if (!isPhone && !isEmail) {
            alert('Пожалуйста, введите корректный телефон или email.');
            return;
        }

        // Prepare WhatsApp message
        let whatsappMessage = `Здравствуйте! Меня зовут ${name}.`;
        if (company) whatsappMessage += ` Я представляю компанию ${company}.`;
        whatsappMessage += ` ${message}`;

        const whatsappUrl = `https://wa.me/996000000000?text=${encodeURIComponent(whatsappMessage)}`;

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