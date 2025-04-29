// Import OpenAI library
const { OpenAI } = require('openai');

// Handler for API requests
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 'error',
            error: 'Method not allowed'
        });
    }

    try {
        // Get API key from environment variables
        const apiKey = process.env.OPENAI;
        
        // Check if API key exists
        if (!apiKey) {
            return res.status(500).json({
                status: 'error',
                error: 'OpenAI API key is missing'
            });
        }

        // Initialize OpenAI client
        const openai = new OpenAI({ apiKey });
        
        // Extract request data
        const { message, nerdName, nerdExpertise } = req.body || {};
        
        // Validate message
        if (!message) {
            return res.status(400).json({
                status: 'error',
                error: 'Message is required'
            });
        }
        
        // Create default values if needed
        const expertName = nerdName || 'an AI assistant';
        const expertise = nerdExpertise || 'various topics';
        
        // Generate response using OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are ${expertName}, an expert in ${expertise}. Provide clear, professional responses within your area of expertise.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        });
        
        // Extract response text
        const responseText = completion.choices[0].message.content;
        
        // Return successful response
        return res.status(200).json({
            status: 'success',
            response: responseText
        });
        
    } catch (error) {
        // Log error details
        console.error('API Error:', error.message);
        
        // Return error response
        return res.status(500).json({
            status: 'error',
            error: error.message || 'Failed to get response from AI'
        });
    }
}; 