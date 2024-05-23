const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController.js');

router.get('/', exampleController.getAllExamples);
router.post('/', exampleController.createExample);

module.exports = router;
