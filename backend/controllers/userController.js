const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
    try {
        // req.user is populated by the protect middleware
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        next(err);
    }
};
