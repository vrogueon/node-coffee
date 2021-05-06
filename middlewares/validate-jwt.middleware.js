const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            msg: `Empty Token`
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
        
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: `Invalid Token`
        })
    }
    next();
}

module.exports = {
    validateJWT
}