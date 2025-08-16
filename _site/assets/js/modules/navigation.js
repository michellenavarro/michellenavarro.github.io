// ============================================================================
// NAVIGATION MODULE
// ============================================================================

import { DOM, Scroll, Events } from '../utils.js';
import { LAYOUT, Z_INDEX } from '../constants.js';

/**
 * Navigation Module
 * Handles all navigation-related functionality
 */
export class Navigation {
    constructor() {
        this.navbar = null;
        this.navToggle = null;
        this.navLinks = null;
        this.isScrolled = false;
        this.isMobileMenuOpen = false;
        
        this.init();
    }

    /**
     * Initialize navigation
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupSmoothScrolling();
    }

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.navbar = DOM.get('.navbar');
        this.navToggle = DOM.get('.nav-toggle');
        this.navLinks = DOM.get('.nav-links');
        
        if (!this.navbar || !this.navToggle || !this.navLinks) {
            console.error('Navigation elements not found');
            return;
        }
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Scroll effect
        DOM.on(window, 'scroll', Events.throttle(this.handleScroll.bind(this), 16));
        
        // Mobile menu toggle
        DOM.on(this.navToggle, 'click', this.toggleMobileMenu.bind(this));
        
        // Close mobile menu on window resize
        DOM.on(window, 'resize', Events.debounce(this.handleResize.bind(this), 250));
        
        // Close mobile menu when clicking outside
        DOM.on(document, 'click', this.handleOutsideClick.bind(this));
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        const scrollPosition = Scroll.getPosition();
        const scrollThreshold = 100;

        if (scrollPosition > scrollThreshold && !this.isScrolled) {
            this.addScrollClass();
        } else if (scrollPosition <= scrollThreshold && this.isScrolled) {
            this.removeScrollClass();
        }
    }

    /**
     * Add scrolled class to navbar
     */
    addScrollClass() {
        this.navbar.classList.add('navbar-scrolled');
        this.isScrolled = true;
    }

    /**
     * Remove scrolled class from navbar
     */
    removeScrollClass() {
        this.navbar.classList.remove('navbar-scrolled');
        this.isScrolled = false;
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        
        if (this.isMobileMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    openMobileMenu() {
        this.navLinks.classList.add('nav-links-active');
        this.navToggle.classList.add('nav-toggle-active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.navLinks.classList.remove('nav-links-active');
        this.navToggle.classList.remove('nav-toggle-active');
        document.body.style.overflow = '';
    }

    /**
     * Handle window resize
     */
    handleResize() {
        if (window.innerWidth > parseInt(LAYOUT.BREAKPOINTS.TABLET) && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    /**
     * Handle clicks outside mobile menu
     */
    handleOutsideClick(event) {
        const isClickInsideNav = this.navbar.contains(event.target);
        const isClickOnToggle = this.navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    /**
     * Setup smooth scrolling for navigation links
     */
    setupSmoothScrolling() {
        const navLinks = DOM.getAll('a[href^="#"]', this.navLinks);
        
        navLinks.forEach(link => {
            DOM.on(link, 'click', (event) => {
                event.preventDefault();
                const target = link.getAttribute('href');
                
                if (target && target !== '#') {
                    this.scrollToSection(target);
                }
            });
        });
    }

    /**
     * Scroll to section
     */
    scrollToSection(target) {
        const targetElement = DOM.get(target);
        
        if (targetElement) {
            // Close mobile menu if open
            if (this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
            
            // Scroll to target
            Scroll.to(targetElement, {
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active navigation link
            this.updateActiveLink(target);
        }
    }

    /**
     * Update active navigation link
     */
    updateActiveLink(target) {
        const navLinks = DOM.getAll('a[href^="#"]', this.navLinks);
        
        navLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href') === target) {
                link.classList.add('nav-link-active');
            }
        });
    }

    /**
     * Update active link based on scroll position
     */
    updateActiveLinkOnScroll() {
        const sections = DOM.getAll('section[id]');
        const navLinks = DOM.getAll('a[href^="#"]', this.navLinks);
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = Scroll.getPosition();
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('nav-link-active');
            }
        });
    }

    /**
     * Destroy navigation module
     */
    destroy() {
        // Remove event listeners
        DOM.off(window, 'scroll', this.handleScroll);
        DOM.off(this.navToggle, 'click', this.toggleMobileMenu);
        DOM.off(window, 'resize', this.handleResize);
        DOM.off(document, 'click', this.handleOutsideClick);
        
        // Reset state
        this.isScrolled = false;
        this.isMobileMenuOpen = false;
        
        // Remove classes
        if (this.navbar) {
            this.navbar.classList.remove('navbar-scrolled');
        }
        if (this.navLinks) {
            this.navLinks.classList.remove('nav-links-active');
        }
        if (this.navToggle) {
            this.navToggle.classList.remove('nav-toggle-active');
        }
        
        document.body.style.overflow = '';
    }
}

/**
 * Create and export navigation instance
 */
export const navigation = new Navigation();
