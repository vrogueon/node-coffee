const validateFields = require('./validate-fields.middleware');
const validateJWT = require('./validate-jwt.middleware');
const validateRoles = require('./validate-roles.middleware');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles
}

