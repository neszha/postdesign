import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import expressLayouts from 'express-ejs-layouts';
import './databases/sqlite.db.js';
import router from './routes/index.js';
import apiRouter from './api/routes/index.js';
import { broadcastMessage } from './utils/telegram.bot.js';
import { incTotalAccess } from './middlewares/stats.middleware.js';
import { APP_PORT, APP_DEV_MODE, PATH_ROOT } from './helpers/config.helper.js';

/** Create express app. */
const app = express();
const httpServer = createServer(app);

/** Middlewhare express in main level. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.set('views', `${PATH_ROOT}/src/views`);
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(cors({ credentials: true, origin: true }));
if (APP_DEV_MODE) app.use(morgan('tiny'));

/** Setup routes express. */
app.use(incTotalAccess);
app.use('/api', apiRouter);
app.use('/', router);

/** Starting HTTP server. */
httpServer.listen(APP_PORT, () => {
    // Show message.
    console.clear();
    console.log(`App server listening on *:${APP_PORT}`);

    // Send booting message.
    broadcastMessage('My Exams Site has been restarted!');
});
