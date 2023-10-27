import bcryptHelper from '../helpers/bcrypt.helper.js';
import sessionsModel from '../models/sessions.model.js';
import { ACCESS_KEY_HASH } from '../helpers/config.helper.js';

export default {
    /**
     * Method: GET
     */
    get: {
        async logout(req, res) {
            try {
                const { sessionId } = req.cookies;

                // Update session.
                if (sessionId) {
                    const sessionUpdateBody = {
                        logoutAt: new Date().getTime(),
                    };
                    await sessionsModel.update(sessionUpdateBody, {
                        where: { id: sessionId },
                    });
                }

                // Done.
                res.clearCookie('sessionId');
                res.redirect('/auth');
            } catch (error) {
                res.clearCookie('sessionId');
                res.redirect('/auth?error=true');
            }
        },
    },

    /**
     * Method: POST
     */
    post: {
        async login(req, res) {
            try {
                const { accessKey } = req.body;
                if (!accessKey) return res.redirect('/auth');

                // Validate access key.
                const isMatch = bcryptHelper.compare(accessKey, ACCESS_KEY_HASH);
                const sessionPostBody = {
                    accessKey,
                    isValid: isMatch,
                    loginIp: req.ip,
                    loginAt: new Date().getTime(),
                };
                const session = await sessionsModel.create(sessionPostBody);
                if (!isMatch) return res.redirect('/auth?invalid=true');

                // Done.
                res.cookie('sessionId', session.id, {
                    expires: new Date(Date.now() + 2592000000), // 1 month.
                    httpOnly: true,
                });
                return res.redirect('/panel');
            } catch (error) {
                return res.redirect('/auth?error=true');
            }
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
        //
    },
};
