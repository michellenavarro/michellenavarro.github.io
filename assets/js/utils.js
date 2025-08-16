// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

import { ANIMATION, BREAKPOINTS } from './constants.js';

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
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

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 * @param {string|Element} target - Target element or selector
 * @param {Object} options - Scroll options
 */
export function smoothScrollTo(target, options = {}) {
    const defaultOptions = {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    };
    
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
        element.scrollIntoView({ ...defaultOptions, ...options });
    }
}

/**
 * Get current scroll position
 * @returns {number} Current scroll Y position
 */
export function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * Add CSS class to element
 * @param {Element} element - Target element
 * @param {string} className - Class name to add
 */
export function addClass(element, className) {
    if (element && element.classList) {
        element.classList.add(className);
    }
}

/**
 * Remove CSS class from element
 * @param {Element} element - Target element
 * @param {string} className - Class name to remove
 */
export function removeClass(element, className) {
    if (element && element.classList) {
        element.classList.remove(className);
    }
}

/**
 * Toggle CSS class on element
 * @param {Element} element - Target element
 * @param {string} className - Class name to toggle
 */
export function toggleClass(element, className) {
    if (element && element.classList) {
        element.classList.toggle(className);
    }
}

/**
 * Check if element has CSS class
 * @param {Element} element - Target element
 * @param {string} className - Class name to check
 * @returns {boolean} True if element has class
 */
export function hasClass(element, className) {
    return element && element.classList && element.classList.contains(className);
}

/**
 * Get computed style value
 * @param {Element} element - Target element
 * @param {string} property - CSS property name
 * @returns {string} Computed style value
 */
export function getComputedStyle(element, property) {
    if (element && element.style) {
        return window.getComputedStyle(element).getPropertyValue(property);
    }
    return '';
}

/**
 * Set CSS custom property
 * @param {Element} element - Target element
 * @param {string} property - CSS custom property name
 * @param {string} value - Value to set
 */
export function setCSSProperty(element, property, value) {
    if (element && element.style) {
        element.style.setProperty(property, value);
    }
}

/**
 * Get CSS custom property
 * @param {Element} element - Target element
 * @param {string} property - CSS custom property name
 * @returns {string} CSS custom property value
 */
export function getCSSProperty(element, property) {
    if (element && element.style) {
        return getComputedStyle(element, `--${property}`);
    }
    return '';
}

/**
 * Check if device is mobile
 * @returns {boolean} True if device is mobile
 */
export function isMobile() {
    return window.innerWidth <= parseInt(BREAKPOINTS.TABLET);
}

/**
 * Check if device is tablet
 * @returns {boolean} True if device is tablet
 */
export function isTablet() {
    const width = window.innerWidth;
    return width > parseInt(BREAKPOINTS.TABLET) && width <= parseInt(BREAKPOINTS.DESKTOP);
}

/**
 * Check if device is desktop
 * @returns {boolean} True if device is desktop
 */
export function isDesktop() {
    return window.innerWidth > parseInt(BREAKPOINTS.DESKTOP);
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate random ID
 * @param {number} length - Length of ID
 * @returns {string} Random ID
 */
export function generateId(length = 8) {
    return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}
