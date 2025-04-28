const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const config = require('./config');

const app = express();

// Configure OpenAI
const openai = new OpenAI({
    apiKey: config.openai.apiKey
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Validate OpenAI API key middleware
app.use((req, res, next) => {
    if (!config.openai.apiKey) {
        return res.status(500).json({
            status: 'error',
            error: 'OpenAI API key is not configured'
        });
    }
    next();
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, nerdName, nerdExpertise } = req.body;

        if (!message) {
            return res.status(400).json({
                status: 'error',
                error: 'Message is required'
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are ${nerdName}, an expert in ${nerdExpertise}. Provide clear, professional responses within your area of expertise.`
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

        res.json({
            status: 'success',
            response
        });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({
            status: 'error',
            error: 'Failed to get response from AI'
        });
    }
});

// Start server
app.listen(config.server.port, () => {
    console.log(`Server running on port ${config.server.port}`);
}); 