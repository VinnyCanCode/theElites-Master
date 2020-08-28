const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/users', userController.createUser);

router.post('/users/login', userController.userLogIn);

router.post('/users/logout', auth, userController.userLogOut);

router.get('/user', auth, userController.currentUser);

module.exports = router;
