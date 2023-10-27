import { Router } from 'express';
import appController from '../controllers/app.controller.js';
import statsController from '../controllers/stats.controller.js';
import { incTotalHit } from '../../middlewares/stats.middleware.js';
import serialNumberController from '../controllers/serial-number.controller.js';

/** Endpoint level: /api/* */
const router = new Router();

router.get('/', appController.get.test);
router.get('/info', appController.get.info);
router.get('/time-server', appController.get.timeServer);

router.post('/sn/monitor', incTotalHit, serialNumberController.post.monitor);
router.post('/stats', statsController.post.sendMessageToTelegramUsers);

export default router;
