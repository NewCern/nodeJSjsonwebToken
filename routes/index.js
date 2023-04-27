const router = require('express').Router();
const controllers = require('../controllers');
const { jwtVerify, isRole3 } = require('../middleware');

router.post('/login', controllers.login);
router.get('/people', jwtVerify, controllers.getPeople);
router.get('/stores', isRole3, controllers.getStores);

module.exports = router