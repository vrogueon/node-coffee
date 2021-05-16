const { response } = require("express");
const { User, Category } = require("../models");

const getCategories = async (req, res = response) => {
    const {limit = 5, skip = 0} = req.query;

    const [total, categories] = await Promise.all([
        Category.countDocuments({status: true}),
        Category.find({status: true})
            .populate('user', 'name')
            .skip(Number(skip))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });
}

const getCategory = async(req, res = response) => {
    const {id} = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json(category);
}


const createCategory = async (req, res = response, next) => {
    try {
        const name = req.body.name.toUpperCase();
        const categoryDB = await User.findOne({name});

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

const updateCategory = async(req, res = response) => {
    const {id} = req.params;
    const {status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json(category);
}

const deleteCategory = async(req, res = response) => {
    const {id} = req.params;

    const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json(category);
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}