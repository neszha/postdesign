import sessionsModel from '../models/sessions.model.js';

export const authenticated = async (req, res, next) => {
    try {
        const { sessionId } = req.cookies;
        if (!sessionId) return res.status(401).redirect('/');

        // Get session data.
        const session = await sessionsModel.findOne({
            raw: true,
            where: { id: sessionId },
        });
        if (!session || !session.isValid || session.logoutAt) {
            return res.status(401).redirect('/logout');
        }

        // Done.
        req.session = session;
        return next();
    } catch (error) {
        res.clearCookie('sessionId');
        return res.status(401).redirect('/logout');
    }
};

export default {};
