// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');
const closeMenu = document.querySelector('.close-menu');
const sideMenuItems = document.querySelectorAll('.side-menu-item');
const logoutButton = document.querySelector('.side-menu-item.logout');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
        return;
    }
    
    setupMenuEventListeners();
});

// Setup Event Listeners
function setupMenuEventListeners() {
    // Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSideMenu);
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', toggleSideMenu);
    }

    // Side Menu Items
    sideMenuItems.forEach(item => {
        if (!item.classList.contains('logout')) {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                navigateToPage(page);
                toggleSideMenu();
            });
        }
    });

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
}

// Side Menu Functions
function toggleSideMenu() {
    if (sideMenu) {
        sideMenu.classList.toggle('active');
    }
}

// Navigation Functions
function navigateToPage(page) {
    console.log('Navigating to:', page);
    
    // Check if we're on the login page
    const isLoginPage = window.location.pathname.includes('index.html');
    const isPricingPage = window.location.pathname.includes('pricing.html');
    const isReferralPage = window.location.pathname.includes('referral.html');
    const isDashboardPage = window.location.pathname.includes('dashboard.html');
    
    if (isLoginPage) {
        // If on login page, redirect to the appropriate page
        if (page === 'nerds') {
            window.location.href = 'dashboard.html';
        } else if (page === 'categories') {
            window.location.href = 'dashboard.html#categories-section';
        } else if (page === 'account') {
            // For account page, check if user is logged in
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
                window.location.href = 'dashboard.html#account-section';
            } else {
                // Stay on login page if not logged in
                showNotification('Please sign in to access your account', 'error');
            }
        } else if (page === 'pricing') {
            window.location.href = 'pricing.html';
        } else if (page === 'referral') {
            window.location.href = 'referral.html';
        }
    } else if (isPricingPage) {
        // If on pricing page, handle navigation
        if (page === 'nerds') {
            window.location.href = 'dashboard.html';
        } else if (page === 'categories') {
            window.location.href = 'dashboard.html#categories-section';
        } else if (page === 'account') {
            window.location.href = 'dashboard.html#account-section';
        } else if (page === 'referral') {
            window.location.href = 'referral.html';
        }
    } else if (isReferralPage) {
        // If on referral page, handle navigation
        if (page === 'nerds') {
            window.location.href = 'dashboard.html';
        } else if (page === 'categories') {
            window.location.href = 'dashboard.html#categories-section';
        } else if (page === 'account') {
            window.location.href = 'dashboard.html#account-section';
        } else if (page === 'pricing') {
            window.location.href = 'pricing.html';
        }
    } else if (isDashboardPage) {
        // If on dashboard page, handle navigation
        if (page === 'pricing') {
            window.location.href = 'pricing.html';
        } else if (page === 'referral') {
            window.location.href = 'referral.html';
        } else {
            // For other pages, try to navigate within the current page
            const targetSection = document.querySelector(`#${page}-section`);
            if (targetSection) {
                // Hide all sections
                document.querySelectorAll('main > section').forEach(section => {
                    section.classList.add('hidden');
                });
                
                // Show target section
                targetSection.classList.remove('hidden');
                
                // Update active states
                sideMenuItems.forEach(item => {
                    item.classList.toggle('active', item.dataset.page === page);
                });
            }
        }
    }
}

// Auth Functions
function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Utility Functions
function showNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} fade-in`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}