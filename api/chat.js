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
        const apiKey = process.env.OPENAI;
        
        if (!apiKey) {
            return res.status(500).json({
                status: 'error',
                error: 'OpenAI API key is missing'
            });
        }

        const openai = new OpenAI({ apiKey });
        const { message, nerdName, nerdExpertise } = req.body || {};
        
        if (!message) {
            return res.status(400).json({
                status: 'error',
                error: 'Message is required'
            });
        }
        
        const expertName = nerdName || 'an AI assistant';
        const expertise = nerdExpertise || 'various topics';
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are ${expertName}, an expert in ${expertise}. Provide clear, professional responses within your area of expertise. Keep your responses concise, well-formatted, and helpful.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        });
        
        const responseText = completion.choices[0].message.content;
        
        return res.status(200).json({
            status: 'success',
            response: responseText
        });
        
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            error: error.message || 'Failed to get response from AI'
        });
    }
}; 