import express, { Router } from 'express';
import panelRoute from './panel.route.js';
import publicRoute from './public.route.js';
import { PATH_ROOT } from '../helpers/config.helper.js';

/** Endpoint level: /* */
const router = new Router();

// Static routes.
router.use('/', express.static(`${PATH_ROOT}/public`, { maxAge: 1000 * 60 * 60 * 24 * 30 })); // 30 days.
router.use('/files', express.static(`${PATH_ROOT}/storage/files`));
router.use('/', publicRoute);
router.use('/panel', panelRoute);

// 404: Page Not Found.
router.use((req, res) => {
    res.status(404);
    res.render('public/404', {
        layout: '_layouts/public',
        title: 'Not Found',
    });
});

export default router;
