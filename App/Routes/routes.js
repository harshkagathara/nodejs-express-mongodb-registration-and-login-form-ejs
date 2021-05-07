var express = require('express');
var router = express.Router();
var user = require('../Controllers/user.controller');

router.get('/', user.ShowRegistration);
router.post('/', user.Create);
router.get('/login', user.ShowLogin);
router.post('/login', user.CheckLogin);
router.get('/profile', user.Profile);
router.get('/logout', user.LogOut);

module.exports = router;