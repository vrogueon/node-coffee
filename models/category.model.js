const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        unique: true,
        required: ['Name is mandatory']
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        req: true
    }
});

CategorySchema.methods.toJSON = function() {
    const {__v, status, ...data} = this.toObject();
    return data;
}

module.exports = model('Category', CategorySchema);