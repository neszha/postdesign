/* eslint-disable no-unused-expressions */
import formsModel from '../src/models/forms.model.js';
import sessionsModel from '../src/models/sessions.model.js';
import monitorsModel from '../src/models/monitors.model.js';
import telegramUsersModel from '../src/models/telegram-users.model.js';

(async () => {
    try {
        // Create table.
        await formsModel.sync({ force: true });
        await sessionsModel.sync({ force: true });
        await monitorsModel.sync({ force: true });
        await telegramUsersModel.sync({ force: true });

        // Make default data.
        await formsModel.create({ key: 'version:myexams-web', value: '0.0.0' });
        await formsModel.create({ key: 'version:myexams-android', value: '0.0.0' });
        await formsModel.create({ key: 'link:myexams-demo-participant', value: '/' });
        await formsModel.create({ key: 'link:myexams-demo-panel', value: '/' });
        await formsModel.create({ key: 'link:myexams-android-download', value: '/' });
        await formsModel.create({ key: 'stat:total-access', value: '0' });
        await formsModel.create({ key: 'stat:total-access-public', value: '0' });
        await formsModel.create({ key: 'stat:total-login', value: '0' });
        await formsModel.create({ key: 'stat:total-hit', value: '0' });
    } catch (error) {
        console.log(error);
    }

    // Done.
    process.exit();
})();
