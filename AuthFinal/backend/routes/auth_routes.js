const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController.js');

router.get('/a', exampleController.a);
router.get('/b', exampleController.b);
router.post('/register', exampleController.register);
module.exports = router;