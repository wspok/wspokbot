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
 * Split a GIF into frames (similar to Assyst /frames command)
 * @param {string} gifUrl - The URL of the GIF to split into frames
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>}
 */
async function createFrames(gifUrl) {
  try {
    console.log(`Splitting GIF into frames: ${gifUrl}`);
    
    if (!isValidUrl(gifUrl)) {
      return {
        success: false,
        error: "Please provide a valid GIF URL"
      };
    }
    
    // Implementation pattern for extracting frames (commented out as it requires image processing libraries)
    /*
    // Download the GIF
    const response = await axios.get(gifUrl, { responseType: 'arraybuffer' });
    const gifBuffer = Buffer.from(response.data);
    
    // Use a library like 'gif-frames' to extract frames
    const frameData = await gifFrames({ 
      url: gifBuffer, 
      frames: 'all', 
      outputType: 'png',
      cumulative: true
    });
    
    // Limit to a reasonable number of frames (max 16)
    const maxFrames = Math.min(frameData.length, 16);
    const selectedFrames = frameData.slice(0, maxFrames);
    
    // Use a library like sharp to create a grid of images
    const sharp = require('sharp');
    const compositeOps = [];
    
    // Determine grid dimensions
    const gridSize = Math.ceil(Math.sqrt(maxFrames)); // e.g., 4x4 grid for 16 frames
    const frameSize = 256; // fixed size for each frame in the grid
    const totalSize = frameSize * gridSize;
    
    // Extract frame images and prepare for compositing
    for (let i = 0; i < selectedFrames.length; i++) {
      const frameBuffer = await selectedFrames[i].getBuffer();
      
      // Process each frame to consistent size
      const resizedFrame = await sharp(frameBuffer)
        .resize(frameSize, frameSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .toBuffer();
      
      // Calculate position in grid
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const x = col * frameSize;
      const y = row * frameSize;
      
      compositeOps.push({ 
        input: resizedFrame, 
        top: y, 
        left: x 
      });
      
      // Add frame number overlay (as a separate composite operation)
      const textBuffer = await sharp({
        create: {
          width: frameSize,
          height: 30,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0.5 }
        }
      })
      .composite([{
        input: { 
          text: {
            text: `Frame ${i + 1}`,
            font: 'Arial',
            fontSize: 18,
            rgba: true
          }
        },
        top: 5,
        left: 10
      }])
      .toBuffer();
      
      compositeOps.push({ 
        input: textBuffer, 
        top: y + frameSize - 30, 
        left: x 
      });
    }
    
    // Create the composite image
    const outputBuffer = await sharp({
      create: {
        width: totalSize,
        height: totalSize,
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
      error: "To implement the /frames command for extracting GIF frames, you need to install and configure 'gif-frames' and 'sharp' libraries. Add these dependencies to your project and uncomment the implementation code in commands.js."
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
 * Create a generated image from a text prompt (similar to Assyst /generate command)
 * @param {string} prompt - The prompt for image generation
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>}
 */
async function createGenerate(prompt) {
  try {
    console.log(`Generating image with prompt: ${prompt}`);
    
    // Implementation pattern for text-to-image generation (commented out as it requires an API key)
    /*
    // Call a text-to-image API like Stability AI
    const response = await axios.post('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      text_prompts: [{ text: prompt }],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
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
    const filePath = path.join(tempDir, `generate_${Date.now()}.png`);
    fs.writeFileSync(filePath, generatedImage);
    
    return {
      success: true,
      filePath: filePath,
    };
    */
    
    return {
      success: false,
      error: "To implement the /generate command, you need to set up an API key for an image generation service like Stability AI. Add STABILITY_API_KEY to your .env file and uncomment the implementation code in commands.js."
    };
  } catch (error) {
    console.error('Error generating image:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Create a painted version of an image (similar to Assyst /paint command)
 * @param {string} reference - The reference image URL
 * @param {string} prompt - The prompt for painting style
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
    
    // Implementation pattern for painting-style transformation (commented out as it requires an API key)
    /*
    // Download the reference image
    const response = await axios.get(reference, { responseType: 'arraybuffer' });
    const referenceBuffer = Buffer.from(response.data);
    
    // Convert to base64 for the API
    const base64Image = referenceBuffer.toString('base64');
    
    // Call an image-to-image API with painting style parameters
    const response = await axios.post('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image', {
      text_prompts: [{ 
        text: `${prompt}, oil painting style, artistic, detailed brushstrokes, canvas texture` 
      }],
      init_image: base64Image,
      init_image_mode: "IMAGE_STRENGTH",
      image_strength: 0.6, // Higher for more stylization
      cfg_scale: 7.5,
      samples: 1,
      steps: 40,
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
 * Creates a donut profile picture effect by placing user's profile picture behind a donut
 * @param {string} profileUrl - The URL of the user's profile picture
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>}
 */
async function createDonut(profileUrl) {
  try {
    console.log(`Creating donut profile picture with URL: ${profileUrl}`);
    
    if (!isValidUrl(profileUrl)) {
      return {
        success: false,
        error: "Please provide a valid profile picture URL"
      };
    }
    
    // Download the profile picture
    const response = await axios.get(profileUrl, { responseType: 'arraybuffer' });
    const profileBuffer = Buffer.from(response.data);
    
    // Load the donut image (transparent PNG)
    const donutPath = path.join(__dirname, 'assets', 'donut.png');
    
    if (!fs.existsSync(donutPath)) {
      return {
        success: false,
        error: "Donut image not found. Please make sure assets/donut.png exists."
      };
    }
    
    // Path for the output file
    const outputPath = path.join(tempDir, `donut_profile_${Date.now()}.png`);
    
    // Use the canvas library (simpler than some alternatives for basic image manipulation)
    const { createCanvas, loadImage } = require('canvas');
    
    try {
      // Load the images
      const [profileImage, donutImage] = await Promise.all([
        loadImage(profileBuffer),
        loadImage(donutPath)
      ]);
      
      // Create a canvas large enough for both images
      const canvasSize = Math.max(profileImage.width, profileImage.height, donutImage.width, donutImage.height);
      const canvas = createCanvas(canvasSize, canvasSize);
      const ctx = canvas.getContext('2d');
      
      // Draw background color (optional)
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      
      // Calculate positions to center the images
      const profileX = (canvasSize - profileImage.width) / 2;
      const profileY = (canvasSize - profileImage.height) / 2;
      const donutX = (canvasSize - donutImage.width) / 2;
      const donutY = (canvasSize - donutImage.height) / 2;
      
      // Draw profile image (background layer)
      ctx.drawImage(profileImage, profileX, profileY);
      
      // Draw donut image (foreground layer)
      ctx.drawImage(donutImage, donutX, donutY);
      
      // Save the combined image
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(outputPath, buffer);
      
      return {
        success: true,
        filePath: outputPath
      };
    } catch (err) {
      console.error('Error processing images:', err);
      return {
        success: false,
        error: "Error processing images. The canvas library may need to be installed: npm install canvas"
      };
    }
  } catch (error) {
    console.error('Error creating donut profile picture:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
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
  createGenerate,
  createPaint,
  createDonut,
  isValidUrl,
  downloadImage,
};