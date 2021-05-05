const {Router} = require('express');
const { check } = require('express-validator');
const { 
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    patchUsers
} = require('../controllers/user.controller');
const { 
    isRoleValid, 
    emailExists, 
    userExists
} = require('../helpers/validators.helper');
const { validateFields } = require('../middlewares/validate-fields.middleware');

const router = Router();

router.get('/', getUsers);

router.put('/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userExists),
    check('role').custom(isRoleValid),
    validateFields
], putUsers);

router.post('/', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password should contain 6 characters').isLength({min: 6}),
    check('email', 'Invalid email').isEmail(),
    check('email').custom(emailExists),
    // check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    validateFields
], postUsers);

router.delete('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userExists),
    validateFields
],deleteUsers);

router.patch('/', patchUsers);    

module.exports = router;