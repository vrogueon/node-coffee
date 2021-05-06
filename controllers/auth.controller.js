const  {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt.helper');

const login = async(req, res = response) => {
    
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                msg: `Auth error`
            });
        }

        if(!user.status) {
            return res.status(400).json({
                msg: `Invalid user`
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: `Auth error`
            });
        }
        
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });    
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: `Server error`
        })
    }
    
}

module.exports = {
    login
}