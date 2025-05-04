const axios = require('axios');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Base path for temporary files
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

/**
 * Create a GIF based on a prompt (similar to Assyst /gif command)
 * @param {string} prompt - The prompt for the GIF
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>}
 */
async function createGif(prompt) {
  try {
    console.log(`Creating GIF with prompt: ${prompt}`);
    
    // In a real implementation, you would connect to an AI service like:
    // - Replicate (for Stable Diffusion animation models)
    // - Stability AI's animation API
    // - A custom deployed Stable Diffusion animation model
    
    // Example connection pattern for Replicate (commented out as it requires an API key)
    /*
    const response = await axios.post('https://api.replicate.com/v1/predictions', {
      version: "997d0f57647c62fc3a2fe4c872172fc98041f493638454ccaf5ba903ecd3e9d8", // SD Turbo animation model
      input: {
        prompt: prompt,
        negative_prompt: "blurry, low quality, distorted",
        num_frames: 16,
        fps: 8
      },
    }, {
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    // Poll until the model completes
    let predictionUrl = `https://api.replicate.com/v1/predictions/${response.data.id}`;
    let prediction = response.data;
    
    while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
      await new Promise(r => setTimeout(r, 1000));
      const pollResponse = await axios.get(predictionUrl, {
        headers: { Authorization: `Token ${process.env.REPLICATE_API_KEY}` },
      });
      prediction = pollResponse.data;
    }
    
    if (prediction.status === 'succeeded') {
      // Download the generated GIF
      const outputUrl = prediction.output;
      const gifResponse = await axios.get(outputUrl, { responseType: 'arraybuffer' });
      
      // Save the GIF
      const filePath = path.join(tempDir, `gif_${Date.now()}.gif`);
      fs.writeFileSync(filePath, Buffer.from(gifResponse.data));
      
      return {
        success: true,
        filePath: filePath,
      };
    }
    */
    
    // Create a placeholder response with instructions
    return {
      success: false,
      error: "To implement the /gif command, you need to set up an API key for an AI service like Replicate. Add REPLICATE_API_KEY to your .env file and uncomment the implementation code in commands.js."
    };
  } catch (error) {
    console.error('Error creating GIF:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Create frames based on a prompt (similar to Assyst /frames command)
 * @param {string} prompt - The prompt for the frames
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>}
 */
async function createFrames(prompt) {
  try {
    console.log(`Creating frames with prompt: ${prompt}`);
    
    // Similar implementation to createGif, but requesting multiple separate images
    // instead of an animation, and then combining them into a grid
    
    // Example implementation pattern (commented out as it requires an API key)
    /*
    // Generate multiple images with slight variations
    const numFrames = 4;
    const imagePromises = [];
    
    for (let i = 0; i < numFrames; i++) {
      // Add some variation to each frame
      const framePrompt = `${prompt}, frame ${i+1} of a sequence`;
      
      const response = await axios.post('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        text_prompts: [{ text: framePrompt }],
        cfg_scale: 7,
        height: 512,
        width: 512,
        samples: 1,
        steps: 30,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      
      const base64Image = response.data.artifacts[0].base64;
      imagePromises.push(Buffer.from(base64Image, 'base64'));
    }
    
    // Wait for all images to be generated
    const imageBuffers = await Promise.all(imagePromises);
    
    // Use a library like sharp to create a grid of images
    const sharp = require('sharp');
    const compositeOps = [];
    
    // Create a 2x2 grid
    imageBuffers.forEach((buffer, index) => {
      const x = (index % 2) * 512;
      const y = Math.floor(index / 2) * 512;
      
      compositeOps.push({ 
        input: buffer, 
        top: y, 
        left: x 
      });
    });
    
    // Create the composite image
    const outputBuffer = await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite(compositeOps)
    .png()
    .toBuffer();
    
    // Save the composite image
    const filePath = path.join(tempDir, `frames_${Date.now()}.png`);
    fs.writeFileSync(filePath, outputBuffer);
    
    return {
      success: true,
      filePath: filePath,
    };
    */
    
    return {
      success: false,
      error: "To implement the /frames command, you need to set up an API key for an image generation service like Stability AI. Add STABILITY_API_KEY to your .env file and uncomment the implementation code in commands.js."
    };
  } catch (error) {
    console.error('Error creating frames:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Create a heart locket with two images (similar to Assyst /heartlocket command)
 * @param {string} first - The first image URL or prompt
 * @param {string} second - The second image URL or prompt
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>}
 */
async function createHeartlocket(first, second) {
  try {
    console.log(`Creating heart locket with: ${first} and ${second}`);
    
    // Determine if inputs are URLs or text prompts
    const firstIsUrl = isValidUrl(first);
    const secondIsUrl = isValidUrl(second);
    
    // Implementation pattern (commented out as it requires external services)
    /*
    // Get or generate the first image
    let firstImageBuffer;
    if (firstIsUrl) {
      // Download the image if it's a URL
      const response = await axios.get(first, { responseType: 'arraybuffer' });
      firstImageBuffer = Buffer.from(response.data);
    } else {
      // Generate an image if it's a text prompt
      firstImageBuffer = await generateImageFromPrompt(first);
    }
    
    // Get or generate the second image
    let secondImageBuffer;
    if (secondIsUrl) {
      const response = await axios.get(second, { responseType: 'arraybuffer' });
      secondImageBuffer = Buffer.from(response.data);
    } else {
      secondImageBuffer = await generateImageFromPrompt(second);
    }
    
    // Download the heart locket template
    const heartLocketTemplate = path.join(__dirname, 'assets', 'heart_locket_template.png');
    
    // Use a library like Sharp to composite the images
    const sharp = require('sharp');
    
    // Create the composite image with the heart locket template
    const leftHeart = await sharp(firstImageBuffer)
      .resize(300, 300)
      .composite([{
        input: heartLocketTemplate,
        blend: 'overlay'
      }])
      .toBuffer();
      
    const rightHeart = await sharp(secondImageBuffer)
      .resize(300, 300)
      .composite([{
        input: heartLocketTemplate,
        blend: 'overlay'
      }])
      .toBuffer();
    
    // Create the final heart locket image
    const outputBuffer = await sharp({
      create: {
        width: 650,
        height: 300,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      }
    })
    .composite([
      { input: leftHeart, left: 0, top: 0 },
      { input: rightHeart, left: 350, top: 0 }
    ])
    .png()
    .toBuffer();
    
    // Save the composite image
    const filePath = path.join(tempDir, `heartlocket_${Date.now()}.png`);
    fs.writeFileSync(filePath, outputBuffer);
    
    return {
      success: true,
      filePath: filePath,
    };
    */
    
    return {
      success: false,
      error: "To implement the /heartlocket command, you need to set up image processing utilities and potentially an AI image generation API. Check the commented code in commands.js for implementation details."
    };
  } catch (error) {
    console.error('Error creating heart locket:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Create a painted image based on a reference and prompt (similar to Assyst /paint command)
 * @param {string} reference - The reference image URL
 * @param {string} prompt - The prompt for painting
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>}
 */
async function createPaint(reference, prompt) {
  try {
    console.log(`Creating painting with reference: ${reference} and prompt: ${prompt}`);
    
    if (!isValidUrl(reference)) {
      return {
        success: false,
        error: "Reference must be a valid image URL"
      };
    }
    
    // Implementation pattern for image-to-image generation (commented out as it requires an API key)
    /*
    // Download the reference image
    const response = await axios.get(reference, { responseType: 'arraybuffer' });
    const referenceBuffer = Buffer.from(response.data);
    
    // Convert to base64 for the API
    const base64Image = referenceBuffer.toString('base64');
    
    // Call an image-to-image API like Stability AI
    const response = await axios.post('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image', {
      text_prompts: [{ text: prompt }],
      init_image: base64Image,
      init_image_mode: "IMAGE_STRENGTH",
      image_strength: 0.35, // How much to preserve of the original image
      cfg_scale: 7,
      samples: 1,
      steps: 30,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    
    // Get the generated image
    const generatedImage = Buffer.from(response.data.artifacts[0].base64, 'base64');
    
    // Save the image
    const filePath = path.join(tempDir, `paint_${Date.now()}.png`);
    fs.writeFileSync(filePath, generatedImage);
    
    return {
      success: true,
      filePath: filePath,
    };
    */
    
    return {
      success: false,
      error: "To implement the /paint command, you need to set up an API key for an image-to-image generation service like Stability AI. Add STABILITY_API_KEY to your .env file and uncomment the implementation code in commands.js."
    };
  } catch (error) {
    console.error('Error creating painting:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Utility function to check if a string is a valid URL
 * @param {string} str - The string to check
 * @returns {boolean}
 */
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Utility function to download an image from a URL
 * @param {string} url - The URL to download from
 * @param {string} filePath - The path to save the file to
 * @returns {Promise<void>}
 */
async function downloadImage(url, filePath) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(filePath, buffer);
}

/**
 * Utility function to generate an image from a text prompt
 * (This would connect to an AI service in a real implementation)
 * @param {string} prompt - The prompt to generate an image from
 * @returns {Promise<Buffer>} - A buffer containing the generated image
 */
async function generateImageFromPrompt(prompt) {
  // This is a placeholder - in a real implementation, you would call an AI service
  throw new Error('Image generation from prompt is not implemented. Please add an AI service API key.');
}

module.exports = {
  createGif,
  createFrames,
  createHeartlocket,
  createPaint,
  isValidUrl,
  downloadImage,
};