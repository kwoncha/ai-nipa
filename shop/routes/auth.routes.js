const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/signup', authController.getSiguip);

router.post('/signup', authController.signup);

router.get('/login', authController.getLogin);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;