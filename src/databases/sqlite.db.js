import { Sequelize } from 'sequelize';
import { APP_DEV_MODE, PATH_ROOT } from '../helpers/config.helper.js';

const options = {
    dialect: 'sqlite',
    storage: `${PATH_ROOT}/storage/database.sqlite`,
    logging: false,
};

// Logging in dev mode.
if (APP_DEV_MODE) {
    options.logging = (log) => {
        console.log(log);
    };
}

// Connect to database.
const sqlite = new Sequelize(options);

export default sqlite;
