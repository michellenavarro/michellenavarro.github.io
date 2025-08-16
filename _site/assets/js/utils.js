// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

import { ANIMATION, HOVER_EFFECTS } from './constants.js';

/**
 * DOM Utility Functions
 */
export const DOM = {
    /**
     * Get element by selector
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (defaults to document)
     * @returns {Element|null}
     */
    get: (selector, parent = document) => parent.querySelector(selector),

    /**
     * Get all elements by selector
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (defaults to document)
     * @returns {NodeList}
     */
    getAll: (selector, parent = document) => parent.querySelectorAll(selector),

    /**
     * Create element with attributes
     * @param {string} tag - HTML tag name
     * @param {Object} attributes - Element attributes
     * @returns {Element}
     */
    create: (tag, attributes = {}) => {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'textContent') {
                element.textContent = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        return element;
    },

    /**
     * Add event listener with error handling
     * @param {Element} element - Target element
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     */
    on: (element, event, handler, options = {}) => {
        try {
            element.addEventListener(event, handler, options);
        } catch (error) {
            console.error(`Error adding event listener for ${event}:`, error);
        }
    },

    /**
     * Remove event listener
     * @param {Element} element - Target element
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     */
    off: (element, event, handler) => {
        try {
            element.removeEventListener(event, handler);
        } catch (error) {
            console.error(`Error removing event listener for ${event}:`, error);
        }
    }
};

/**
 * Animation Utility Functions
 */
export const Animation = {
    /**
     * Apply CSS transition to element
     * @param {Element} element - Target element
     * @param {string} property - CSS property to animate
     * @param {string} duration - Animation duration
     * @param {string} easing - Easing function
     */
    setTransition: (element, property = 'all', duration = ANIMATION.DURATION.NORMAL, easing = ANIMATION.EASING.SMOOTH) => {
        element.style.transition = `${property} ${duration} ${easing}`;
    },

    /**
     * Fade in element
     * @param {Element} element - Target element
     * @param {number} duration - Animation duration in ms
     */
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            element.style.display = '';
        }, duration);
    },

    /**
     * Fade out element
     * @param {Element} element - Target element
     * @param {number} duration - Animation duration in ms
     */
    fadeOut: (element, duration = 300) => {
        element.style.opacity = '1';
        
        setTimeout(() => {
            element.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    },

    /**
     * Slide element in from direction
     * @param {Element} element - Target element
     * @param {string} direction - 'left', 'right', 'up', 'down'
     * @param {number} distance - Distance to slide in pixels
     */
    slideIn: (element, direction = 'up', distance = 50) => {
        const transforms = {
            left: `translateX(-${distance}px)`,
            right: `translateX(${distance}px)`,
            up: `translateY(-${distance}px)`,
            down: `translateY(${distance}px)`
        };

        element.style.transform = transforms[direction] || transforms.up;
        element.style.opacity = '0';
        element.style.display = 'block';

        setTimeout(() => {
            element.style.transform = 'translateX(0) translateY(0)';
            element.style.opacity = '1';
        }, 10);
    }
};

/**
 * Scroll Utility Functions
 */
export const Scroll = {
    /**
     * Smooth scroll to element
     * @param {Element|string} target - Target element or selector
     * @param {Object} options - Scroll options
     */
    to: (target, options = {}) => {
        const defaultOptions = {
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        };

        const scrollOptions = { ...defaultOptions, ...options };
        
        try {
            const element = typeof target === 'string' ? DOM.get(target) : target;
            if (element) {
                element.scrollIntoView(scrollOptions);
            }
        } catch (error) {
            console.error('Error scrolling to element:', error);
        }
    },

    /**
     * Get current scroll position
     * @returns {number}
     */
    getPosition: () => {
        return window.pageYOffset || document.documentElement.scrollTop;
    },

    /**
     * Check if element is in viewport
     * @param {Element} element - Target element
     * @param {number} threshold - Visibility threshold (0-1)
     * @returns {boolean}
     */
    isInViewport: (element, threshold = 0.5) => {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return rect.top <= windowHeight * (1 - threshold) && rect.bottom >= windowHeight * threshold;
    }
};

/**
 * Event Utility Functions
 */
export const Events = {
    /**
     * Debounce function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function}
     */
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function calls
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in ms
     * @returns {Function}
     */
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

/**
 * Hover Effect Utility Functions
 */
export const HoverEffects = {
    /**
     * Apply card hover effect
     * @param {Element} element - Target element
     */
    applyCardEffect: (element) => {
        if (!element) return;

        DOM.on(element, 'mouseenter', () => {
            element.style.transform = `translateY(${HOVER_EFFECTS.CARD.TRANSLATE_Y}) scale(${HOVER_EFFECTS.CARD.SCALE})`;
        });

        DOM.on(element, 'mouseleave', () => {
            element.style.transform = 'translateY(0) scale(1)';
        });
    },

    /**
     * Apply skill tag hover effect
     * @param {Element} element - Target element
     */
    applySkillTagEffect: (element) => {
        if (!element) return;

        DOM.on(element, 'mouseenter', () => {
            element.style.transform = `scale(${HOVER_EFFECTS.SKILL_TAG.SCALE}) rotate(${HOVER_EFFECTS.SKILL_TAG.ROTATE})`;
        });

        DOM.on(element, 'mouseleave', () => {
            element.style.transform = 'scale(1) rotate(0deg)';
        });
    },

    /**
     * Apply button hover effect
     * @param {Element} element - Target element
     */
    applyButtonEffect: (element) => {
        if (!element) return;

        DOM.on(element, 'mouseenter', () => {
            element.style.transform = `translateY(${HOVER_EFFECTS.BUTTON.TRANSLATE_Y})`;
        });

        DOM.on(element, 'mouseleave', () => {
            element.style.transform = 'translateY(0)';
        });
    }
};

/**
 * Validation Utility Functions
 */
export const Validation = {
    /**
     * Check if value is a valid email
     * @param {string} email - Email to validate
     * @returns {boolean}
     */
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Check if element exists
     * @param {Element} element - Element to check
     * @returns {boolean}
     */
    elementExists: (element) => {
        return element && element instanceof Element;
    }
};

/**
 * Performance Utility Functions
 */
export const Performance = {
    /**
     * Measure function execution time
     * @param {Function} func - Function to measure
     * @param {string} label - Label for console output
     * @returns {any} - Function result
     */
    measure: (func, label = 'Function') => {
        const start = performance.now();
        const result = func();
        const end = performance.now();
        console.log(`${label} took ${(end - start).toFixed(2)}ms`);
        return result;
    },

    /**
     * Request animation frame wrapper
     * @param {Function} callback - Function to execute
     */
    raf: (callback) => {
        if (typeof requestAnimationFrame !== 'undefined') {
            requestAnimationFrame(callback);
        } else {
            setTimeout(callback, 16); // Fallback to 60fps
        }
    }
};
