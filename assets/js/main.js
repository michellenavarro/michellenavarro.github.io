// ============================================================================
// MAIN APPLICATION ENTRY POINT
// ============================================================================

import Navigation from './navigation.js';
import Animations from './animations.js';

class PortfolioApp {
    constructor() {
        this.navigation = null;
        this.animations = null;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.setupApp.bind(this));
        } else {
            this.setupApp();
        }
    }
    
    setupApp() {
        try {
            // Initialize navigation
            this.navigation = new Navigation();
            
            // Initialize animations
            this.animations = new Animations();
            
            // Setup additional event listeners
            this.setupGlobalEvents();
            
            console.log('Portfolio application initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio application:', error);
        }
    }
    
    setupGlobalEvents() {
        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Handle page visibility change
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Handle beforeunload
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    }
    
    handleResize() {
        // Refresh animations on resize
        if (this.animations) {
            this.animations.refreshAOS();
        }
        
        // Close mobile menu on resize if screen becomes larger
        if (window.innerWidth > 768 && this.navigation && this.navigation.isMenuOpen()) {
            this.navigation.closeMenu();
        }
    }
    
    handleVisibilityChange() {
        if (document.visibilityState === 'visible') {
            // Page became visible, refresh animations
            if (this.animations) {
                this.animations.refreshAOS();
            }
        }
    }
    
    handleBeforeUnload() {
        // Clean up any ongoing animations or timers
        if (this.animations) {
            // Remove any custom animations
            document.querySelectorAll('[class*="custom-animation-"]').forEach(element => {
                element.style.transition = '';
                element.style.transitionDelay = '';
            });
        }
    }
    
    // Public method to get navigation instance
    getNavigation() {
        return this.navigation;
    }
    
    // Public method to get animations instance
    getAnimations() {
        return this.animations;
    }
    
    // Public method to refresh all animations
    refreshAnimations() {
        if (this.animations) {
            this.animations.refreshAOS();
        }
    }
    
    // Public method to close mobile menu
    closeMobileMenu() {
        if (this.navigation) {
            this.navigation.closeMenu();
        }
    }
}

// Initialize the application
const app = new PortfolioApp();

// Make app available globally for debugging
window.portfolioApp = app;

// Export for potential module usage
export default app;
