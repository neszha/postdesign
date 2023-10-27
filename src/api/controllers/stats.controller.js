import { broadcastMessage } from '../../utils/telegram.bot.js';

export default {
    /**
     * Method: GET
     */
    get: {

    },

    /**
     * Method: POST
     */
    post: {
        async sendMessageToTelegramUsers(req, res) {
            const message = req.body.message || '-';
            broadcastMessage(message);
            return res.json({ success: true });
        },
    },

    /**
     * Method: PUT
     */
    put: {

    },

    /**
     * Method: PATCH
     */
    patch: {

    },

    /**
     * Method: DELETE
     */
    delete: {

    },
};
