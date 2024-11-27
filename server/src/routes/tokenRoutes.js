const express = require('express');
const tokenController = require('../controllers/TokenController');
const router = express.Router();

router.post('/', tokenController.loginAndGenerateToken)

module.exports = router;