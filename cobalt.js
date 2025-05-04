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
    
    // Determine which service the URL is from
    const serviceType = determineServiceType(url);
    console.log(`Detected service type: ${serviceType}`);
    
    // API endpoint for Cobalt
    const endpoint = 'https://co.wuk.sh/api/json';
    
    // Configure request based on service type and format
    const requestData = {
      url: url,
      aFormat: format === 'mp3' ? 'mp3' : null,
      vFormat: format === 'mp4' ? (serviceType === 'youtube' ? '720' : 'mp4') : null,
      filenamePattern: 'basic',
      isAudioOnly: format === 'mp3',
      isNoTTWatermark: serviceType === 'tiktok', // Remove TikTok watermark if applicable
      isTTFullAudio: serviceType === 'tiktok' && format === 'mp3', // Get full audio for TikTok
      isVerbose: true, // Get detailed logs
    };
    
    // Add service-specific options
    if (serviceType === 'twitter') {
      requestData.twitterGif = true; // Enable Twitter GIF download
    } else if (serviceType === 'instagram') {
      requestData.isNoWatermark = true; // Remove Instagram watermark if possible
    }
    
    console.log('Sending request to Cobalt API...');
    const response = await axios.post(endpoint, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'DiscordBot/1.0',
      },
      timeout: 40000, // 40 seconds timeout
    });
    
    // Handle status-based responses
    if (response.data && response.data.status === 'error') {
      console.error('Cobalt API error:', response.data.text);
      return {
        success: false,
        error: response.data.text || 'Unknown error from Cobalt API',
      };
    }
    
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
        timeout: 90000, // 90 seconds timeout for the file download
        headers: {
          'User-Agent': 'DiscordBot/1.0',
        },
        maxContentLength: 100 * 1024 * 1024, // 100MB max size
      });
      
      // Save the file
      fs.writeFileSync(filePath, Buffer.from(fileResponse.data));
      console.log(`File saved to ${filePath}`);
      
      return {
        success: true,
        filePath: filePath,
        meta: response.data.meta || {},
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

/**
 * Determine the service type from the URL
 * @param {string} url - The URL to analyze
 * @returns {string} - The service type (youtube, twitter, tiktok, instagram, etc.)
 */
function determineServiceType(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return 'youtube';
    } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      return 'twitter';
    } else if (hostname.includes('tiktok.com')) {
      return 'tiktok';
    } else if (hostname.includes('instagram.com')) {
      return 'instagram';
    } else if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
      return 'facebook';
    } else if (hostname.includes('reddit.com')) {
      return 'reddit';
    } else if (hostname.includes('soundcloud.com')) {
      return 'soundcloud';
    } else if (hostname.includes('twitch.tv')) {
      return 'twitch';
    } else if (hostname.includes('vimeo.com')) {
      return 'vimeo';
    } else if (hostname.includes('pinterest.com')) {
      return 'pinterest';
    } else {
      return 'generic';
    }
  } catch (error) {
    console.error('Error determining service type:', error.message);
    return 'generic';
  }
}

/**
 * Fallback method using YouTube-DL API if Cobalt fails
 * Note: This is a placeholder and would need a YouTube-DL compatible service to work
 * @param {string} url - The URL to download from
 * @param {string} format - The format to download
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>}
 */
async function fallbackDownload(url, format) {
  // This is a placeholder for a fallback method
  // In a real implementation, you would use a different service or method
  console.log('Attempting fallback download method...');
  return {
    success: false,
    error: 'Fallback download not implemented yet. Cobalt API failed.'
  };
}

module.exports = {
  downloadFromCobalt,
  determineServiceType,
};