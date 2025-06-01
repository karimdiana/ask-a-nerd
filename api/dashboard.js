// Initialize tester mode
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in tester mode
    const urlParams = new URLSearchParams(window.location.search);
    const isTesterMode = urlParams.get('tester') === 'true';
    
    if (isTesterMode) {
        localStorage.setItem('testerMode', 'true');
        localStorage.setItem('userId', 'tester');
        localStorage.setItem('userName', 'Tester User');
        localStorage.setItem('userEmail', 'tester@example.com');
    }

    // Handle sign out
    document.getElementById('signoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'auth.html';
    });

    // Category filter functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const nerdCards = document.querySelectorAll('.nerd-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            nerdCards.forEach(card => {
                if (category === 'all' || card.dataset.categories.includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        nerdCards.forEach(card => {
            const nerdName = card.querySelector('.nerd-name').textContent.toLowerCase();
            const categories = card.querySelectorAll('.category-tag');
            const categoryText = Array.from(categories).map(cat => cat.textContent.toLowerCase()).join(' ');
            
            if (nerdName.includes(searchTerm) || categoryText.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            modal.classList.add('hidden');
        });
    });
});

// Chat and About functions
function openChat(nerdName) {
    const chatModal = document.getElementById('chatModal');
    const chatNerdAvatar = document.getElementById('chat-nerd-avatar');
    document.querySelector('.chat-nerd-name').textContent = nerdName;
    
    // Set the avatar based on nerd name
    switch(nerdName) {
        case 'Lisa Menu':
            chatNerdAvatar.style.backgroundImage = "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa&backgroundColor=ffdfbf&hair=long&hairColor=2c1810&mouth=smile&eyes=happy&eyebrows=raised&accessories=round&clothing=blazer&skinColor=ffdfbf')";
            break;
        case 'Karl Fruit':
            chatNerdAvatar.style.backgroundImage = "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Karl&backgroundColor=d1d4f9')";
            break;
        case 'Chadi Brush':
            chatNerdAvatar.style.backgroundImage = "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Chadi&backgroundColor=c0aede')";
            break;
        default: // Andrew DeBad
            chatNerdAvatar.style.backgroundImage = "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Andrew&backgroundColor=b6e3f4')";
    }
    
    chatModal.classList.remove('hidden');
    
    // Clear previous chat
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    // Add welcome message
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'chat-message nerd-message';
    welcomeMessage.innerHTML = `<div class="message-content">Hello! I'm ${nerdName}. How can I assist you today?</div>`;
    chatMessages.appendChild(welcomeMessage);
}

