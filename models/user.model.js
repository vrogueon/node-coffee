const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String,
        required: [true, 'email is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'Role is mandatory'],
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}


module.exports = model('User', userSchema);