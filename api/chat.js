const OpenAI = require('openai');

// Environment variables
const apiKey = process.env.OPENAI_API_KEY;

// Configure OpenAI
const openai = new OpenAI({
    apiKey: apiKey
});

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST for actual requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 'error',
            error: 'Method not allowed'
        });
    }

    try {
        // Check API key
        if (!apiKey) {
            return res.status(500).json({
                status: 'error',
                error: 'OpenAI API key is not configured'
            });
        }

        const { message, nerdName, nerdExpertise } = req.body;

        if (!message) {
            return res.status(400).json({
                status: 'error',
                error: 'Message is required'
            });
        }

        // Set sensible defaults if nerdName or nerdExpertise are missing
        const expertName = nerdName || 'an AI assistant';
        const expertise = nerdExpertise || 'various topics';

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

        const response = completion.choices[0].message.content;

        return res.status(200).json({
            status: 'success',
            response
        });
    } catch (error) {
        console.error('OpenAI API error:', error);
        return res.status(500).json({
            status: 'error',
            error: error.message || 'Failed to get response from AI'
        });
    }
}; 