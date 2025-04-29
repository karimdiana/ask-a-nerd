# Nerd Chat Application

A chat application that connects users with expert "nerds" in various fields.

## Setup Instructions

1. Clone the repository
```bash
git clone <your-repo-url>
cd nerd
```

2. Create a `.env` file in the root directory
```bash
# Copy the example env file
cp .env.example .env

# Or create a new .env file with these contents:
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

3. Get your OpenAI API key
- Go to https://platform.openai.com/api-keys
- Create a new API key
- Copy the key and paste it in your `.env` file

4. Install dependencies
```bash
npm install
```

5. Start the server
```bash
node server.js
```

6. Open the application in your browser
- Go to `http://localhost:3000`

## Important Notes

- The `.env` file contains sensitive information and should NEVER be committed to Git
- Make sure `.env` is in your `.gitignore` file
- Only commit `.env.example` as a template
- Each developer needs to create their own `.env` file with their own API key

## Troubleshooting

If the chat doesn't work:
1. Check if the server is running
2. Verify your `.env` file exists and has the correct API key
3. Check the browser console for any errors
4. Make sure you're connected to the internet

## Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secure and private
- Regularly rotate your API keys
- Monitor your API usage

## Development

- The application uses Express.js for the backend server
- Frontend is built with vanilla JavaScript
- ChatGPT API is used for generating responses
- Markdown formatting is supported in chat messages
