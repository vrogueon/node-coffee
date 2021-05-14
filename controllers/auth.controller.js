const  {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt.helper');
const { googleVerify } = require('../helpers/google-verify.helper');

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
        return res.status(500).json({
            msg: `Server error`
        });
    }
    
}

const googleSignin = async(req, res = response) => {

    const {id_token} = req.body;
    try {
        const {email, name, img} = await googleVerify(id_token);

        let user = await  User.findOne({email});

        if(!user) {
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        if(!user.status) {
            return res.json(401).json({
                msg: `User blocked, please contact admin`
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            msg: `Invalid google token`
        });
    }

}

module.exports = {
    login,
    googleSignin
}