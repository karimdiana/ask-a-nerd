// Shared configuration for API endpoints
module.exports = {
  // Helper to check required environment variables
  checkEnv: function() {
    const apiKey = process.env.OPENAI;
    return !!apiKey;
  },
  
  // Set common headers for all API responses
  setCorsHeaders: function(res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  },
  
  // Handle OPTIONS requests (preflight)
  handleOptions: function(req, res) {
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return true;
    }
    return false;
  }
}; 