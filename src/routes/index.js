import express, { Router } from 'express';
import landingRoute from './landing.route.js';
import { PATH_ROOT } from '../helpers/config.helper.js';

/** Endpoint level: /* */
const router = new Router();

// Static routes.
router.use('/', express.static(`${PATH_ROOT}/public`, { maxAge: 1000 * 60 * 60 * 24 * 30 })); // 30 days.
router.use('/files', express.static(`${PATH_ROOT}/storage/files`));
router.use('/', landingRoute);

// 404: Page Not Found.
router.use((req, res) => {
    res.status(404);
    res.render('landing/404', {
        layout: '_layouts/landing',
        title: 'Not Found',
    });
});

export default router;
