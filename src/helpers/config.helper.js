import dotenv from 'dotenv';

dotenv.config();

// App Configuration.
export const APP_PORT = process.env.APP_PORT || 80;
export const APP_DEV_MODE = (process.env.NODE_ENV === 'development');

// Path Configuration.
export const PATH_ROOT = process.cwd();

// Telegram API
export const { TELEGRAM_TOKEN } = process.env;
export const { TELEGRAM_ALLOW_USERS } = process.env;

// Export all env data.
export default process.env;
