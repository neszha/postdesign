import { incStatForm } from '../helpers/forms.helper.js';

export const incTotalAccess = async (req, res, next) => {
    incStatForm('total-access');
    next();
};

export const incTotalAccessPublic = async (req, res, next) => {
    incStatForm('total-access-public');
    next();
};

export const incTotalLogin = async (req, res, next) => {
    incStatForm('total-login');
    next();
};

export const incTotalHit = async (req, res, next) => {
    incStatForm('total-hit');
    next();
};
