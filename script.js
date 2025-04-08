// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');
const closeMenu = document.querySelector('.close-menu');
const sideMenuItems = document.querySelectorAll('.side-menu-item');
const categoryCards = document.querySelectorAll('.category-card');
const nerdCards = document.querySelectorAll('.nerd-card');
const bottomNavItems = document.querySelectorAll('.nav-item');
const logoutButton = document.querySelector('.side-menu-item.logout');

// State Management
let currentUser = null;
let selectedCategories = new Set();
let currentPage = 'nerds';

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
});

// Check Authentication
function checkAuth() {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
        window.location.href = 'login.html';
        return;
    }
    currentUser = JSON.parse(storedUser);
    updateUIForLoggedInUser();
}

// Setup Event Listeners
function setupEventListeners() {
    // Menu Toggle - These are now handled by menu.js
    // menuToggle?.addEventListener('click', toggleSideMenu);
    // closeMenu?.addEventListener('click', toggleSideMenu);

    // Side Menu Items - These are now handled by menu.js
    // sideMenuItems.forEach(item => {
    //     if (!item.classList.contains('logout')) {
    //         item.addEventListener('click', () => {
    //             const page = item.dataset.page;
    //             navigateToPage(page);
    //             toggleSideMenu();
    //         });
    //     }
    // });

    // Logout - This is now handled by menu.js
    // logoutButton?.addEventListener('click', handleLogout);

    // Category Selection
    categoryCards.forEach(card => {
        card.addEventListener('click', () => toggleCategory(card));
    });

    // Nerd Cards
    nerdCards.forEach(card => {
        card.addEventListener('click', () => navigateToChat(card.dataset.nerdId));
    });

    // Bottom Navigation
    bottomNavItems.forEach(item => {
        item.addEventListener('click', () => navigateToPageMain(item.dataset.page));
    });
}

// Side Menu Functions - These are now handled by menu.js
// function toggleSideMenu() {
//     sideMenu.classList.toggle('active');
// }

// Navigation Functions
function navigateToPageMain(page) {
    currentPage = page;
    updateNavigationUI();
    
    // Hide all sections
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected section
    const targetSection = document.querySelector(`#${page}-section`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Update active states
    sideMenuItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
}

function navigateToChat(nerdId) {
    // Navigate to chat page with nerd ID
    navigateToPageMain('chat');
    loadChatHistory(nerdId);
}

// Category Functions
function toggleCategory(card) {
    const categoryId = card.dataset.categoryId;
    
    if (selectedCategories.has(categoryId)) {
        selectedCategories.delete(categoryId);
        card.classList.remove('selected');
    } else {
        selectedCategories.add(categoryId);
        card.classList.add('selected');
    }

    localStorage.setItem('selectedCategories', JSON.stringify([...selectedCategories]));
    updateCategoryUI();
}

function updateCategoryUI() {
    categoryCards.forEach(card => {
        const categoryId = card.dataset.categoryId;
        card.classList.toggle('selected', selectedCategories.has(categoryId));
    });
}

// UI Update Functions
function updateUIForLoggedInUser() {
    // Update user-specific UI elements
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement && currentUser) {
        userNameElement.textContent = currentUser.fullName || currentUser.email;
    }

    // Show main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.add('visible');
    }

    // Show nerds section by default
    navigateToPageMain('nerds');
}

function updateNavigationUI() {
    bottomNavItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === currentPage);
    });
}

// Auth Functions - This is now handled by menu.js
// function handleLogout() {
//     localStorage.removeItem('currentUser');
//     window.location.href = 'login.html';
// }

// Utility Functions
function showError(message) {
    const notification = document.createElement('div');
    notification.className = 'notification error fade-in';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'notification success fade-in';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Chat Functions
function loadChatHistory(nerdId) {
    console.log(`Loading chat history for nerd ${nerdId}`);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToPageMain,
        toggleCategory,
        navigateToChat
    };
} 