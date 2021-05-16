const { Category, Role, User, Product } = require('../models');

const isRoleValid = async(role = '') => {
    const roleExists = await Role.findOne({role});
    if(!roleExists) {
        throw new Error(`Role ${role} is not defined`);
    }
}

const emailExists = async(email) => {
    const emailExists = await User.findOne({email});

    if (emailExists) {
        throw new Error(`Email ${emailExists.email} is already registered`);
    }
}

const userExists = async(id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error(`ID ${id} doesn't exist`);
    }
}

const categoryExists = async(id) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new Error(`ID ${id} doesn't exist`);
    }
}

const productExists = async(id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error(`ID ${id} doesn't exist`);
    }
}

module.exports = {
    isRoleValid,
    emailExists,
    userExists,
    categoryExists,
    productExists
}