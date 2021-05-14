const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            msg: `Empty Token`
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(400).json({
                msg: `Invalid User`
            });
        }
        
        if(!user.status) {
            return res.status(401).json({
                msg: `Invalid User, status: false`
            });
        }

        req.user = user;
        
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