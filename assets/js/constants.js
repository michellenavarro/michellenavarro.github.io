// ============================================================================
// DESIGN SYSTEM CONSTANTS
// ============================================================================

export const COLORS = {
    // Primary Colors
    PRIMARY: '#8b5cf6',
    PRIMARY_LIGHT: '#a855f7',
    PRIMARY_DARK: '#7c3aed',
    PRIMARY_DARKER: '#6d28d9',
    PRIMARY_LIGHTER: '#c084fc',
    
    // Text Colors
    TEXT_PRIMARY: '#1f2937',
    TEXT_SECONDARY: '#6b7280',
    TEXT_LIGHT: '#9ca3af',
    
    // Background Colors
    BACKGROUND: '#ffffff',
    BACKGROUND_SECONDARY: '#f9fafb',
    BACKGROUND_DARK: '#111827',
    
    // Border Colors
    BORDER: '#e5e7eb',
    BORDER_LIGHT: '#f3f4f6',
};

export const TYPOGRAPHY = {
    // Font Family
    FONT_FAMILY: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    
    // Font Sizes
    FONT_SIZE: {
        XS: '0.75rem',
        SM: '0.875rem',
        BASE: '1rem',
        LG: '1.125rem',
        XL: '1.25rem',
        '2XL': '1.5rem',
        '3XL': '1.875rem',
        '4XL': '2.25rem',
        '5XL': '3rem',
        '6XL': '3.75rem',
        '7XL': '4.5rem',
        '8XL': '6rem',
    },
    
    // Font Weights
    FONT_WEIGHT: {
        LIGHT: 300,
        NORMAL: 400,
        MEDIUM: 500,
        SEMIBOLD: 600,
        BOLD: 700,
        EXTRABOLD: 800,
    },
    
    // Line Heights
    LINE_HEIGHT: {
        TIGHT: 1.25,
        SNUG: 1.375,
        NORMAL: 1.5,
        RELAXED: 1.625,
        LOOSE: 2,
    },
};

export const SPACING = {
    XS: '0.5rem',
    SM: '0.75rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem',
    '2XL': '3rem',
    '3XL': '4rem',
    '4XL': '6rem',
    '5XL': '8rem',
};

export const LAYOUT = {
    CONTAINER_MAX_WIDTH: '1200px',
    NAVBAR_HEIGHT: '70px',
    BORDER_RADIUS: {
        SM: '0.375rem',
        MD: '0.5rem',
        LG: '0.75rem',
        XL: '1rem',
        '2XL': '1.5rem',
    },
};

export const SHADOWS = {
    SM: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const TRANSITIONS = {
    FAST: '0.15s ease',
    NORMAL: '0.3s ease',
    SLOW: '0.5s ease',
    SLOWER: '0.8s ease',
};

export const Z_INDEX = {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
};

export const BREAKPOINTS = {
    MOBILE: '480px',
    TABLET: '768px',
    DESKTOP: '1024px',
    LARGE_DESKTOP: '1200px',
};

export const ANIMATION = {
    DURATION: {
        FAST: 200,
        NORMAL: 300,
        SLOW: 500,
        SLOWER: 800,
    },
    EASING: {
        EASE_OUT: 'ease-out',
        EASE_IN: 'ease-in',
        EASE_IN_OUT: 'ease-in-out',
        CUBIC: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
};
