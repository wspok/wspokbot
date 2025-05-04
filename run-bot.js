// Run this file to start the Discord bot
require('dotenv').config();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Discord token check
if (!process.env.DISCORD_TOKEN) {
  console.log('\x1b[33m%s\x1b[0m', 'No Discord token found in .env file!');
  
  // Create a readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\x1b[36m%s\x1b[0m', 'Please enter your Discord bot token: ', (token) => {
    fs.writeFileSync('.env', `DISCORD_TOKEN=${token}\n`, { flag: 'w' });
    console.log('\x1b[32m%s\x1b[0m', 'Token saved to .env file!');
    rl.close();
    startBot();
  });
} else {
  startBot();
}

function startBot() {
  console.log('\x1b[36m%s\x1b[0m', 'Starting Discord bot...');
  
  // Create temp directory if it doesn't exist
  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log('\x1b[32m%s\x1b[0m', 'Created temp directory for downloads');
  }
  
  // Load bot directly since we're already running Node
  try {
    require('./bot.js');
    console.log('\x1b[32m%s\x1b[0m', 'Bot started successfully!');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error starting bot:', error.message);
  }
}