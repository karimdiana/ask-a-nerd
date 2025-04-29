// Simple API index router for Vercel
const chatHandler = require('./chat');

module.exports = async (req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        res.status(200).end();
        return;
    }

    // Extract the path from the URL
    const path = req.url.split('?')[0];
    
    // Route to the appropriate handler
    if (path === '/api/chat') {
        return chatHandler(req, res);
    }
    
    // Handle 404 for unknown routes
    return res.status(404).json({
        status: 'error',
        error: 'API route not found'
    });
}; 