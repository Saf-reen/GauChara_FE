// Debug utility to log page lifecycle
console.log('🚀 App starting...');

// Log when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('✅ DOM Content Loaded');
    });
} else {
    console.log('✅ DOM already loaded');
}

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('✅ Page fully loaded');
});

// Catch unhandled errors
window.addEventListener('error', (event) => {
    console.error('❌ Unhandled error:', event.error);
    console.error('Error details:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
    });
});

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled promise rejection:', event.reason);
});

// Log React errors
const originalConsoleError = console.error;
console.error = (...args) => {
    if (args[0]?.includes?.('React')) {
        console.log('🔴 React Error Detected:', ...args);
    }
    originalConsoleError.apply(console, args);
};

export { };
