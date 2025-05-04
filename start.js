const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('No .env file found. Creating one now...');
  
  // Create a readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Ask for Discord token
  rl.question('Please enter your Discord bot token: ', (token) => {
    // Write to .env file
    fs.writeFileSync(envPath, `DISCORD_TOKEN=${token}\n`);
    console.log('.env file created successfully!');
    
    // Close the readline interface
    rl.close();
    
    // Start the bot
    startBot();
  });
} else {
  // Start the bot directly if .env already exists
  startBot();
}

function startBot() {
  console.log('Starting Discord bot...');
  
  // Create temp directory if it doesn't exist
  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  // Run the bot
  const botProcess = exec('node bot.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing bot: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Bot stderr: ${stderr}`);
      return;
    }
    console.log(`Bot stdout: ${stdout}`);
  });
  
  // Forward console output to terminal
  botProcess.stdout.on('data', (data) => {
    console.log(data.toString().trim());
  });
  
  botProcess.stderr.on('data', (data) => {
    console.error(data.toString().trim());
  });
  
  // Handle termination
  process.on('SIGINT', () => {
    console.log('Bot process terminated');
    botProcess.kill();
    process.exit();
  });
}