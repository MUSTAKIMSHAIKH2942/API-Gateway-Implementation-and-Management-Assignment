// middleware/transform.js
const transformRequestResponse = (req, res, next) => {
    req.headers['x-forwarded-for'] = req.ip;
    res.setHeader('x-powered-by', 'API Gateway');
    next();
};

module.exports = { transformRequestResponse }