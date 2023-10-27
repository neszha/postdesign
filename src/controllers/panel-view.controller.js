import moment from 'moment';
import jsonBeautify from 'json-beautify';
import sessionModel from '../models/sessions.model.js';
import monitorsModel from '../models/monitors.model.js';
import { getFormsObject } from '../helpers/forms.helper.js';
import { appKeyDecrypt, generateSerialNumber } from '../helpers/crypto.helper.js';

const toTimeString = (time) => {
    const momentObj = moment(time);
    return `${momentObj.format('YYYY/MM/DD hh:mm A')}`;
};

const monitorViewBuilder = (monitor) => {
    const nowTime = new Date().getTime();
    monitor.isExpired = false;
    monitor.activePeriod = null;

    // Calculate createdAt string lang.
    if (monitor.snCreatedAt) {
        monitor.snCreatedAtString = {
            time: toTimeString(monitor.snCreatedAt),
            from: moment(monitor.snCreatedAt).fromNow(),
        };
    } else {
        monitor.snCreatedAtString = {
            time: '-', from: '-',
        };
    }

    // Calculate updatedAt string lang.
    monitor.snUpdatedAtString = {
        time: toTimeString(monitor.appTime),
        from: moment(monitor.appTime).fromNow(),
    };

    // Calculate expireAt string lang.
    if (monitor.snExpiredAt) {
        monitor.snExpiredAtString = {
            time: toTimeString(monitor.snExpiredAt),
            from: moment(monitor.snExpiredAt).fromNow(),
        };
    } else {
        monitor.snExpiredAtString = {
            time: '-', from: '-',
        };
    }

    // Validate expired status.
    if (monitor.snExpiredAt) {
        monitor.activePeriod = moment(monitor.snExpiredAt).diff(moment(monitor.snCreatedAt), 'days');
        if (nowTime > monitor.snExpiredAt) {
            monitor.isExpired = true;
        }
    }

    // Encode school info.
    monitor.schoolInfo = JSON.parse(monitor.schoolInfo);

    // Block validate.
    if (monitor.blocked) monitor.status = 'blocked';
};

