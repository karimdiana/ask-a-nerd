// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');
const closeMenu = document.querySelector('.close-menu');
const sideMenuItems = document.querySelectorAll('.side-menu-item');
const copyButtons = document.querySelectorAll('.copy-btn');
const socialButtons = document.querySelectorAll('.social-btn');
const logoutButton = document.querySelector('.logout');

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Menu toggle
    menuToggle.addEventListener('click', () => sideMenu.classList.add('active'));
    closeMenu.addEventListener('click', () => sideMenu.classList.remove('active'));
    
    // Side menu navigation
    sideMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            if (page) {
                navigateToPage(page);
            }
        });
    });
    
    // Copy buttons
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.dataset.copy;
            copyToClipboard(textToCopy);
        });
    });
    
    // Social sharing buttons
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.classList[1];
            shareOnSocial(platform);
        });
    });
    
    // Logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}

// Navigation function
function navigateToPage(page) {
    console.log('Navigating to:', page);
    switch (page) {
        case 'nerds':
            window.location.href = 'dashboard.html';
            break;
        case 'categories':
            window.location.href = 'dashboard.html#categories-section';
            break;
        case 'account':
            window.location.href = 'dashboard.html#account-section';
            break;
        case 'pricing':
            window.location.href = 'pricing.html';
            break;
        case 'referral':
            window.location.href = 'referral.html';
            break;
        default:
            console.log('Unknown page:', page);
    }
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const button = document.querySelector(`[data-copy="${text}"]`);
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Social media sharing
function shareOnSocial(platform) {
    const text = 'Check out Ask a Nerd - Get expert advice from real nerds!';
    const url = 'https://askanerd.com/ref/NERD2023';
    
    let shareUrl;
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}