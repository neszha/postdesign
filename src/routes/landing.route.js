import { Router } from 'express';
import landingController from '../controllers/landing.controller.js';

/** Endpoint level: /* */
const router = new Router();

router.get('/', landingController.home);

export default router;
