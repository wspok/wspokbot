const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * Download content from a URL using Cobalt API
 * @param {string} url - The URL to download from
 * @param {string} format - The format to download (mp3, mp4, etc.)
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>}
 */
async function downloadFromCobalt(url, format = 'mp4') {
  try {
    console.log(`Downloading from ${url} in ${format} format`);
    
    // API endpoint based on format
    const endpoint = format === 'mp3' 
      ? 'https://co.wuk.sh/api/json' 
      : 'https://co.wuk.sh/api/json';
    
    // Request parameters
    const requestData = {
      url: url,
      aFormat: format === 'mp3' ? 'mp3' : null, // Audio format if mp3
      vFormat: format === 'mp4' ? 'mp4' : null, // Video format if mp4
      filenamePattern: 'basic',
      isAudioOnly: format === 'mp3',
      isNoTTWatermark: true,  // Remove TikTok watermark if applicable
    };
    
    console.log('Sending request to Cobalt API...');
    const response = await axios.post(endpoint, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000, // 30 seconds timeout
    });
    
    // Check if the API response contains a download URL
    if (response.data && response.data.url) {
      console.log('Received download URL from Cobalt');
      
      // Create a unique filename
      const timestamp = Date.now();
      const fileExtension = format === 'mp3' ? 'mp3' : 'mp4';
      const filePath = path.join(__dirname, 'temp', `download_${timestamp}.${fileExtension}`);
      
      // Download the file
      console.log('Downloading file from Cobalt CDN...');
      const fileResponse = await axios.get(response.data.url, {
        responseType: 'arraybuffer',
        timeout: 60000, // 60 seconds timeout for the file download
      });
      
      // Save the file
      fs.writeFileSync(filePath, Buffer.from(fileResponse.data));
      console.log(`File saved to ${filePath}`);
      
      return {
        success: true,
        filePath: filePath,
      };
    } else {
      console.error('Invalid response from Cobalt API', response.data);
      return {
        success: false,
        error: 'Invalid response from Cobalt API',
      };
    }
  } catch (error) {
    console.error('Error downloading from Cobalt:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  downloadFromCobalt,
};