import { Op } from 'sequelize';
import sessionsModel from '../models/sessions.model.js';

export default {
    /**
     * Method: GET
     */
    get: {
        async clearAllSessionWithoutMe(req, res) {
            try {
                // Remove sessions.
                await sessionsModel.destroy({
                    where: {
                        id: { [Op.ne]: req.session.id },
                    },
                });

                // Done.
                res.redirect('/panel?done=true');
            } catch (error) {
                res.redirect('/panel?error=true');
            }
        },
    },

    /**
     * Method: POST
     */
    post: {
        //
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
