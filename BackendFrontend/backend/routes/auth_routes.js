const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/AuthController.js');
const auth = require('../middleware/auth');

router.get('/a', exampleController.a);
router.get('/b', exampleController.b);
router.post('/register', exampleController.register);
router.post('/login', exampleController.login);
router.put('/updateEmailPass',auth(["user","admin"]),exampleController.updateEmailPass);
router.put('/updatewhole',auth(["admin"]),exampleController.updatewhole);
router.delete('/delete',auth(["admin"]),exampleController.delete);
router.get('/logout', exampleController.logout);

module.exports = router;