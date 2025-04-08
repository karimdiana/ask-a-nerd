document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
        return;
    }
    
    // Auth tabs functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    if (authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and forms
                authTabs.forEach(t => t.classList.remove('active'));
                authForms.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding form
                tab.classList.add('active');
                const formId = tab.getAttribute('data-tab') + '-form';
                document.getElementById(formId).classList.add('active');
            });
        });
    }
    
    // Form submission handling
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Here you would typically make an API call to your backend
            console.log('Login attempt:', { email, password });
            
            // For demo purposes, we'll just store the user and redirect
            const user = {
                email: email,
                name: email.split('@')[0]
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Here you would typically make an API call to your backend
            console.log('Signup attempt:', { name, email, password });
            
            // For demo purposes, we'll just store the user and redirect
            const user = {
                name: name,
                email: email
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        });
    }
    
    // Google Sign-in
    const googleSignIn = document.getElementById('google-signin');
    googleSignIn.addEventListener('click', function() {
        // Here you would typically initialize Google Sign-in
        console.log('Google sign-in clicked');
        
        // For demo purposes, we'll just hide the auth container
        document.getElementById('auth-container').classList.remove('active');
        
        // Show the categories container
        document.getElementById('categories-container').classList.remove('hidden');
    });
    
    // Sign In button in nav
    const signInBtn = document.getElementById('signInBtn');
    signInBtn.addEventListener('click', function() {
        document.getElementById('auth-container').classList.add('active');
    });
    
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    menuToggle.addEventListener('click', function() {
        sideMenu.classList.add('active');
    });
    
    closeMenu.addEventListener('click', function() {
        sideMenu.classList.remove('active');
    });
    
    // Side menu items
    const sideMenuItems = document.querySelectorAll('.side-menu-item');
    sideMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Hide all containers
            document.querySelectorAll('.categories-container, .nerds-container, .account-container, .pricing-container, .refer-container').forEach(container => {
                container.classList.add('hidden');
            });
            
            // Show the selected container
            document.getElementById(page + '-container').classList.remove('hidden');
            
            // Close the side menu
            sideMenu.classList.remove('active');
        });
    });
    
    // Bottom nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Remove active class from all nav items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Hide all containers
            document.querySelectorAll('.categories-container, .nerds-container, .account-container, .pricing-container, .refer-container').forEach(container => {
                container.classList.add('hidden');
            });
            
            // Show the selected container
            document.getElementById(page + '-container').classList.remove('hidden');
        });
    });
    
    // Category selection
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
    
    // Continue button after category selection
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.addEventListener('click', function() {
        // Hide categories container
        document.getElementById('categories-container').classList.add('hidden');
        
        // Show nerds container
        document.getElementById('nerds-container').classList.remove('hidden');
        
        // Load nerds (this would typically be an API call)
        loadNerds();
    });
    
    // Function to load nerds (mock data for demo)
    function loadNerds() {
        const nerdsGrid = document.getElementById('nerdsGrid');
        nerdsGrid.innerHTML = '';
        
        const nerds = [
            {
                name: 'Dr. Sarah Johnson',
                specialty: 'Sports Medicine',
                rating: 4.9,
                price: '$50/hour',
                image: 'https://randomuser.me/api/portraits/women/1.jpg'
            },
            {
                name: 'Michael Chen',
                specialty: 'Relationship Counseling',
                rating: 4.8,
                price: '$45/hour',
                image: 'https://randomuser.me/api/portraits/men/2.jpg'
            },
            {
                name: 'Emily Rodriguez',
                specialty: 'Career Development',
                rating: 4.7,
                price: '$40/hour',
                image: 'https://randomuser.me/api/portraits/women/3.jpg'
            },
            {
                name: 'Dr. James Wilson',
                specialty: 'Health & Wellness',
                rating: 4.9,
                price: '$55/hour',
                image: 'https://randomuser.me/api/portraits/men/4.jpg'
            },
            {
                name: 'Lisa Thompson',
                specialty: 'Financial Planning',
                rating: 4.8,
                price: '$60/hour',
                image: 'https://randomuser.me/api/portraits/women/5.jpg'
            },
            {
                name: 'David Kim',
                specialty: 'Technology',
                rating: 4.7,
                price: '$50/hour',
                image: 'https://randomuser.me/api/portraits/men/6.jpg'
            }
        ];
        
        nerds.forEach(nerd => {
            const nerdCard = document.createElement('div');
            nerdCard.className = 'nerd-card';
            nerdCard.innerHTML = `
                <img src="${nerd.image}" alt="${nerd.name}" class="nerd-image">
                <div class="nerd-info">
                    <div class="nerd-name">${nerd.name}</div>
                    <div class="nerd-specialty">${nerd.specialty}</div>
                    <div class="nerd-rating">
                        <i class="fas fa-star"></i>
                        <span>${nerd.rating}</span>
                    </div>
                    <div class="nerd-price">${nerd.price}</div>
                    <button class="btn-primary">Chat Now</button>
                </div>
            `;
            
            nerdCard.querySelector('button').addEventListener('click', function() {
                // Hide nerds container
                document.getElementById('nerds-container').classList.add('hidden');
                
                // Show chat container
                const chatContainer = document.getElementById('chat-container');
                chatContainer.classList.remove('hidden');
                
                // Update chat header
                document.getElementById('chat-nerd-name').textContent = nerd.name;
                document.getElementById('chat-nerd-specialty').textContent = nerd.specialty;
                
                // Clear chat messages
                document.getElementById('chat-messages').innerHTML = '';
                
                // Add welcome message
                const welcomeMessage = document.createElement('div');
                welcomeMessage.className = 'message message-nerd';
                welcomeMessage.textContent = `Hello! I'm ${nerd.name}, your ${nerd.specialty} expert. How can I help you today?`;
                document.getElementById('chat-messages').appendChild(welcomeMessage);
            });
            
            nerdsGrid.appendChild(nerdCard);
        });
    }
    
    // Chat functionality
    const chatInput = document.getElementById('chat-input-field');
    const sendMessage = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    const closeChat = document.getElementById('close-chat');
    
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message message-user';
            userMessage.textContent = message;
            chatMessages.appendChild(userMessage);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate nerd response (would be an API call in a real app)
            setTimeout(() => {
                const nerdMessage = document.createElement('div');
                nerdMessage.className = 'message message-nerd';
                nerdMessage.textContent = `Thanks for your question! I'll get back to you shortly with a detailed answer.`;
                chatMessages.appendChild(nerdMessage);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    sendMessage.addEventListener('click', sendChatMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    closeChat.addEventListener('click', function() {
        document.getElementById('chat-container').classList.add('hidden');
        document.getElementById('nerds-container').classList.remove('hidden');
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function() {
        // Hide account container
        document.getElementById('account-container').classList.add('hidden');
        
        // Show auth container
        document.getElementById('auth-container').classList.add('active');
    });
});