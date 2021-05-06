const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const getUsers = async(req = request, res = response) => {
    const {limit = 5, skip = 0} = req.query;

    const [total, users] = await Promise.all([
        User.countDocuments({status: true}),
        User.find({status: true})
            .skip(Number(skip))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const postUsers = async(req, res = response) => {
    
    const {name, email, password, role } = req.body;
    const user = new User({name, email, password, role});

    user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync());

    await user.save();

    res.json({user});
}

const putUsers = async(req, res = response) => {

    const {id} = req.params;
    const { _id, password, google, email, ...user } = req.body;

    if (password) {
        user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
    }

    const userDB = await User.findByIdAndUpdate(id, user);

    res.json({userDB});
}

const deleteUsers = async(req, res = response) => {
    const {id} = req.params;
    const uid = req.uid;

    const user = await User.findByIdAndUpdate(id, {status: false});
    res.json({
        user,
        uid
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
}