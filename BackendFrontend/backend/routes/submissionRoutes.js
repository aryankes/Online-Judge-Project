const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/SubmissionController.js');
const auth = require('../middleware/auth.js');

// router.get('/a', exampleController.a);

router.get('/b',auth(["admin","user"]), exampleController.b);
router.post('/create', auth(["admin","user"]),exampleController.create);
router.get('/readbyPID/:id',auth(["admin","user"]), exampleController.readbyPID);
router.get('/readbyhandle', auth(["admin","user"]),exampleController.readbyhandle);
router.get('/readbyhandle', auth(["admin","user"]),exampleController.readbyhandle);
router.get('/read',auth(["admin","user"]),exampleController.read);
router.delete('/delete/:id',auth(["admin"]),exampleController.delete);
module.exports = router;