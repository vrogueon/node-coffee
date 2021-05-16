const { response } = require("express");
const { User, Category } = require("../models");

const createCategory = async (req, res = response, next) => {
    try {
        const name = req.body.name.toUpperCase();
        const categoryDB = await User.findOne({name});
        console.log(categoryDB);
        if(categoryDB) {
            return res.status(400).json({
                msg: `Category ${categoryDB.name} already exists` 
            });
        }

        const data = {
            name,
            user: req.user._id
        }

        const category = await new Category(data);
        await category.save();

        res.status(201).json({
            msg: `Category created`,
            Category
        });   
    } catch (error) {
        res.status(500).json({
            msg: `Server error`
        });   
    }
}

module.exports = {
    createCategory
}