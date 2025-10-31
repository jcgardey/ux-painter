import { copyFile, mkdir } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

async function copyAssets() {
  try {
    // Create assets directory if it doesn't exist
    await mkdir(resolve(__dirname, '../dist/assets'), { recursive: true });

    // Copy manifest
    await copyFile(
      resolve(__dirname, '../src/public/manifest.json'),
      resolve(__dirname, '../dist/manifest.json'),
    );

    // Copy icons
    const icons = ['default_icon.png'];
    for (const icon of icons) {
      await copyFile(
        resolve(__dirname, '../src/public', icon),
        resolve(__dirname, '../dist/assets', icon),
      );
    }
    
    console.log('Assets copied successfully!');
  } catch (error) {
    console.error('Error copying assets:', error);
    process.exit(1);
  }
}

copyAssets();
