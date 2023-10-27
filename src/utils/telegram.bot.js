import TelegramBot from 'node-telegram-bot-api';
import telegramUsersModel from '../models/telegram-users.model.js';
import { TELEGRAM_ALLOW_USERS, TELEGRAM_TOKEN } from '../helpers/config.helper.js';

/** Connect to telegram API */
const telegram = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

/** Load allow users */
const usersString = TELEGRAM_ALLOW_USERS || '';
const allowUsers = usersString.split(',');

/** Tg event: /start */
telegram.onText(/\/start/, async (message) => {
    // Validate allow users
    const {
        id, username, first_name, last_name, type,
    } = message.chat;
    if (!allowUsers.includes(username)) {
        telegram.sendMessage(id, 'Account not allowed.');
        return;
    }

    // Save connection id to db.
    const userBody = {
        id,
        username,
        firstName: first_name,
        lastName: last_name,
        type,
    };

    // Add account.
    const user = await telegramUsersModel.findOne({
        raw: true,
        where: { id },
    });
    if (!user) {
        await telegramUsersModel.create(userBody);
    }

    // Update account.
    if (user) {
        const updateUserBody = { ...userBody };
        delete updateUserBody.id;
        await telegramUsersModel.update(updateUserBody, {
            where: { id },
        });
    }

    // Say welcome.
    telegram.sendMessage(id, `Welcome, ${message.chat.first_name} ${message.chat.last_name}`);
});

/** Tg event: /stop */
telegram.onText(/\/stop/, async (message) => {
    const { id } = message.chat;

    // Remove user.
    const user = await telegramUsersModel.findOne({
        raw: true,
        where: { id },
    });
    if (!user) return;
    await telegramUsersModel.destroy({
        where: { id },
    });

    // Say goodbay.
    telegram.sendMessage(id, `Goodbye, ${user.firstName} ${user.lastName}`);
});

/** Error handdling */
let oneNotif = false;
telegram.on('polling_error', () => {
    if (!oneNotif) {
        oneNotif = true;
        console.log('Telegram Bot Token not provided!');
    }
});

export const getTelegramUsers = async () => {
    const users = await telegramUsersModel.findAll({ raw: true });
    return users;
};

export const broadcastMessage = async (message) => {
    try {
        const users = await getTelegramUsers();
        const promises = [];
        users.forEach((user) => {
            promises.push(telegram.sendMessage(user.id, message));
        });
        await Promise.all(promises);
    } catch (error) {
        //
    }
};
