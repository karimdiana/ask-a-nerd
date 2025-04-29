// Simple test endpoint to verify serverless function setup
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Get environment variable information (safely)
    const hasApiKey = !!process.env.OPENAI;
    
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