// ============================================================================
// NAVIGATION MODULE
// ============================================================================

import { addClass, removeClass, toggleClass, throttle } from './utils.js';
import { ANIMATION } from './constants.js';

class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navLinksItems = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupSmoothScrolling();
    }
    
    bindEvents() {
        // Navbar scroll effect
        window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 16));
        
        // Mobile navigation toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }
        
        // Close mobile menu when clicking on a link
        this.navLinksItems.forEach(link => {
            link.addEventListener('click', this.closeMobileMenu.bind(this));
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', this.handleOutsideClick.bind(this));
    }
    
    handleScroll() {
        const scrollY = window.pageYOffset;
        
        if (scrollY > 100) {
            this.addScrolledClass();
        } else {
            this.removeScrolledClass();
        }
    }
    
    addScrolledClass() {
        if (this.navbar && !this.navbar.classList.contains('navbar-scrolled')) {
            addClass(this.navbar, 'navbar-scrolled');
        }
    }
    
    removeScrolledClass() {
        if (this.navbar && this.navbar.classList.contains('navbar-scrolled')) {
            removeClass(this.navbar, 'navbar-scrolled');
        }
    }
    
    toggleMobileMenu() {
        if (this.navLinks && this.navToggle) {
            toggleClass(this.navLinks, 'nav-links-active');
            toggleClass(this.navToggle, 'nav-toggle-active');
        }
    }
    
    closeMobileMenu() {
        if (this.navLinks && this.navToggle) {
            removeClass(this.navLinks, 'nav-links-active');
            removeClass(this.navToggle, 'nav-toggle-active');
        }
    }
    
    handleOutsideClick(event) {
        const isClickInsideNav = this.navbar && this.navbar.contains(event.target);
        const isClickOnToggle = this.navToggle && this.navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle) {
            this.closeMobileMenu();
        }
    }
    
    setupSmoothScrolling() {
        this.navLinksItems.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    // Public method to programmatically close mobile menu
    closeMenu() {
        this.closeMobileMenu();
    }
    
    // Public method to check if mobile menu is open
    isMenuOpen() {
        return this.navLinks && this.navLinks.classList.contains('nav-links-active');
    }
}

export default Navigation;
