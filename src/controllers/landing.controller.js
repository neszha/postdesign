export default {

    async home(req, res) {
        // Done.
        res.render('landing/home', {
            layout: '_layouts/landing',
            title: 'Beranda',
        });
    },

};
