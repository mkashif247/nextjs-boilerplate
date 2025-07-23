#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const projectName = process.argv[2];

if (!projectName) {
    console.error('Please specify the project directory:');
    console.error('  npx create-nextjs-boilerplate <project-directory>');
    console.error('For example:');
    console.error('  npx create-nextjs-boilerplate my-next-app');
    process.exit(1);
}

const root = path.resolve(projectName);
const appName = path.basename(root);

fs.ensureDirSync(projectName);
console.log(`Creating a new Next.js app in ${root}.`);

const templateDir = path.resolve(__dirname, '..');

fs.copySync(templateDir, root, {
    filter: (src, dest) => {
        const relativePath = path.relative(templateDir, src);
        const exclude = ['node_modules', '.git', 'bin', 'package-lock.json'];
        // Exclude top-level directories like node_modules, .git, and bin, and also package-lock.json
        return !exclude.some(dir => relativePath === dir || relativePath.startsWith(dir + path.sep));
    },
});

process.chdir(root);

console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

console.log('Initializing a new Git repository...');
execSync('git init', { stdio: 'inherit' });
execSync('git add .', { stdio: 'inherit' });
execSync('git commit -m "Initial commit from nextjs-boilerplate"', { stdio: 'inherit' });

console.log('');
console.log('Success! Created ' + appName + ' at ' + root);
console.log('Inside that directory, you can run these commands:');
console.log('');
console.log('  npm run dev');
console.log('    Starts the development server.');
console.log('');
console.log('  npm run build');
console.log('    Builds the app for production.');
console.log('');
console.log('  npm start');
console.log('    Runs the built app in production mode.');
console.log('');
console.log('We suggest that you begin by typing:');
console.log('');
console.log('  cd ' + projectName);
console.log('  npm run dev');
console.log(''); 