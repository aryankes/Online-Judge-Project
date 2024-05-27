const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/testController.js');

// router.get('/a', exampleController.a);
router.get('/b', exampleController.b);
router.post('/create', exampleController.create);
router.get('/readbyTID', exampleController.readbyTID);
router.get('/readbyPID', exampleController.readbyPID);
router.put('/update', exampleController.update);
router.delete('/deletesingle', exampleController.deletesingle);
router.delete('/deleteall', exampleController.deleteall);



// router.post('/login', exampleController.login);
module.exports = router;