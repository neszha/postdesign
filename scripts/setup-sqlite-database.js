/* eslint-disable no-unused-expressions */
import telegramUsersModel from '../src/models/telegram-users.model.js';

(async () => {
    try {
        // Create table.
        await telegramUsersModel.sync({ force: true });
    } catch (error) {
        console.log(error);
    }

    // Done.
    process.exit();
})();
