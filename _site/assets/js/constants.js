// ============================================================================
// PORTFOLIO WEBSITE CONSTANTS
// ============================================================================

// Color Palette
export const COLORS = {
    // Primary Purple Theme
    PRIMARY: {
        MAIN: '#8b5cf6',
        LIGHT: '#a855f7',
        DARK: '#7c3aed',
        DARKER: '#6d28d9',
        LIGHTER: '#c084fc',
        TRANSPARENT: {
            '10': 'rgba(139, 92, 246, 0.1)',
            '20': 'rgba(139, 92, 246, 0.2)',
            '30': 'rgba(139, 92, 246, 0.3)',
            '40': 'rgba(139, 92, 246, 0.4)',
            '50': 'rgba(139, 92, 246, 0.5)',
        }
    },
    
    // Text Colors
    TEXT: {
        PRIMARY: '#1f2937',
        SECONDARY: '#4b5563',
        TERTIARY: '#6b7280',
        LIGHT: '#9ca3af',
        WHITE: '#ffffff'
    },
    
    // Background Colors
    BACKGROUND: {
        PRIMARY: '#ffffff',
        SECONDARY: '#faf5ff',
        TERTIARY: '#f3e8ff',
        DARK: '#1f2937'
    },
    
    // Gradients
    GRADIENTS: {
        PRIMARY: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
        SECONDARY: 'linear-gradient(135deg, #a855f7, #c084fc)',
        TERTIARY: 'linear-gradient(135deg, #c084fc, #8b5cf6)',
        TEXT: 'linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc)'
    }
};

// Animation Configuration
export const ANIMATION = {
    // Durations
    DURATION: {
        FAST: '0.2s',
        NORMAL: '0.3s',
        SLOW: '0.5s',
        SLOWER: '0.8s',
        SLOWEST: '1s'
    },
    
    // Easing Functions
    EASING: {
        SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
        BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        ELASTIC: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    
    // Delays
    DELAY: {
        SMALL: '200ms',
        MEDIUM: '400ms',
        LARGE: '600ms'
    }
};

// Layout Configuration
export const LAYOUT = {
    // Container
    CONTAINER: {
        MAX_WIDTH: '1200px',
        PADDING: '2rem',
        PADDING_MOBILE: '1rem'
    },
    
    // Spacing
    SPACING: {
        XS: '0.5rem',
        SM: '1rem',
        MD: '1.5rem',
        LG: '2rem',
        XL: '3rem',
        XXL: '4rem',
        SECTION_PADDING: '6rem'
    },
    
    // Border Radius
    BORDER_RADIUS: {
        SM: '8px',
        MD: '12px',
        LG: '16px',
        XL: '25px',
        CIRCLE: '50%'
    },
    
    // Shadows
    SHADOWS: {
        SM: '0 4px 20px rgba(139, 92, 246, 0.1)',
        MD: '0 8px 20px rgba(139, 92, 246, 0.3)',
        LG: '0 20px 40px rgba(139, 92, 246, 0.15)',
        XL: '0 30px 60px rgba(139, 92, 246, 0.4)'
    }
};

// Typography Configuration
export const TYPOGRAPHY = {
    // Font Sizes
    FONT_SIZE: {
        XS: '0.8rem',
        SM: '0.9rem',
        BASE: '1rem',
        LG: '1.1rem',
        XL: '1.25rem',
        '2XL': '1.5rem',
        '3XL': '2rem',
        '4XL': '2.5rem',
        '5XL': '3rem',
        '6XL': '4rem'
    },
    
    // Font Weights
    FONT_WEIGHT: {
        LIGHT: '300',
        NORMAL: '400',
        MEDIUM: '500',
        SEMIBOLD: '600',
        BOLD: '700',
        EXTRABOLD: '800'
    },
    
    // Line Heights
    LINE_HEIGHT: {
        TIGHT: '1.1',
        NORMAL: '1.4',
        RELAXED: '1.6',
        LOOSE: '1.7'
    }
};

// Breakpoints
export const BREAKPOINTS = {
    MOBILE: '480px',
    TABLET: '768px',
    DESKTOP: '1024px',
    WIDE: '1280px'
};

// Z-Index Layers
export const Z_INDEX = {
    BASE: '1',
    CARD: '10',
    NAVIGATION: '1000',
    MODAL: '2000',
    TOOLTIP: '3000'
};

// AOS (Animate On Scroll) Configuration
export const AOS_CONFIG = {
    DURATION: '800',
    EASING: 'ease-out-cubic',
    ONCE: true,
    OFFSET: '100'
};

// Intersection Observer Configuration
export const INTERSECTION_CONFIG = {
    THRESHOLD: 0.5,
    ROOT_MARGIN: '0px 0px -100px 0px'
};

// Parallax Configuration
export const PARALLAX = {
    SPEED_BASE: 0.5,
    SPEED_INCREMENT: 0.2
};

// Hover Effects Configuration
export const HOVER_EFFECTS = {
    CARD: {
        TRANSLATE_Y: '-8px',
        SCALE: '1.02'
    },
    SKILL_TAG: {
        SCALE: '1.1',
        ROTATE: '2deg'
    },
    BUTTON: {
        TRANSLATE_Y: '-2px'
    }
};
