// Simple build script for Vercel
console.log('Starting build process...');

// Simulating build steps
console.log('Checking for required files...');
const fs = require('fs');
const path = require('path');

// List of files that should exist
const requiredFiles = [
  'api/chat.js',
  'api/test.js',
  'api/index.js',
  'api/_config.js',
  'vercel.json',
  'dashboard.html'
];

// Check each file
let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✓ ${file} exists`);
  } else {
    console.error(`✗ ${file} is missing!`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('All required files found.');
} else {
  console.error('Some required files are missing!');
  // Exit with a non-zero code to fail the build if files are missing
  process.exit(1);
}

console.log('Build process completed successfully.'); 