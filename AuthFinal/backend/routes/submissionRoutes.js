const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/SubmissionController.js');

// router.get('/a', exampleController.a);
router.get('/b', exampleController.b);
router.post('/create', exampleController.create);
router.get('/readbySID', exampleController.readbySID);
router.get('/readbyPID', exampleController.readbyPID);
router.get('/readbyhandle', exampleController.readbyhandle);
router.put('/update', exampleController.update);
router.delete('/delete', exampleController.delete);


// router.post('/login', exampleController.login);
module.exports = router;