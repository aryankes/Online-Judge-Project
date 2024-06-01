const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/ProblemExecutionController.js');
const auth = require('../middleware/auth');
// router.get('/a', exampleController.a);
// router.get('/b',auth(["admin"]), exampleController.b);
router.post('/submit/:id',auth(["admin","user"]), exampleController.submit);

module.exports = router;