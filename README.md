# Discord Downloader Bot

A Discord bot that can download content from various platforms using Cobalt.tools and implements Assyst-like commands such as `/gif`, `/frames`, `/heartlocket`, and `/paint`.

## Features

- Download content from various platforms using Cobalt.tools
- Generate AI content with commands similar to Assyst:
  - `/gif` - Generate a GIF based on a prompt
  - `/frames` - Generate frames based on a prompt
  - `/heartlocket` - Create a heart locket with two images
  - `/paint` - Paint an image based on a reference and prompt

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) version 16.9.0 or higher
- A Discord bot token (create one at [Discord Developer Portal](https://discord.com/developers/applications))

### Installation

1. Clone this repository or download the source code
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   DISCORD_TOKEN=your-discord-bot-token
   ```

### Setting Up the Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" tab and click "Add Bot"
4. Under the "Privileged Gateway Intents" section, enable:
   - "Server Members Intent"
   - "Message Content Intent"
5. Go to the "OAuth2" tab, then "URL Generator"
6. Select the following scopes:
   - `bot`
   - `applications.commands`
7. Select the following bot permissions:
   - "Send Messages"
   - "Attach Files"
   - "Embed Links"
   - "Use Slash Commands"
8. Copy the generated URL and open it in your browser to add the bot to your server

### AI Service Integration (Optional)

For the AI-based commands to work fully, you'll need to integrate with actual AI services. The placeholder implementations in the code provide guidance on where to add these integrations.

Popular options include:
- [Replicate](https://replicate.com/)
- [Stability AI](https://stability.ai/)
- Custom APIs

## Running the Bot

```
node bot.js
```

The bot should now be online and ready to use in your Discord server!

## Using the Bot

The bot provides the following slash commands:

- `/download url:[URL] format:[mp3 or mp4]` - Download content from a URL using Cobalt.tools
- `/gif prompt:[text]` - Generate a GIF based on your prompt
- `/frames prompt:[text]` - Generate frames based on your prompt
- `/heartlocket first:[image1] second:[image2]` - Create a heart locket with two images
- `/paint reference:[image] prompt:[text]` - Paint an image based on a reference and prompt

## Notes about Functionality

- The Cobalt download functionality is fully implemented and works with various platforms
- The AI commands (gif, frames, heartlocket, paint) are provided as placeholders and require integration with actual AI services to be fully functional
- You'll need to add your own API keys for any AI services you want to use

## Disclaimer

This bot is provided for educational purposes only. Make sure to comply with the terms of service of any platform you're downloading content from.

## License

This project is licensed under the MIT License - see the LICENSE file for details.