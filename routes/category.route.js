const {Router} = require('express');
const { check } = require('express-validator');

const { 
    createCategory, 
    getCategories, 
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');
const { categoryExists } = require('../helpers/validators.helper');

const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(categoryExists),
    validateFields,
],getCategory);

router.post('/', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    validateFields,
], createCategory);

router.put('/:id', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('id').custom(categoryExists),
    validateFields
],
updateCategory);

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(categoryExists),
    validateFields
], deleteCategory);


module.exports = router;
