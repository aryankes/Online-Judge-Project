const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/Problem-Set.js');

// router.get('/a', exampleController.a);
router.get('/b', exampleController.b);
router.post('/create', exampleController.create);
router.get('/read', exampleController.read);
router.put('/update', exampleController.update);
router.delete('/delete', exampleController.delete);


// router.post('/login', exampleController.login);
module.exports = router;