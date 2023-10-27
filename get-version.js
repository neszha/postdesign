import fs from 'file-system';

// Read package.json
const ROOT = process.cwd();
const packageBuffer = fs.readFileSync(`${ROOT}/package.json`);
const packageData = JSON.parse(packageBuffer.toString());

// Show version.
console.log(packageData.version || '0.0.0');
