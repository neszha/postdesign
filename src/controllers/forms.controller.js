import fs from 'file-system';
import formsModel from '../models/forms.model.js';
import { PATH_ROOT } from '../helpers/config.helper.js';

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
        async updateAppVersion(req, res) {
            const { web, android } = req.body;

            try {
                await formsModel.update({ value: web }, {
                    where: { key: 'version:myexams-web' },
                });
                await formsModel.update({ value: android }, {
                    where: { key: 'version:myexams-android' },
                });
                res.redirect('/panel/forms');
            } catch (error) {
                res.redirect('/panel/forms?invalid=true');
            }
        },

        async updateAppDemoLink(req, res) {
            const { participant, panel } = req.body;

            try {
                await formsModel.update({ value: participant }, {
                    where: { key: 'link:myexams-demo-participant' },
                });
                await formsModel.update({ value: panel }, {
                    where: { key: 'link:myexams-demo-panel' },
                });
                res.redirect('/panel/forms');
            } catch (error) {
                res.redirect('/panel/forms?invalid=true');
            }
        },

        async uploadMyExamsApk(req, res) {
            if (!req.files || !req.files.apk) {
                return res.redirect('/panel/forms?invalid=true');
            }

            try {
                const file = req.files.apk;

                // Save file.
                const filePath = `${PATH_ROOT}/storage/files/${file.name}`;
                fs.writeFileSync(filePath, file.data);

                // Save file location.
                const fileLocation = `/files/${file.name}`;
                await formsModel.update({ value: fileLocation }, {
                    where: { key: 'link:myexams-android-download' },
                });

                // Done.
                return res.redirect('/panel/forms');
            } catch (error) {
                console.log(error);
                return res.redirect('/panel/forms?invalid=true');
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
