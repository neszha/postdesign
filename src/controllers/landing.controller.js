import { APP_VERSION } from '../helpers/config.helper.js';

export default {

    async home(req, res) {
        // Done.
        res.render('landing/home', {
            layout: '_layouts/landing',
            title: 'Jasa Berbagai Jenis Desain',
            APP_VERSION,
        });
    },

};
