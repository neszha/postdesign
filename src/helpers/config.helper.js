import dotenv from 'dotenv';
import fs from 'file-system';

dotenv.config();

// Read package.json
const ROOT = process.cwd();
const packageBuffer = fs.readFileSync(`${ROOT}/package.json`);
const packageData = JSON.parse(packageBuffer.toString());

// App Configuration.
export const APP_PORT = process.env.APP_PORT || 80;
export const APP_DEV_MODE = (process.env.NODE_ENV === 'development');
export const APP_VERSION = packageData.version || '0.0.0';

// Path Configuration.
export const PATH_ROOT = process.cwd();

// Telegram API
export const { TELEGRAM_TOKEN } = process.env;
export const { TELEGRAM_ALLOW_USERS } = process.env;

// Export all env data.
export default process.env;
