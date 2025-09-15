// ============================================================================
// ANIMATIONS MODULE
// ============================================================================

import { throttle } from './utils.js';
import { ANIMATION } from './constants.js';

class Animations {
    constructor() {
        this.heroShapes = document.querySelectorAll('.hero-bg-shape');
        this.workCards = document.querySelectorAll('.work-card');
        this.skillCategoryCards = document.querySelectorAll('.skill-category-card');
        
        this.init();
    }
    
    init() {
        this.initAOS();
        this.bindEvents();
        this.setupParallaxEffects();
    }
    
    initAOS() {
        // Initialize AOS animations if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: ANIMATION.DURATION.SLOWER,
                easing: ANIMATION.EASING.CUBIC,
                once: true,
                offset: 100,
                delay: 0,
                anchorPlacement: 'top-bottom'
            });
        }
    }
    
    bindEvents() {
        // Work card hover effects
        this.setupWorkCardAnimations();
        
        // Skill category card hover effects
        this.setupSkillCategoryCardAnimations();
        
        // Parallax effect for hero background shapes
        window.addEventListener('scroll', throttle(this.handleParallax.bind(this), 16));
    }
    
    setupWorkCardAnimations() {
        this.workCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleWorkCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleWorkCardLeave.bind(this));
        });
    }
    
    setupSkillCategoryCardAnimations() {
        // Skill category cards use CSS-only hover effects for consistency
        // No additional JavaScript animations needed
    }
    
    handleWorkCardHover(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.transition = `transform ${ANIMATION.DURATION.NORMAL}ms ${ANIMATION.EASING.CUBIC}`;
    }
    
    handleWorkCardLeave(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
    }
    
    // Removed skill tag hover handlers to let CSS handle styling
    // handleSkillTagHover(event) {
    //     const tag = event.currentTarget;
    //     tag.style.transform = 'scale(1.1) rotate(2deg)';
    //     tag.style.transition = `transform ${ANIMATION.DURATION.FAST}ms ${ANIMATION.EASING.EASE_OUT}`;
    // }
    
    // handleSkillTagLeave(event) {
    //     const tag = event.currentTarget;
    //     tag.style.transform = 'scale(1) rotate(0deg)';
    // }
    
    setupParallaxEffects() {
        // Add CSS for parallax animation
        this.addParallaxStyles();
    }
    
    addParallaxStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hero-bg-shape {
                transition: transform 0.1s ease-out;
            }
        `;
        document.head.appendChild(style);
    }
    
    handleParallax() {
        const scrolled = window.pageYOffset;
        
        this.heroShapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.2);
            const translateY = scrolled * speed;
            
            shape.style.transform = `translateY(${translateY}px)`;
        });
    }
    
    // Public method to refresh AOS animations
    refreshAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
    
    // Public method to add custom animation to element
    addCustomAnimation(element, animationType, options = {}) {
        const defaultOptions = {
            duration: ANIMATION.DURATION.NORMAL,
            easing: ANIMATION.EASING.EASE_OUT,
            delay: 0
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        element.style.transition = `all ${finalOptions.duration}ms ${finalOptions.easing}`;
        element.style.transitionDelay = `${finalOptions.delay}ms`;
        
        // Add animation class
        element.classList.add(`custom-animation-${animationType}`);
    }
    
    // Public method to remove custom animation from element
    removeCustomAnimation(element, animationType) {
        element.classList.remove(`custom-animation-${animationType}`);
        element.style.transition = '';
        element.style.transitionDelay = '';
    }
    
    // Public method to animate element entrance
    animateEntrance(element, direction = 'up', delay = 0) {
        const directions = {
            up: 'translateY(30px)',
            down: 'translateY(-30px)',
            left: 'translateX(30px)',
            right: 'translateX(-30px)'
        };
        
        element.style.opacity = '0';
        element.style.transform = directions[direction] || directions.up;
        element.style.transition = `opacity ${ANIMATION.DURATION.SLOW}ms ${ANIMATION.EASING.CUBIC}, transform ${ANIMATION.DURATION.SLOW}ms ${ANIMATION.EASING.CUBIC}`;
        element.style.transitionDelay = `${delay}ms`;
        
        // Trigger animation
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
        });
    }
    
    // Public method to animate element exit
    animateExit(element, direction = 'up', callback) {
        const directions = {
            up: 'translateY(-30px)',
            down: 'translateY(30px)',
            left: 'translateX(-30px)',
            right: 'translateX(30px)'
        };
        
        element.style.transform = directions[direction] || directions.up;
        element.style.opacity = '0';
        
        setTimeout(() => {
            if (callback && typeof callback === 'function') {
                callback();
            }
        }, ANIMATION.DURATION.SLOW);
    }
}

export default Animations;
