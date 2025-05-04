// Verify Discord token and installation
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Check if Discord token exists
if (!process.env.DISCORD_TOKEN) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: No Discord token found in .env file!');
  console.log('\x1b[36m%s\x1b[0m', 'Please add your token to the .env file in the format:');
  console.log('\x1b[36m%s\x1b[0m', 'DISCORD_TOKEN=your-token-here');
  process.exit(1);
}

// Create a temporary client to verify the token
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

console.log('\x1b[36m%s\x1b[0m', 'Verifying Discord token...');

// Listen for the ready event
client.once('ready', () => {
  console.log('\x1b[32m%s\x1b[0m', `✓ Token is valid! Logged in as ${client.user.tag}`);
  console.log('\x1b[32m%s\x1b[0m', `✓ Bot is in ${client.guilds.cache.size} servers`);
  
  // List the servers the bot is in
  if (client.guilds.cache.size > 0) {
    console.log('\x1b[36m%s\x1b[0m', 'Servers:');
    client.guilds.cache.forEach(guild => {
      console.log(`  - ${guild.name} (${guild.id})`);
    });
  }
  
  console.log('\n\x1b[36m%s\x1b[0m', 'Everything looks good! You can now run the bot with:');
  console.log('\x1b[36m%s\x1b[0m', 'node run-bot.js');
  
  // Close the client
  client.destroy();
  process.exit(0);
});

// Handle errors
client.on('error', error => {
  console.error('\x1b[31m%s\x1b[0m', 'Error connecting to Discord:');
  console.error(error);
  process.exit(1);
});

// Try to log in
client.login(process.env.DISCORD_TOKEN).catch(error => {
  console.error('\x1b[31m%s\x1b[0m', 'Invalid Discord token!');
  console.error('\x1b[31m%s\x1b[0m', error.message);
  console.log('\x1b[36m%s\x1b[0m', 'Make sure your token is correct in the .env file.');
  process.exit(1);
});