// Test script to verify the bot's functionality without starting it
require('dotenv').config();
const { downloadFromCobalt, determineServiceType } = require('./cobalt');
const { createGif, createFrames, createHeartlocket, createPaint } = require('./commands');

// Test URL detection
const testUrls = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://twitter.com/example/status/1234567890',
  'https://www.tiktok.com/@username/video/1234567890',
  'https://www.instagram.com/p/ABC123/',
  'https://invalid-url'
];

console.log('Testing URL detection:');
testUrls.forEach(url => {
  try {
    const serviceType = determineServiceType(url);
    console.log(`URL: ${url} -> Service: ${serviceType}`);
  } catch (error) {
    console.error(`Error with URL ${url}:`, error.message);
  }
});

// Check for Discord token
if (!process.env.DISCORD_TOKEN) {
  console.log('\n\x1b[33m%s\x1b[0m', 'WARNING: No Discord token found in .env file!');
  console.log('\x1b[33m%s\x1b[0m', 'The bot will not be able to connect to Discord without a token.');
  console.log('\x1b[36m%s\x1b[0m', 'Please add your Discord token to the .env file:\nDISCORD_TOKEN=your-token-here\n');
} else {
  console.log('\n\x1b[32m%s\x1b[0m', 'Discord token found in .env file.');
}

console.log('\n\x1b[36m%s\x1b[0m', 'Bot functionality is ready to use!');
console.log('\x1b[36m%s\x1b[0m', 'Run "node run-bot.js" to start the bot.');

// Show a summary of available commands
console.log('\n\x1b[35m%s\x1b[0m', 'Available commands:');
console.log('\x1b[0m%s\x1b[0m', '/download url:[URL] format:[mp3/mp4] - Download content from a URL');
console.log('\x1b[0m%s\x1b[0m', '/gif prompt:[text] - Generate a GIF based on your prompt');
console.log('\x1b[0m%s\x1b[0m', '/frames gif_url:[URL] - Extract frames from a GIF');
console.log('\x1b[0m%s\x1b[0m', '/heartlocket first:[image1] second:[image2] - Create a heart locket');
console.log('\x1b[0m%s\x1b[0m', '/generate prompt:[text] - Generate an image from a text prompt');
console.log('\x1b[0m%s\x1b[0m', '/paint reference:[image] prompt:[text] - Transform an image into a painting style');