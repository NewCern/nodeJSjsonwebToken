const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtVerify = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader)
    return res.json({success: false, message: 'not authorized', status: 401})
    const token = authHeader.split(" ")[1];
    jsonwebtoken.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err) return res.json({success: false, err, status: 403});
        req.user = user;
        next();
    })
}
const isRole3 = (req, res, next) => {
    jwtVerify(req, res, () => {
        req.user.roleId === 3 
        ? next()
        : res.status(403).json({success: false, message: 'not authorized or roleId 3'});
    })
}

module.exports = { jwtVerify, isRole3 }