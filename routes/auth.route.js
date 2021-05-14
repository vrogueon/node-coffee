const {Router} = require('express');
const {check} = require('express-validator');
const { login, googleSignin } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields.middleware');

const router = Router();

router.post('/login', [
    check('email', 'Email is Mandatory').isEmail(),
    check('password', 'Password is Mandatory').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'Token is Mandatory').not().isEmpty(),
    validateFields
], googleSignin);

module.exports = router;