function openAbout(nerdName) {
    const aboutModal = document.getElementById('aboutModal');
    const modalAvatar = document.getElementById('modal-avatar');
    const modalName = document.getElementById('modal-name');
    const modalCategories = document.getElementById('modal-categories');
    const modalBio = document.getElementById('modal-bio');
    const modalReviews = document.getElementById('modal-reviews');

    // Update modal content based on nerd
    switch(nerdName) {
        case 'Lisa Menu':
            modalAvatar.style.backgroundImage = "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa&backgroundColor=ffdfbf&hair=long&hairColor=2c1810&mouth=smile&eyes=happy&eyebrows=raised&accessories=round&clothing=blazer&skinColor=ffdfbf')";
            modalName.textContent = 'Lisa Menu';
            modalCategories.innerHTML = '<span class="category-tag">Marketing</span><span class="category-tag">Academic</span>';
            modalBio.textContent = 'Lisa Menu is a seasoned marketing professional with extensive experience in digital marketing and academic research. She specializes in helping businesses develop effective marketing strategies and has published numerous papers on marketing trends and consumer behavior.';
            modalReviews.innerHTML = `
                <h4>Reviews</h4>
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">John M.</span>
                        <div class="review-stars">★★★★★</div>
                    </div>
                    <p class="review-text">Lisa's insights into digital marketing trends were invaluable for our startup. Her academic background brings a unique perspective to practical marketing challenges.</p>
                </div>
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">Sarah K.</span>
                        <div class="review-stars">★★★★★</div>
                    </div>
                    <p class="review-text">Working with Lisa transformed our marketing strategy. Her combination of academic knowledge and practical experience is truly remarkable.</p>
                </div>`;
            break;
        case 'Karl Fruit':
            modalAvatar.style.backgroundImage = "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Karl&backgroundColor=d1d4f9')";
            modalName.textContent = 'Karl Fruit';
            modalCategories.innerHTML = '<span class="category-tag">Entrepreneurship</span>';
            modalBio.textContent = 'Karl Fruit is a successful entrepreneur with a track record of building and scaling businesses. With his innovative approach and business acumen, he has helped numerous startups achieve their growth objectives.';
            modalReviews.innerHTML = `
                <h4>Reviews</h4>
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">Michael R.</span>
                        <div class="review-stars">★★★★★</div>
                    </div>
                    <p class="review-text">Karl's guidance was instrumental in helping us pivot our business model. His entrepreneurial experience is unmatched.</p>
                </div>
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">Emma L.</span>
                        <div class="review-stars">★★★★★</div>
                    </div>
                    <p class="review-text">As a first-time founder, Karl's mentorship was invaluable. His practical advice helped us avoid common pitfalls and scale effectively.</p>
                </div>`;
            break;
        case 'Chadi Brush':
            modalAvatar.style.backgroundImage = "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Chadi&backgroundColor=c0aede')";
            modalName.textContent = 'Chadi Brush';
            modalCategories.innerHTML = '<span class="category-tag">Education</span><span class="category-tag">Business</span>';
            modalBio.textContent = 'Chadi Brush combines his expertise in education and business to help organizations develop effective learning strategies. His background in both fields allows him to bridge the gap between academic theory and practical business applications.';
            modalReviews.innerHTML = `
                <h4>Reviews</h4>
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">David T.</span>
                        <div class="review-stars">★★★★★</div>
                    </div>
                    <p class="review-text">Chadi's approach to corporate learning is revolutionary. He helped us implement an effective training program that actually sticks.</p>
                </div>
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">Rachel B.</span>
                        <div class="review-stars">★★★★★</div>
                    </div>
                    <p class="review-text">Working with Chadi transformed our company's learning culture. His ability to combine educational theory with business needs is exceptional.</p>
                </div>`;
            break;
        default: // Andrew DeBad
            modalAvatar.style.backgroundImage = "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Andrew&backgroundColor=b6e3f4')";
            modalName.textContent = 'Andrew DeBad';
            modalCategories.innerHTML = '<span class="category-tag">Business</span><span class="category-tag">Executive</span>';
            modalBio.textContent = 'Andrew DeBad serves as Inglet Blair, a QC Ally Company\'s Vice President of Business Development. In this role, he fosters lasting relationships through a commitment to true partnership with both new and existing clients.\n\nSeasoned in the realms of finance and technology, Andrew brings over 20 years of diverse experience as a founder and C-suite executive. He has successfully navigated businesses from startups to Fortune 500 companies, specializing in operations, product and business development, as well as client service management.\n\nAndrew\'s approach is rooted in strategic growth, innovation, and fostering mentally healthy workplace cultures. Passionate about mental health advocacy and a compelling communicator, he is dedicated to guiding companies towards sustainable success and cultivating next-level teams.';
            modalReviews.innerHTML = `
                <h4>Reviews</h4>
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">Sarah T.</span>
                        <div class="review-stars">★★★★★</div>
                    </div>
                    <p class="review-text">Andrew provided invaluable insights for our business strategy. His experience is evident in every conversation.</p>
                </div>
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">Michael L.</span>
                        <div class="review-stars">★★★★★</div>
                    </div>
                    <p class="review-text">A true business development expert. Andrew helped us navigate complex partnership negotiations with ease.</p>
                </div>`;
    }

    aboutModal.classList.remove('hidden');
}

// Handle sending messages
window.handleSendMessage = function() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user-message';
        userMessage.innerHTML = `<div class="message-content">${message}</div>`;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Add typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chat-message nerd-message typing-indicator';
        typingIndicator.innerHTML = `<div class="message-content">Typing...</div>`;
        chatMessages.appendChild(typingIndicator);
    
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            typingIndicator.remove();
            
            const response = document.createElement('div');
            response.className = 'chat-message nerd-message';
            response.innerHTML = `<div class="message-content">The message was received"${message}". This is a testing prototype.</div>`;
            chatMessages.appendChild(response);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
};