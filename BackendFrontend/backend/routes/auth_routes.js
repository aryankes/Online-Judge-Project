const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/AuthController.js');
const auth = require('../middleware/auth');

router.get('/a', exampleController.a);
router.get('/b', exampleController.b);
router.post('/register', exampleController.register);
router.post('/login', exampleController.login);
router.get('/read/:id',exampleController.read);
router.put('/update/:id',exampleController.update);

router.delete('/delete',auth(["admin"]),exampleController.delete);
router.get('/logout', exampleController.logout);

module.exports = router;