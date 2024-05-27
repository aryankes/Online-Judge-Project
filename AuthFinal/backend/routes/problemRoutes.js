const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/ProblemController.js');
const auth = require('../middleware/auth');
// router.get('/a', exampleController.a);
router.get('/b',auth(["admin"]), exampleController.b);
router.post('/create',auth(["admin"]), exampleController.create);
router.get('/read',auth(["admin","user"]), exampleController.read);
router.put('/update',auth(["admin"]), exampleController.update);
router.delete('/delete',auth(["admin"]),exampleController.delete);


// router.post('/login', exampleController.login);
module.exports = router;