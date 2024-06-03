const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/SubmissionController.js');
const auth = require('../middleware/auth.js');

// router.get('/a', exampleController.a);

router.get('/b',auth(["admin","user"]), exampleController.b);
router.post('/create', auth(["admin","user"]),exampleController.create);
router.get('/readbyPID/:id',auth(["admin","user"]), exampleController.readbyPID);
router.get('/readbyhandle', auth(["admin","user"]),exampleController.readbyhandle);
module.exports = router;