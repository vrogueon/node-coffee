const { response } = require("express");
const { Product } = require("../models");

const getProducts = async (req, res = response) => {
    const {limit = 5, skip = 0} = req.query;

    const [total, products] = await Promise.all([
        Product.countDocuments({status: true}),
        Product.find({status: true})
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(skip))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    });
}

const getProduct = async(req, res = response) => {
    const {id} = req.params;
    const product = await Product.findById(id)
                            .populate('user', 'name')
                            .populate('category', 'name')

    res.json(product);
}


const createProduct = async (req, res = response, next) => {
    try {
        const {status, user, ...body} = req.body;
        const productDB = await Product.findOne({name: body.name});

        if(productDB) {
            return res.status(400).json({
                msg: `Product ${productDB.name} already exists` 
            });
        }

        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.user._id
        }

        const product = await new Product(data);
        await product.save();

        res.status(201).json({
            msg: `Product created`,
            product
        });   
    } catch (error) {
        res.status(500).json({
            msg: `Server error`
        });   
    }
}

const updateProduct = async(req, res = response) => {
    const {id} = req.params;
    const {status, user, ...data} = req.body;

    if(data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.json(product);
}

const deleteProduct = async(req, res = response) => {
    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json(product);
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}