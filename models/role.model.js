const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: ['Role is mandatory']
    }
});

module.exports = model('Role', RoleSchema);