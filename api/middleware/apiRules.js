const apiRules = (req, res, next) => {
    //requests can come from anywhere
    res.header('Access-Control-Allow-Origin', '*');
    //which headers can be used in project
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    //
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
};
module.exports = apiRules;