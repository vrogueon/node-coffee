const {response} = require('express');

const isAdminRole = (req, res = response, next) => {
    if(!req.user) {
        return res.status(500).json({
            msg: `Invalid Token`
        });
    }

    const {role, name} = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} unauthorized user`
        });
    }

    next();
}

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if(!req.user) {
            return res.status(500).json({
                msg: `Token need to be validated first`
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `Invalid Role`
            });
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}