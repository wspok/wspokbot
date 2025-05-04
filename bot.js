require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Events, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { downloadFromCobalt } = require('./cobalt');
const { createGif, createFrames, createHeartlocket, createGenerate, createPaint } = require('./commands');
const fs = require('fs');
const path = require('path');

// Initialize Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel]
});

// Create needed directories
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Register slash commands when bot is ready
client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);

  try {
    const commands = [
      {
        name: 'download',
        description: 'Download content from a URL using Cobalt',
        options: [
          {
            name: 'url',
            description: 'The URL to download from',
            type: ApplicationCommandOptionType.String,
            required: true,
          },
          {
            name: 'format',
            description: 'The format to download (mp3, mp4, etc.)',
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: [
              { name: 'Audio (mp3)', value: 'mp3' },
              { name: 'Video (mp4)', value: 'mp4' },
            ]
          }
        ],
        type: ApplicationCommandType.ChatInput,
      },
      {
        name: 'gif',
        description: 'Generate a GIF based on your prompt',
        options: [
          {
            name: 'prompt',
            description: 'The prompt for the GIF',
            type: ApplicationCommandOptionType.String,
            required: true,
          }
        ],
        type: ApplicationCommandType.ChatInput,
      },
      {
        name: 'frames',
        description: 'Generate frames based on your prompt',
        options: [
          {
            name: 'prompt',
            description: 'The prompt for the frames',
            type: ApplicationCommandOptionType.String,
            required: true,
          }
        ],
        type: ApplicationCommandType.ChatInput,
      },
      {
        name: 'heartlocket',
        description: 'Create a heart locket with two images',
        options: [
          {
            name: 'first',
            description: 'The first image URL or prompt',
            type: ApplicationCommandOptionType.String,
            required: true,
          },
          {
            name: 'second',
            description: 'The second image URL or prompt',
            type: ApplicationCommandOptionType.String,
            required: true,
          }
        ],
        type: ApplicationCommandType.ChatInput,
      },
      {
        name: 'generate',
        description: 'Generate an image based on a text prompt',
        options: [
          {
            name: 'prompt',
            description: 'The prompt for image generation',
            type: ApplicationCommandOptionType.String,
            required: true,
          }
        ],
        type: ApplicationCommandType.ChatInput,
      },
      {
        name: 'paint',
        description: 'Transform a reference image into a painting style',
        options: [
          {
            name: 'reference',
            description: 'The reference image URL',
            type: ApplicationCommandOptionType.String,
            required: true,
          },
          {
            name: 'prompt',
            description: 'The prompt for painting style',
            type: ApplicationCommandOptionType.String,
            required: true,
          }
        ],
        type: ApplicationCommandType.ChatInput,
      }
    ];
    
    console.log('Started refreshing application (/) commands...');
    
    const rest = client.rest;
    await rest.put(
      `/applications/${client.user.id}/commands`,
      { body: commands },
    );
    
    console.log('Successfully reloaded application (/) commands!');
  } catch (error) {
    console.error(error);
  }
});

