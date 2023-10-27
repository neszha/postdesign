import monitorsModel from '../../models/monitors.model.js';

const invalid = (res, msg = null) => {
    res.json({ success: false, msg: msg || 'Invalid parameter!' });
};

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
        async monitor(req, res) {
            const {
                id, serialNumber, payload, appTime, status, publicIp, schoolInfo,
            } = req.body;

            // Validate body.
            if (!id || !serialNumber || !appTime) return res.invalid(res);
            if (!payload) req.body.payload = {};
            if (serialNumber === 'sign.payload') return invalid(res);

            try {
                // Rebuild body.
                const monitorBody = {
                    id,
                    serialNumber,
                    snName: payload.name,
                    snVersion: payload.version,
                    snServer: payload.server,
                    snEmail: payload.email,
                    snCreatedAt: payload.createdAt,
                    snExpiredAt: payload.expiredAt,
                    status,
                    publicIp,
                    appTime,
                    schoolInfo: JSON.stringify(schoolInfo || {}),
                };

                // Get monitor data.
                const monitor = await monitorsModel.findOne({
                    raw: true,
                    where: { id },
                    attributes: ['id', 'hitCounter'],
                });

                // Insert into database.
                if (!monitor) {
                    const monitorPostBody = {
                        ...monitorBody,
                        hitCounter: 1,
                        blocked: false,
                    };
                    await monitorsModel.create(monitorPostBody);
                }

                // Update into database.
                if (monitor) {
                    const monitorUpdateBody = {
                        ...monitorBody,
                        hitCounter: monitor.hitCounter + 1,
                    };
                    delete monitorUpdateBody.id;
                    await monitorsModel.update(monitorUpdateBody, {
                        where: { id: monitor.id },
                    });
                }

                // Get monitor data.
                const monitorData = await monitorsModel.findOne({
                    raw: true,
                    where: { id },
                });

                // Send response.
                return res.json({ success: true, data: monitorData });
            } catch (error) {
                return res.json({ success: false });
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

    },
};
