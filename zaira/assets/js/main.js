/**
 * Main JavaScript File for Intensivos de EMDR Website
 * Handles:
 * - Sticky Header & Scroll Effects
 * - Mobile Navigation Drawer & Backdrop Overlay
 * - Touch-friendly Mobile Submenu Dropdowns
 * - Interactive FAQ Accordions
 * - Dynamic Copyright Year
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Sticky Header & Scroll Effects
    // ----------------------------------------------------
    const header = document.getElementById('mainHeader');

    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // ----------------------------------------------------
    // 2. Mobile Navigation & Overlay Backdrop
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    let navOverlay = document.getElementById('navOverlay');

    // Create overlay backdrop dynamically if not in HTML
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.id = 'navOverlay';
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }

    const openMenu = () => {
        if (!mainNav || !mobileToggle) return;
        mainNav.classList.add('active');
        mobileToggle.classList.add('active');
        navOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        mobileToggle.setAttribute('aria-expanded', 'true');

        const toggleIcon = mobileToggle.querySelector('i');
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-xmark');
        }
    };

    const closeMenu = () => {
        if (!mainNav || !mobileToggle) return;
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileToggle.setAttribute('aria-expanded', 'false');

        const toggleIcon = mobileToggle.querySelector('i');
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
        }

        // Close any open mobile dropdowns
        document.querySelectorAll('.has-dropdown.dropdown-open').forEach(dropdown => {
            dropdown.classList.remove('dropdown-open');
        });
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mainNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close on overlay click
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
            closeMenu();
        }
    });

    // ----------------------------------------------------
    // 3. Mobile Dropdowns Toggle (Touch & Click Support)
    // ----------------------------------------------------
    const dropdownItems = document.querySelectorAll('.has-dropdown');

    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        if (!link) return;

        link.addEventListener('click', (e) => {
            // Only execute custom toggle in mobile view (screen width <= 1100px)
            if (window.innerWidth <= 1100) {
                // Prevent navigating if it's acting as a dropdown opener
                e.preventDefault();
                e.stopPropagation();

                // Close other open dropdowns in mobile menu
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('dropdown-open');
                    }
                });

                item.classList.toggle('dropdown-open');
            }
        });
    });

    // Close mobile menu when clicking a regular nav link (excluding dropdown toggles)
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const parentLi = link.closest('li');
            const isDropdownParentLink = parentLi && parentLi.classList.contains('has-dropdown') && link === parentLi.querySelector(':scope > a');
            
            // If it's a regular link or inside a dropdown submenu, close the menu
            if (!isDropdownParentLink && window.innerWidth <= 1100) {
                closeMenu();
            }
        });
    });

    // Handle screen resize: reset menu states if resized to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1100 && mainNav && mainNav.classList.contains('active')) {
            closeMenu();
        }
    });

    // ----------------------------------------------------
    // 4. Interactive FAQ Accordion
    // ----------------------------------------------------
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            if (!faqItem) return;

            const isOpen = faqItem.classList.contains('active');

            // Toggle single active state for clean accordion
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isOpen) {
                faqItem.classList.add('active');
            }
        });
    });

    // Smoothly animate the homepage audience disclosures on open and close.
    document.querySelectorAll('.audience-item').forEach(item => {
        const summary = item.querySelector('summary');
        const panel = item.querySelector('.audience-panel');
        if (!summary || !panel) return;

        summary.addEventListener('click', event => {
            event.preventDefault();
            const startHeight = panel.getBoundingClientRect().height;
            const opening = !item.open || panel._audienceIsClosing;
            panel._audienceAnimation?.cancel();
            const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320;

            if (opening) {
                item.open = true;
                panel._audienceIsClosing = false;
                const targetHeight = panel.scrollHeight;
                const animation = panel.animate(
                    [{ height: `${startHeight}px` }, { height: `${targetHeight}px` }],
                    { duration, easing: 'ease-in-out' }
                );
                panel._audienceAnimation = animation;
                animation.onfinish = () => {
                    if (panel._audienceAnimation !== animation) return;
                    panel.style.height = 'auto';
                    panel._audienceAnimation = null;
                };
            } else {
                panel._audienceIsClosing = true;
                const animation = panel.animate(
                    [{ height: `${startHeight}px` }, { height: '0px' }],
                    { duration, easing: 'ease-in-out' }
                );
                panel._audienceAnimation = animation;
                animation.onfinish = () => {
                    if (panel._audienceAnimation !== animation) return;
                    item.open = false;
                    panel._audienceIsClosing = false;
                    panel.style.height = '';
                    panel._audienceAnimation = null;
                };
            }
        });
    });

    // ----------------------------------------------------
    // 5. Dynamic Footer Year Update
    // ----------------------------------------------------
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
