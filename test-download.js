// Test the Cobalt download functionality
require('dotenv').config();
const readline = require('readline');
const { downloadFromCobalt, determineServiceType } = require('./cobalt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for a URL to test
rl.question('Enter a URL to download (e.g., YouTube, TikTok, Twitter): ', async (url) => {
  if (!url) {
    console.error('No URL provided. Exiting...');
    rl.close();
    return;
  }
  
  // Determine service type
  const serviceType = determineServiceType(url);
  console.log(`Detected service: ${serviceType}`);
  
  // Ask for format
  rl.question('Format to download (mp3/mp4) [default: mp4]: ', async (format) => {
    // Default to mp4 if no format provided
    format = format.toLowerCase().trim() || 'mp4';
    
    if (format !== 'mp3' && format !== 'mp4') {
      console.error('Invalid format. Using mp4 as default.');
      format = 'mp4';
    }
    
    console.log(`\nTesting download of ${url} in ${format} format...`);
    
    try {
      const startTime = Date.now();
      const result = await downloadFromCobalt(url, format);
      const endTime = Date.now();
      
      if (result.success) {
        console.log('\n✅ Download successful!');
        console.log(`File saved to: ${result.filePath}`);
        console.log(`Time taken: ${(endTime - startTime) / 1000} seconds`);
        
        if (result.meta) {
          console.log('\nMetadata:');
          console.log(result.meta);
        }
      } else {
        console.error('\n❌ Download failed!');
        console.error(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('\n❌ Error during download:');
      console.error(error);
    }
    
    rl.close();
  });
});