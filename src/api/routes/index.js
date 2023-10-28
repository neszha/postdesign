import { Router } from 'express';
import appController from '../controllers/app.controller.js';
import trackingController from '../controllers/tracking.controller.js';

/** Endpoint level: /api/* */
const router = new Router();

router.get('/', appController.get.test);
router.get('/info', appController.get.info);
router.get('/time-server', appController.get.timeServer);

router.post('/trackings', trackingController.post.sendMessageToTelegramUsers);

export default router;
