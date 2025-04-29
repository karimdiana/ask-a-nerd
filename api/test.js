// Simple test endpoint to verify serverless function setup
const config = require('./_config');

module.exports = async (req, res) => {
    // Set CORS headers
    config.setCorsHeaders(res);

    // Handle preflight
    if (config.handleOptions(req, res)) {
        return;
    }

    // Check environment variables
    const hasApiKey = config.checkEnv();
    
    // Return test response
    res.status(200).json({
        status: 'success',
        message: 'Serverless function is working correctly',
        timestamp: new Date().toISOString(),
        environment: process.env.VERCEL_ENV || 'local',
        hasApiKey: hasApiKey,
        node_version: process.version
    });
}; 