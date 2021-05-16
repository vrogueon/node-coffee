const {Router} = require('express');
const { check } = require('express-validator');

const { 
    createProduct, 
    getProduct, 
    getProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');

const { productExists, categoryExists } = require('../helpers/validators.helper');

const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(productExists),
    validateFields,
],getProduct);

router.post('/', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('category', 'Invalid ID').isMongoId(),
    check('category').custom(categoryExists),
    validateFields,
], createProduct);

router.put('/:id', [
    validateJWT,
    check('id').custom(productExists),
    validateFields
],
updateProduct);

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(productExists),
    validateFields
], deleteProduct);


module.exports = router;
