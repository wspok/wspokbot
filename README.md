# Discord Downloader Bot with Assyst-like Commands

A Discord bot that downloads content from various platforms using Cobalt.tools and implements commands similar to Assyst: `/gif`, `/frames`, `/heartlocket`, and `/paint`.

## Features

- **Content Download**: Download media from YouTube, TikTok, Twitter, Instagram, and more
- **Various Formats**: Support for both audio (MP3) and video (MP4) downloads
- **Assyst-like Commands**:
  - `/gif` - Generate an animated GIF from a text prompt
  - `/frames` - Extract frames from a GIF and display them in a grid
  - `/heartlocket` - Create a heart locket with two images or prompts
  - `/paint` - Transform a reference image using a text prompt

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) version 16.9.0 or higher
- A Discord bot token (create one at [Discord Developer Portal](https://discord.com/developers/applications))
- (Optional) API keys for AI services if you want full functionality of AI commands

### Quick Start

1. Add your Discord token to the `.env` file:
   ```
   DISCORD_TOKEN=your-discord-bot-token
   ```

2. Verify your token works:
   ```
   node verify-token.js
   ```

3. Start the bot:
   ```
   node run-bot.js
   ```

### Step-by-Step Setup

#### Creating a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and name it
3. Go to the "Bot" tab and click "Add Bot"
4. Under "Privileged Gateway Intents", enable:
   - Message Content Intent
   - Server Members Intent
   - Presence Intent
5. Click "Reset Token" and copy your token
6. Add it to the `.env` file as shown above

#### Adding Bot to Your Server

1. Go to OAuth2 > URL Generator in the Developer Portal
2. Select scopes: `bot`, `applications.commands`
3. Select bot permissions:
   - Send Messages
   - Embed Links
   - Attach Files
   - Use Slash Commands
4. Copy the generated URL and open it in a browser
5. Select your server and authorize the bot

### Testing the Bot

Before running the full bot, you can test individual components:

- Test Discord token: `node verify-token.js`
- Test download capabilities: `node test-download.js`
- Test the full configuration: `node test-bot.js`

## Using the Bot

The bot provides the following slash commands:

### Download Command
```
/download url:[URL] format:[mp3 or mp4]
```
Downloads content from various platforms like YouTube, TikTok, Twitter, Instagram, etc.

### AI Generation Commands
Note: These require API keys to be fully functional

```
/gif prompt:[text]
```
Generates an animated GIF based on your text prompt.

```
/frames gif_url:[URL]
```
Extracts frames from a GIF and displays them in a grid.

```
/heartlocket first:[image1] second:[image2]
```
Creates a heart locket with two images. Can accept image URLs or text prompts.

```
/generate prompt:[text]
```
Creates a new image directly from your text prompt.

```
/paint reference:[image] prompt:[text]
```
Transforms a reference image into a painting style guided by your text prompt.

## Implementing AI Features

The bot includes commented code that shows how to implement the AI features. To enable them:

1. Sign up for an AI service like Replicate or Stability AI
2. Add your API key to the `.env` file:
   ```
   REPLICATE_API_KEY=your-replicate-key
   STABILITY_API_KEY=your-stability-key
   ```
3. Uncomment the implementation code in `commands.js`

## Supported Platforms for Download

- YouTube (videos and shorts)
- TikTok (videos and audio)
- Twitter/X (videos, GIFs)
- Instagram (posts, reels, stories)
- Facebook (videos, reels)
- Reddit (videos)
- SoundCloud (audio)
- And many more!

## Troubleshooting

- **Bot not connecting**: Check your Discord token in the `.env` file
- **Commands not appearing**: Make sure you've invited the bot with the correct permissions
- **Download errors**: Some URLs may be restricted or region-locked
- **AI commands not working**: You need to add API keys and uncomment the code in `commands.js`

## Disclaimer

This bot is provided for educational purposes only. Make sure to comply with the terms of service of any platform you download content from and any AI services you use.

## License

This project is licensed under the MIT License.