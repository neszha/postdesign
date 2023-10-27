import monitorsModel from '../models/monitors.model.js';

export default {
    /**
     * Method: GET
     */
    get: {
        async monitorBlockToggle(req, res) {
            const monitorId = req.params.id;
            try {
                const monitor = await monitorsModel.findOne({
                    raw: true,
                    where: { id: monitorId },
                    attributes: ['id', 'blocked'],
                });
                if (!monitor) return res.redirect('/panel/sn');

                // Update.
                const monitorUpdateBody = {
                    blocked: !monitor.blocked,
                };
                await monitorsModel.update(monitorUpdateBody, {
                    where: { id: monitor.id },
                });

                // Done
                return res.redirect(`/panel/sn/${monitor.id}`);
            } catch (error) {
                return res.redirect('/panel/sn?error=true');
            }
        },

        async deleteMonitorById(req, res) {
            const monitorId = req.params.id;

            try {
                await monitorsModel.destroy({
                    where: { id: monitorId },
                });
                res.redirect('/panel/sn');
            } catch (error) {
                res.redirect('/panel/sn?error=true');
            }
        },

        async deleteInvalidMonitor(req, res) {
            try {
                await monitorsModel.destroy({
                    where: { status: 'invalid' },
                });
                res.redirect('/panel/sn');
            } catch (error) {
                res.redirect('/panel/sn?error=true');
            }
        },

        async deleteExpiredMonitor(req, res) {
            try {
                await monitorsModel.destroy({
                    where: { status: 'expired' },
                });
                res.redirect('/panel/sn');
            } catch (error) {
                res.redirect('/panel/sn?error=true');
            }
        },

        async deleteAllMonitor(req, res) {
            try {
                await monitorsModel.destroy({
                    where: {},
                });
                res.redirect('/panel/sn');
            } catch (error) {
                res.redirect('/panel/sn?error=true');
            }
        },
    },

    /**
     * Method: POST
     */
    post: {

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
