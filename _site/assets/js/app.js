// ============================================================================
// MAIN APPLICATION
// ============================================================================

import { navigation } from './modules/navigation.js';
import { animations } from './modules/animations.js';
import { DOM, Performance } from './utils.js';

/**
 * Main Application Class
 * Orchestrates all modules and manages application lifecycle
 */
export class PortfolioApp {
    constructor() {
        this.modules = [];
        this.isInitialized = false;
        
        this.init();
    }

    /**
     * Initialize application
     */
    init() {
        if (this.isInitialized) return;
        
        try {
            this.setupModules();
            this.bindGlobalEvents();
            this.setupPerformanceMonitoring();
            
            this.isInitialized = true;
            console.log('Portfolio application initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize portfolio application:', error);
        }
    }

    /**
     * Setup application modules
     */
    setupModules() {
        // Add modules to the list
        this.modules = [
            { name: 'Navigation', instance: navigation },
            { name: 'Animations', instance: animations }
        ];
        
        // Verify all modules are properly initialized
        this.modules.forEach(module => {
            if (!module.instance || !module.instance.isInitialized) {
                console.warn(`Module ${module.name} may not be properly initialized`);
            }
        });
    }

    /**
     * Bind global event listeners
     */
    bindGlobalEvents() {
        // Handle page visibility changes
        DOM.on(document, 'visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Handle window focus/blur
        DOM.on(window, 'focus', this.handleWindowFocus.bind(this));
        DOM.on(window, 'blur', this.handleWindowBlur.bind(this));
        
        // Handle beforeunload
        DOM.on(window, 'beforeunload', this.handleBeforeUnload.bind(this));
        
        // Handle error events
        DOM.on(window, 'error', this.handleError.bind(this));
        DOM.on(window, 'unhandledrejection', this.handleUnhandledRejection.bind(this));
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor page load performance
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.logPerformanceMetrics();
                }, 0);
            });
        }
        
        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            try {
                const longTaskObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.duration > 50) {
                            console.warn('Long task detected:', entry);
                        }
                    });
                });
                
                longTaskObserver.observe({ entryTypes: ['longtask'] });
            } catch (error) {
                console.warn('PerformanceObserver not supported:', error);
            }
        }
    }

    /**
     * Handle page visibility change
     */
    handleVisibilityChange() {
        if (document.hidden) {
            this.onPageHidden();
        } else {
            this.onPageVisible();
        }
    }

    /**
     * Handle page hidden
     */
    onPageHidden() {
        // Pause animations to save resources
        if (animations && animations.pauseAnimations) {
            animations.pauseAnimations();
        }
        
        console.log('Page hidden - animations paused');
    }

    /**
     * Handle page visible
     */
    onPageVisible() {
        // Resume animations
        if (animations && animations.resumeAnimations) {
            animations.resumeAnimations();
        }
        
        console.log('Page visible - animations resumed');
    }

    /**
     * Handle window focus
     */
    handleWindowFocus() {
        // Resume animations when window gains focus
        if (animations && animations.resumeAnimations) {
            animations.resumeAnimations();
        }
    }

    /**
     * Handle window blur
     */
    handleWindowBlur() {
        // Pause animations when window loses focus
        if (animations && animations.pauseAnimations) {
            animations.pauseAnimations();
        }
    }

    /**
     * Handle before unload
     */
    handleBeforeUnload() {
        // Clean up resources before page unload
        this.cleanup();
    }

    /**
     * Handle JavaScript errors
     */
    handleError(event) {
        console.error('JavaScript error:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
    }

    /**
     * Handle unhandled promise rejections
     */
    handleUnhandledRejection(event) {
        console.error('Unhandled promise rejection:', {
            reason: event.reason,
            promise: event.promise
        });
    }

    /**
     * Log performance metrics
     */
    logPerformanceMetrics() {
        if (!window.performance || !window.performance.timing) return;
        
        const timing = window.performance.timing;
        const metrics = {
            'DNS Lookup': timing.domainLookupEnd - timing.domainLookupStart,
            'TCP Connection': timing.connectEnd - timing.connectStart,
            'First Byte': timing.responseStart - timing.requestStart,
            'DOM Content Loaded': timing.domContentLoadedEventEnd - timing.navigationStart,
            'Page Load': timing.loadEventEnd - timing.navigationStart
        };
        
        console.log('Performance Metrics:', metrics);
        
        // Log slow metrics
        Object.entries(metrics).forEach(([name, duration]) => {
            if (duration > 1000) {
                console.warn(`Slow ${name}: ${duration}ms`);
            }
        });
    }

    /**
     * Get application status
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            modules: this.modules.map(module => ({
                name: module.name,
                isInitialized: module.instance.isInitialized || false
            })),
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Reload application
     */
    reload() {
        console.log('Reloading portfolio application...');
        
        this.cleanup();
        this.isInitialized = false;
        
        setTimeout(() => {
            this.init();
        }, 100);
    }

    /**
     * Cleanup application resources
     */
    cleanup() {
        console.log('Cleaning up portfolio application...');
        
        // Destroy all modules
        this.modules.forEach(module => {
            if (module.instance && typeof module.instance.destroy === 'function') {
                try {
                    module.instance.destroy();
                } catch (error) {
                    console.error(`Error destroying module ${module.name}:`, error);
                }
            }
        });
        
        // Remove global event listeners
        DOM.off(document, 'visibilitychange', this.handleVisibilityChange);
        DOM.off(window, 'focus', this.handleWindowFocus);
        DOM.off(window, 'blur', this.handleWindowBlur);
        DOM.off(window, 'beforeunload', this.handleBeforeUnload);
        DOM.off(window, 'error', this.handleError);
        DOM.off(window, 'unhandledrejection', this.handleUnhandledRejection);
        
        this.isInitialized = false;
    }

    /**
     * Destroy application
     */
    destroy() {
        this.cleanup();
        console.log('Portfolio application destroyed');
    }
}

/**
 * Initialize application when DOM is ready
 */
function initializeApp() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        DOM.on(document, 'DOMContentLoaded', () => {
            window.portfolioApp = new PortfolioApp();
        });
    } else {
        // DOM is already loaded
        window.portfolioApp = new PortfolioApp();
    }
}

// Auto-initialize when this module is loaded
initializeApp();

// Export for manual initialization if needed
export default PortfolioApp;
