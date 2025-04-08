// DOM Elements
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const signInForm = document.getElementById('signin-form');
const signUpForm = document.getElementById('signup-form');
const googleSignInBtn = document.querySelector('.btn-google');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, setting up event listeners');
    
    // Check if user is already logged in
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding form
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(`${targetTab}-form`).classList.add('active');
        });
    });

    // Sign In Form Submit
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('#signin-email').value;
        const password = document.querySelector('#signin-password').value;

        // Here you would typically validate against your backend
        if (email && password) {
            // Mock successful login
            const user = {
                email: email,
                name: email.split('@')[0]
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        }
    });

    // Sign Up Form Submit
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#signup-name').value;
        const email = document.querySelector('#signup-email').value;
        const password = document.querySelector('#signup-password').value;
        const confirmPassword = document.querySelector('#signup-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Here you would typically send this to your backend
        if (name && email && password) {
            // Mock successful registration
            const user = {
                name: name,
                email: email
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        }
    });

    // Google Sign In
    googleSignInBtn.addEventListener('click', () => {
        // Here you would implement Google OAuth
        console.log('Google sign in clicked');
        // Mock successful Google login
        const user = {
            name: 'Google User',
            email: 'google.user@gmail.com'
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    });
});

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Check if user is already logged in
function checkAuthState() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'dashboard.html';
    }
}

// Run auth check on page load
checkAuthState();