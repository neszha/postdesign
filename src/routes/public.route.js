import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import publicViewController from '../controllers/public-view.controller.js';
import { incTotalAccessPublic, incTotalLogin } from '../middlewares/stats.middleware.js';

/** Endpoint level: /* */
const router = new Router();

router.get('/', incTotalAccessPublic, publicViewController.home);
router.get('/home', incTotalAccessPublic, publicViewController.home);
router.get('/features', incTotalAccessPublic, publicViewController.features);
router.get('/tutorial', incTotalAccessPublic, publicViewController.tutorial);
router.get('/demo', incTotalAccessPublic, publicViewController.demo);
router.get('/faq', incTotalAccessPublic, publicViewController.faq);
router.get('/contact', incTotalAccessPublic, publicViewController.contact);
router.get('/get-app', incTotalAccessPublic, publicViewController.getApp);
router.get('/auth', incTotalAccessPublic, publicViewController.login);
router.get('/logout', authController.get.logout);

router.post('/auth', incTotalLogin, authController.post.login);

export default router;
