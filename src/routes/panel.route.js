import { Router } from 'express';
import formsController from '../controllers/forms.controller.js';
import { authenticated } from '../middlewares/auth.middleware.js';
import sessionsController from '../controllers/sessions.controller.js';
import monitorsController from '../controllers/monitors.controller.js';
import panelViewController from '../controllers/panel-view.controller.js';

/** Endpoint level: /panel* */
const router = new Router();

router.get('/', authenticated, panelViewController.dashboard);
router.get('/sn', authenticated, panelViewController.serialNumber);
router.get('/sn/verify', authenticated, panelViewController.serialNumberVerify);
router.get('/sn/generate', authenticated, panelViewController.serialNumberGenerate);
router.get('/sn/update', authenticated, panelViewController.serialNumberUpdate);
router.get('/sn/publish', authenticated, panelViewController.serialNumberPublish);
router.get('/sn/:id', authenticated, panelViewController.serialNumberDetail);
router.get('/forms', authenticated, panelViewController.forms);

// Actions.
router.get('/sessions/clear', authenticated, sessionsController.get.clearAllSessionWithoutMe);
router.get('/monitors/delete-invalid', authenticated, monitorsController.get.deleteInvalidMonitor);
router.get('/monitors/delete-expired', authenticated, monitorsController.get.deleteExpiredMonitor);
router.get('/monitors/delete-all', authenticated, monitorsController.get.deleteAllMonitor);
router.get('/monitors/:id/block-toggle', authenticated, monitorsController.get.monitorBlockToggle);
router.get('/monitors/:id/delete', authenticated, monitorsController.get.deleteMonitorById);
router.post('/forms/update-app-version', authenticated, formsController.post.updateAppVersion);
router.post('/forms/update-app-demo-link', authenticated, formsController.post.updateAppDemoLink);
router.post('/forms/upload-myexams-apk', authenticated, formsController.post.uploadMyExamsApk);

export default router;
