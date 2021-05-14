const {Router} = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');

const router = Router();

router.get('/', (req, res) => {
    res.json('get');
});

router.get('/:id', (req, res) => {
    res.json('get');
});

router.post('/', (req, res) => {
    res.json('post');
});

router.put('/:id', (req, res) => {
    res.json('put');
});

router.delete('/:id', (req, res) => {
    res.json('delete');
});


module.exports = router;
