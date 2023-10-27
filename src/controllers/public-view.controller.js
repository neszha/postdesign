import youtubeVideos from '../stores/youtube-videos.js';
import { getFormsObject } from '../helpers/forms.helper.js';

export default {

    async home(req, res) {
        const formsObj = await getFormsObject();

        // Done.
        res.render('public/home', {
            layout: '_layouts/public',
            title: 'Beranda',
            formsObj,
        });
    },

    features(req, res) {
        res.render('public/features', {
            layout: '_layouts/public',
            title: 'Fitur',
        });
    },

    tutorial(req, res) {
        res.render('public/tutorial', {
            layout: '_layouts/public',
            title: 'Tutorial',
            videos: youtubeVideos,
        });
    },

    async demo(req, res) {
        const formsObj = await getFormsObject();

        // Done.
        res.render('public/demo', {
            layout: '_layouts/public',
            title: 'Coba Aplikasi',
            formsObj,
        });
    },

    faq(req, res) {
        res.render('public/faq', {
            layout: '_layouts/public',
            title: 'FAQ',
        });
    },

    contact(req, res) {
        res.render('public/contact', {
            layout: '_layouts/public',
            title: 'Kontak Pengembang',
        });
    },

    getApp(req, res) {
        res.render('public/get-app', {
            layout: '_layouts/public',
            title: 'Dapatkan Aplikasi',
        });
    },

    async login(req, res) {
        const { sessionId } = req.cookies;
        if (sessionId) return res.redirect('/panel');

        // Done.
        return res.render('public/login', {
            layout: '_layouts/public',
            title: 'Login Panel',
        });
    },

};
