const Logging = require('../lib/Logging.js');

const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    Logging.error(error);
    return res.status(404).json({ error: error.message });
};
module.exports = notFound;