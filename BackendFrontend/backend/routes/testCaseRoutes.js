const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/testController.js');
const auth = require('../middleware/auth.js');

// router.get('/a', exampleController.a);

router.get('/b',auth(["admin","user"]), exampleController.b);
router.post('/create',auth(["admin"]), exampleController.create);
router.get('/readbyTID',auth(["admin","user"]), exampleController.readbyTID);
router.get('/readbyPID',auth(["admin","user"]), exampleController.readbyPID);
router.put('/update', auth(["admin"]),exampleController.update);
router.delete('/deletesingle',auth(["admin"]), exampleController.deletesingle);
router.delete('/deleteAllbyPID',auth(["admin"]), exampleController.deleteAllbyPID);
// router.post('/login', exampleController.login);
module.exports = router;