export default {
    async dashboard(req, res) {
        // Get sessions data.
        const sessions = await sessionModel.findAll({
            raw: true,
            order: [['loginAt', 'DESC']],
        });

        // Rebuild data.
        const timeFormat = 'yyyy/MM/DD hh:mm:ss';
        sessions.forEach((session) => {
            const origin = { ...session };
            session.loginAt = moment(session.loginAt).format(timeFormat);
            session.loginAtFromNow = moment(new Date(origin.loginAt)).fromNow();
            if (session.logoutAt) session.logoutAt = moment(session.logoutAt).format(timeFormat);
            else session.logoutAt = '-';
        });

        // Get forms.
        const formsObj = await getFormsObject();

        // Done.
        res.render('panel/dashboard', {
            layout: '_layouts/panel',
            title: 'Beranda',
            formsObj,
            sessions,
        });
    },

    async serialNumber(req, res) {
        // Get monitors.
        const monitors = await monitorsModel.findAll({
            raw: true,
            order: [['appTime', 'DESC']],
        });
        monitors.forEach((monitor) => monitorViewBuilder(monitor));

        // Done.
        res.render('panel/sn/index', {
            layout: '_layouts/panel',
            title: 'Serial Number Monitor',
            monitors,
        });
    },

    async serialNumberDetail(req, res) {
        const monitorId = req.params.id;

        // Get monitor.
        const monitor = await monitorsModel.findOne({
            raw: true,
            where: { id: monitorId },
        });
        if (!monitor) return res.redirect('/panel/sn');
        monitorViewBuilder(monitor);

        // School info json beauty.
        const schoolInfoBeauty = jsonBeautify(monitor.schoolInfo, null, 2, 80);

        // Generate update query.
        const searchParams = new URLSearchParams();
        searchParams.set('id', monitor.id);
        searchParams.set('name', monitor.snName);
        searchParams.set('server', monitor.snServer);
        searchParams.set('email', monitor.snEmail);
        searchParams.set('createdAt', monitor.snCreatedAt);
        if (monitor.snExpiredAt) searchParams.set('expiredAt', monitor.snExpiredAt);

        // Done.
        return res.render('panel/sn/detail', {
            layout: '_layouts/panel',
            title: monitor.snName || 'No Name',
            monitor,
            schoolInfoBeauty,
            searchParams: searchParams.toString(),
        });
    },

    async serialNumberVerify(req, res) {
        // Done.
        res.render('panel/sn/verify', {
            layout: '_layouts/panel',
            title: 'Verify Application Key',
            query: req.query,
        });
    },

    async serialNumberGenerate(req, res) {
        const appKey = req.query['app-key'];
        if (!appKey) return res.redirect('/panel/sn/verify');

        // Decrypt application key.
        const appKeyBody = appKeyDecrypt(appKey);
        if (!appKeyBody) return res.redirect('/panel/sn/verify?invalid=true');

        // Generate datetime-local today.
        const today = new Date();
        const datetimeLocal = moment(today).format().slice(0, 16).replace('T', ' ');

        // Done.
        return res.render('panel/sn/generate', {
            layout: '_layouts/panel',
            title: 'Generate Serial Number',
            appKey,
            appKeyBody,
            datetimeLocal,
        });
    },

    async serialNumberUpdate(req, res) {
        const {
            id, name, email, createdAt, expiredAt,
        } = req.query;

        // Validate body.
        if (!id || !name || !email || !createdAt) return res.redirect('/panel/sn');

        // Build query body.
        const queryBody = { ...req.query };
        queryBody.dateTimeLocal = { createdAt: '', expiredAt: '' };
        if (Number(createdAt)) {
            queryBody.dateTimeLocal.createdAt = moment(Number(createdAt)).format().slice(0, 16).replace('T', ' ');
        }
        if (Number(expiredAt)) {
            queryBody.dateTimeLocal.expiredAt = moment(Number(expiredAt)).format().slice(0, 16).replace('T', ' ');
        }

        // Done.
        return res.render('panel/sn/update', {
            layout: '_layouts/panel',
            title: 'Update Serial Number',
            queryBody,
        });
    },

    async serialNumberPublish(req, res) {
        const appKey = req.query['app-key'];
        const {
            name, server, email, createdAt, expiredAt,
        } = req.query;

        // Validate body.
        const createdTime = new Date(createdAt).getTime() || null;
        const expiredTime = (expiredAt) ? new Date(expiredAt).getTime() || null : null;
        if (!appKey || !name || !server || !email || !createdTime) return res.redirect('/panel/sn/verify?invalid-query=true');
        if (expiredTime) {
            if (expiredTime <= createdTime) return res.redirect('/panel/sn/verify?invalid-time=true');
        }

        // Decrypt app key.
        const appKeyBody = appKeyDecrypt(appKey);
        if (!appKeyBody) return res.redirect('/panel/sn/verify?invalid=true');
        const { version } = appKeyBody;

        // Generate serial number.
        const payloadBody = {
            name, version, server, email, createdAt: createdTime, expiredAt: expiredTime,
        };
        const generated = generateSerialNumber(appKey, payloadBody);
        if (!generated) return res.redirect('/panel/sn/verify?invalid=true');

        // Generate json showed.
        const jsonData = { ...generated };
        delete jsonData.serialNumber;
        const generatedBeauty = jsonBeautify(jsonData, null, 2, 80);

        // Done.
        return res.render('panel/sn/publish', {
            layout: '_layouts/panel',
            title: 'Publish Serial Number',
            generated,
            generatedBeauty,
        });
    },

    async forms(req, res) {
        const formsObj = await getFormsObject();
        return res.render('panel/forms', {
            layout: '_layouts/panel',
            title: 'Forms',
            formsObj,
        });
    },
};