// Handle slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    const { commandName, options } = interaction;

    // Defer reply for all commands since they might take time
    await interaction.deferReply();

    switch (commandName) {
      case 'download': {
        const url = options.getString('url');
        const format = options.getString('format') || 'mp4';
        
        if (!url) {
          await interaction.editReply('Please provide a valid URL.');
          return;
        }
        
        try {
          const result = await downloadFromCobalt(url, format);
          if (result.success) {
            const fileExtension = format === 'mp3' ? 'mp3' : 'mp4';
            const attachment = new AttachmentBuilder(result.filePath, { name: `download.${fileExtension}` });
            
            const embed = new EmbedBuilder()
              .setTitle('Download Complete')
              .setDescription(`Successfully downloaded content from ${url}`)
              .setColor('#00FF00');
            
            await interaction.editReply({ embeds: [embed], files: [attachment] });
            
            // Clean up the file after sending
            setTimeout(() => {
              try {
                fs.unlinkSync(result.filePath);
              } catch (err) {
                console.error('Failed to delete file:', err);
              }
            }, 5000);
          } else {
            await interaction.editReply(`Failed to download: ${result.error}`);
          }
        } catch (error) {
          console.error('Download error:', error);
          await interaction.editReply('An error occurred while downloading the content.');
        }
        break;
      }

      case 'gif': {
        const prompt = options.getString('prompt');
        
        if (!prompt) {
          await interaction.editReply('Please provide a prompt.');
          return;
        }
        
        try {
          const result = await createGif(prompt);
          if (result.success) {
            const attachment = new AttachmentBuilder(result.filePath, { name: 'generated.gif' });
            
            const embed = new EmbedBuilder()
              .setTitle('GIF Generated')
              .setDescription(`Generated GIF for: ${prompt}`)
              .setColor('#FF00FF');
            
            await interaction.editReply({ embeds: [embed], files: [attachment] });
            
            // Clean up
            setTimeout(() => {
              try {
                fs.unlinkSync(result.filePath);
              } catch (err) {
                console.error('Failed to delete file:', err);
              }
            }, 5000);
          } else {
            await interaction.editReply(`Failed to generate GIF: ${result.error}`);
          }
        } catch (error) {
          console.error('GIF generation error:', error);
          await interaction.editReply('An error occurred while generating the GIF.');
        }
        break;
      }

      case 'frames': {
        const prompt = options.getString('prompt');
        
        if (!prompt) {
          await interaction.editReply('Please provide a prompt.');
          return;
        }
        
        try {
          const result = await createFrames(prompt);
          if (result.success) {
            const attachment = new AttachmentBuilder(result.filePath, { name: 'frames.png' });
            
            const embed = new EmbedBuilder()
              .setTitle('Frames Generated')
              .setDescription(`Generated frames for: ${prompt}`)
              .setColor('#FF00FF');
            
            await interaction.editReply({ embeds: [embed], files: [attachment] });
            
            // Clean up
            setTimeout(() => {
              try {
                fs.unlinkSync(result.filePath);
              } catch (err) {
                console.error('Failed to delete file:', err);
              }
            }, 5000);
          } else {
            await interaction.editReply(`Failed to generate frames: ${result.error}`);
          }
        } catch (error) {
          console.error('Frames generation error:', error);
          await interaction.editReply('An error occurred while generating the frames.');
        }
        break;
      }

      case 'heartlocket': {
        const first = options.getString('first');
        const second = options.getString('second');
        
        if (!first || !second) {
          await interaction.editReply('Please provide both images or prompts.');
          return;
        }
        
        try {
          const result = await createHeartlocket(first, second);
          if (result.success) {
            const attachment = new AttachmentBuilder(result.filePath, { name: 'heartlocket.png' });
            
            const embed = new EmbedBuilder()
              .setTitle('Heart Locket Generated')
              .setDescription('Created a heart locket with your images')
              .setColor('#FF0000');
            
            await interaction.editReply({ embeds: [embed], files: [attachment] });
            
            // Clean up
            setTimeout(() => {
              try {
                fs.unlinkSync(result.filePath);
              } catch (err) {
                console.error('Failed to delete file:', err);
              }
            }, 5000);
          } else {
            await interaction.editReply(`Failed to generate heart locket: ${result.error}`);
          }
        } catch (error) {
          console.error('Heart locket generation error:', error);
          await interaction.editReply('An error occurred while generating the heart locket.');
        }
        break;
      }
      
      case 'generate': {
        const prompt = options.getString('prompt');
        
        if (!prompt) {
          await interaction.editReply('Please provide a prompt for image generation.');
          return;
        }
        
        try {
          const result = await createGenerate(prompt);
          if (result.success) {
            const attachment = new AttachmentBuilder(result.filePath, { name: 'generated.png' });
            
            const embed = new EmbedBuilder()
              .setTitle('Image Generated')
              .setDescription(`Generated image for: ${prompt}`)
              .setColor('#9C59B6');
            
            await interaction.editReply({ embeds: [embed], files: [attachment] });
            
            // Clean up
            setTimeout(() => {
              try {
                fs.unlinkSync(result.filePath);
              } catch (err) {
                console.error('Failed to delete file:', err);
              }
            }, 5000);
          } else {
            await interaction.editReply(`Failed to generate image: ${result.error}`);
          }
        } catch (error) {
          console.error('Image generation error:', error);
          await interaction.editReply('An error occurred while generating the image.');
        }
        break;
      }

      case 'paint': {
        const reference = options.getString('reference');
        const prompt = options.getString('prompt');
        
        if (!reference || !prompt) {
          await interaction.editReply('Please provide both a reference image and a prompt.');
          return;
        }
        
        try {
          const result = await createPaint(reference, prompt);
          if (result.success) {
            const attachment = new AttachmentBuilder(result.filePath, { name: 'painted.png' });
            
            const embed = new EmbedBuilder()
              .setTitle('Painting Generated')
              .setDescription(`Painted image based on prompt: ${prompt}`)
              .setColor('#0000FF');
            
            await interaction.editReply({ embeds: [embed], files: [attachment] });
            
            // Clean up
            setTimeout(() => {
              try {
                fs.unlinkSync(result.filePath);
              } catch (err) {
                console.error('Failed to delete file:', err);
              }
            }, 5000);
          } else {
            await interaction.editReply(`Failed to generate painting: ${result.error}`);
          }
        } catch (error) {
          console.error('Paint generation error:', error);
          await interaction.editReply('An error occurred while generating the painting.');
        }
        break;
      }

      default:
        await interaction.editReply('Unknown command.');
    }
  } catch (error) {
    console.error('Command error:', error);
    try {
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply('An error occurred while processing your command.');
      } else {
        await interaction.reply({ content: 'An error occurred while processing your command.', ephemeral: true });
      }
    } catch (replyError) {
      console.error('Failed to reply with error:', replyError);
    }
  }
});

// Login to Discord with your app's token
client.login(process.env.DISCORD_TOKEN);