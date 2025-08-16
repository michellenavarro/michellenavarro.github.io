// ============================================================================
// ANIMATIONS MODULE
// ============================================================================

import { DOM, Events, Performance } from '../utils.js';
import { AOS_CONFIG, INTERSECTION_CONFIG, PARALLAX, HOVER_EFFECTS } from '../constants.js';

/**
 * Animations Module
 * Handles all animation-related functionality
 */
export class Animations {
    constructor() {
        this.parallaxElements = [];
        this.intersectionObservers = [];
        this.isInitialized = false;
        
        this.init();
    }

    /**
     * Initialize animations
     */
    init() {
        if (this.isInitialized) return;
        
        this.initAOS();
        this.setupParallaxEffects();
        this.setupHoverEffects();
        this.setupIntersectionObservers();
        
        this.isInitialized = true;
    }

    /**
     * Initialize AOS (Animate On Scroll)
     */
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: parseInt(AOS_CONFIG.DURATION),
                easing: AOS_CONFIG.EASING,
                once: AOS_CONFIG.ONCE,
                offset: parseInt(AOS_CONFIG.OFFSET)
            });
        } else {
            console.warn('AOS library not loaded, falling back to custom animations');
            this.setupCustomScrollAnimations();
        }
    }

    /**
     * Setup custom scroll animations as fallback
     */
    setupCustomScrollAnimations() {
        const animatedElements = DOM.getAll('[data-aos]');
        
        animatedElements.forEach(element => {
            const animationType = element.getAttribute('data-aos');
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            // Set initial state
            this.setInitialAnimationState(element, animationType);
            
            // Create intersection observer
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                this.animateElement(element, animationType);
                            }, parseInt(delay));
                            observer.unobserve(element);
                        }
                    });
                },
                INTERSECTION_CONFIG
            );
            
            observer.observe(element);
            this.intersectionObservers.push(observer);
        });
    }

    /**
     * Set initial animation state
     */
    setInitialAnimationState(element, animationType) {
        const states = {
            'fade-up': { opacity: '0', transform: 'translateY(30px)' },
            'fade-down': { opacity: '0', transform: 'translateY(-30px)' },
            'fade-left': { opacity: '0', transform: 'translateX(-30px)' },
            'fade-right': { opacity: '0', transform: 'translateX(30px)' },
            'fade': { opacity: '0' },
            'zoom-in': { opacity: '0', transform: 'scale(0.8)' },
            'zoom-out': { opacity: '0', transform: 'scale(1.2)' }
        };
        
        const state = states[animationType] || states['fade-up'];
        Object.assign(element.style, state);
    }

    /**
     * Animate element
     */
    animateElement(element, animationType) {
        const finalStates = {
            'fade-up': { opacity: '1', transform: 'translateY(0)' },
            'fade-down': { opacity: '1', transform: 'translateY(0)' },
            'fade-left': { opacity: '1', transform: 'translateX(0)' },
            'fade-right': { opacity: '1', transform: 'translateX(0)' },
            'fade': { opacity: '1' },
            'zoom-in': { opacity: '1', transform: 'scale(1)' },
            'zoom-out': { opacity: '1', transform: 'scale(1)' }
        };
        
        const finalState = finalStates[animationType] || finalStates['fade-up'];
        
        // Add transition
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Apply final state
        Object.assign(element.style, finalState);
    }

    /**
     * Setup parallax effects
     */
    setupParallaxEffects() {
        const parallaxElements = DOM.getAll('.hero-bg-shape');
        
        parallaxElements.forEach((element, index) => {
            this.parallaxElements.push({
                element,
                speed: PARALLAX.SPEED_BASE + (index * PARALLAX.SPEED_INCREMENT)
            });
        });
        
        if (this.parallaxElements.length > 0) {
            DOM.on(window, 'scroll', Events.throttle(this.handleParallax.bind(this), 16));
        }
    }

    /**
     * Handle parallax scrolling
     */
    handleParallax() {
        const scrolled = window.pageYOffset;
        
        this.parallaxElements.forEach(({ element, speed }) => {
            if (element && element.parentElement) {
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    /**
     * Setup hover effects
     */
    setupHoverEffects() {
        // Work cards
        const workCards = DOM.getAll('.work-card');
        workCards.forEach(card => this.setupCardHoverEffect(card));
        
        // Skill tags
        const skillTags = DOM.getAll('.skill-tag');
        skillTags.forEach(tag => this.setupSkillTagHoverEffect(tag));
        
        // Buttons
        const buttons = DOM.getAll('.btn');
        buttons.forEach(button => this.setupButtonHoverEffect(button));
    }

    /**
     * Setup card hover effect
     */
    setupCardHoverEffect(card) {
        if (!card) return;
        
        DOM.on(card, 'mouseenter', () => {
            Performance.raf(() => {
                card.style.transform = `translateY(${HOVER_EFFECTS.CARD.TRANSLATE_Y}) scale(${HOVER_EFFECTS.CARD.SCALE})`;
            });
        });
        
        DOM.on(card, 'mouseleave', () => {
            Performance.raf(() => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    /**
     * Setup skill tag hover effect
     */
    setupSkillTagHoverEffect(tag) {
        if (!tag) return;
        
        DOM.on(tag, 'mouseenter', () => {
            Performance.raf(() => {
                tag.style.transform = `scale(${HOVER_EFFECTS.SKILL_TAG.SCALE}) rotate(${HOVER_EFFECTS.SKILL_TAG.ROTATE})`;
            });
        });
        
        DOM.on(tag, 'mouseleave', () => {
            Performance.raf(() => {
                tag.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    /**
     * Setup button hover effect
     */
    setupButtonHoverEffect(button) {
        if (!button) return;
        
        DOM.on(button, 'mouseenter', () => {
            Performance.raf(() => {
                button.style.transform = `translateY(${HOVER_EFFECTS.BUTTON.TRANSLATE_Y})`;
            });
        });
        
        DOM.on(button, 'mouseleave', () => {
            Performance.raf(() => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Setup intersection observers for skill categories
     */
    setupIntersectionObservers() {
        const skillCategories = DOM.getAll('.skill-category');
        
        if (skillCategories.length > 0) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateSkillCategory(entry.target);
                        }
                    });
                },
                INTERSECTION_CONFIG
            );
            
            skillCategories.forEach(category => {
                observer.observe(category);
            });
            
            this.intersectionObservers.push(observer);
        }
    }

    /**
     * Animate skill category
     */
    animateSkillCategory(category) {
        if (!category) return;
        
        // Set initial state
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        
        // Animate in
        Performance.raf(() => {
            category.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        });
    }

    /**
     * Add floating animation to elements
     */
    addFloatingAnimation(element, duration = 6000, delay = 0) {
        if (!element) return;
        
        element.style.animation = `float ${duration}ms ease-in-out infinite`;
        element.style.animationDelay = `${delay}ms`;
    }

    /**
     * Add bounce animation to elements
     */
    addBounceAnimation(element, duration = 2000) {
        if (!element) return;
        
        element.style.animation = `bounce ${duration}ms infinite`;
    }

    /**
     * Add pulse animation to elements
     */
    addPulseAnimation(element, duration = 2000) {
        if (!element) return;
        
        element.style.animation = `pulse ${duration}ms ease-in-out infinite`;
    }

    /**
     * Remove all animations from element
     */
    removeAnimations(element) {
        if (!element) return;
        
        element.style.animation = '';
        element.style.transition = '';
        element.style.transform = '';
        element.style.opacity = '';
    }

    /**
     * Pause all animations
     */
    pauseAnimations() {
        const animatedElements = DOM.getAll('[style*="animation"]');
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }

    /**
     * Resume all animations
     */
    resumeAnimations() {
        const animatedElements = DOM.getAll('[style*="animation"]');
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }

    /**
     * Destroy animations module
     */
    destroy() {
        // Disconnect intersection observers
        this.intersectionObservers.forEach(observer => {
            observer.disconnect();
        });
        
        // Remove event listeners
        DOM.off(window, 'scroll', this.handleParallax);
        
        // Reset state
        this.isInitialized = false;
        this.parallaxElements = [];
        this.intersectionObservers = [];
        
        // Remove all animations
        const animatedElements = DOM.getAll('[data-aos], .hero-bg-shape, .work-card, .skill-tag, .btn');
        animatedElements.forEach(element => {
            this.removeAnimations(element);
        });
    }
}

/**
 * Create and export animations instance
 */
export const animations = new Animations();
