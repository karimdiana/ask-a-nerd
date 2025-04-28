# Nerd Chat Application

A chat application that allows users to interact with expert "nerds" using ChatGPT API.

## Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd nerd-chat
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
- Copy `.env.example` to `.env`
```bash
cp .env.example .env
```
- Edit `.env` and add your OpenAI API key
```
OPENAI_API_KEY=your_api_key_here
```

4. Start the server
```bash
npm start
```

5. Open `dashboard.html` in your browser

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
