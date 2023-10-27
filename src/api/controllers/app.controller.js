import moment from 'moment';
import fs from 'file-system';
import { cpus, version } from 'os';
import { PATH_ROOT } from '../../helpers/config.helper.js';

export default {
    /**
     * Method: GET
     */
    get: {
        test(req, res) {
            res.json({
                msg: 'API server is ready.',
            });
        },

        timeServer(req, res) {
            const time = new Date().getTime();
            const clock = moment(time).format();
            const timeZone = process.env.TZ;

            // Done.
            res.json({ data: { time, clock, timeZone } });
        },

        async info(req, res) {
            // Get package.json info.
            const packageBuffer = fs.readFileSync(`${PATH_ROOT}/package.json`);
            const packageJson = JSON.parse(packageBuffer.toString());

            // Build response info.
            const info = {
                app: {
                    appName: packageJson['app-name'],
                    companyName: packageJson['company-name'],
                    version: packageJson.version,
                },
                system: {
                    pid: process.pid,
                    cpus: cpus().length,
                    version: version(),
                },
            };

            // Done.
            return res.json({ data: info });
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
