// Simple API index router for Vercel
const chatHandler = require('./chat');
const testHandler = require('./test');
const config = require('./_config');

module.exports = async (req, res) => {
    // Set CORS headers
    config.setCorsHeaders(res);

    // Handle preflight
    if (config.handleOptions(req, res)) {
        return;
    }

    // Log request for debugging
    console.log('API Request:', req.url, req.method);

    // Extract the path from the URL
    const path = req.url.split('?')[0];
    
    // Route to the appropriate handler
    if (path === '/api/chat') {
        return chatHandler(req, res);
    } else if (path === '/api/test') {
        return testHandler(req, res);
    }
    
    // Handle 404 for unknown routes
    return res.status(404).json({
        status: 'error',
        error: 'API route not found',
        requestedPath: path
    });
}; 