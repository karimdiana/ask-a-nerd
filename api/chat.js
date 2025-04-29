// Import OpenAI library
const { OpenAI } = require('openai');
const config = require('./_config');

// Handler for API requests
module.exports = async (req, res) => {
    // Set CORS headers
    config.setCorsHeaders(res);

    // Handle preflight requests
    if (config.handleOptions(req, res)) {
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
        
        // Log API key status (not the actual key)
        console.log('API Key status:', apiKey ? 'Found' : 'Missing');
        
        // Check if API key exists
        if (!apiKey) {
            return res.status(500).json({
                status: 'error',
                error: 'OpenAI API key is missing. Please add it to your environment variables.'
            });
        }

        // Initialize OpenAI client
        const openai = new OpenAI({ apiKey });
        
        // Extract request data
        const { message, nerdName, nerdExpertise } = req.body || {};
        
        // Log request data (for debugging)
        console.log('Request data:', { 
            message: message ? 'Provided' : 'Missing', 
            nerdName, 
            nerdExpertise 
        });
        
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
                    content: `You are ${expertName}, an expert in ${expertise}. Provide clear, professional responses within your area of expertise.

Format your responses using Markdown:
- Use **bold** for important points
- Create proper numbered or bulleted lists
- Use paragraph breaks for readability
- Use headings for sections if appropriate

Keep your responses concise, well-formatted, and helpful.`
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
        console.error('Full error:', error);
        
        // Return error response with more details
        return res.status(500).json({
            status: 'error',
            error: error.message || 'Failed to get response from AI',
            details: error.stack ? error.stack.split('\n')[0] : 'No additional details'
        });
    }
}; 