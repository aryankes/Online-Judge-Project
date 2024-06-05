const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/AuthController.js');
const auth = require('../middleware/auth');
const uploadimg=require('../middleware/uploadimg.js');
router.get('/a', exampleController.a);
router.get('/b', exampleController.b);
router.post('/register', exampleController.register);
router.post('/login', exampleController.login);
router.get('/read/:id',exampleController.read);
router.get('/readAll',exampleController.readAll);

router.put('/updateAdmin/:id',auth(["admin"]),exampleController.updateAdmin);
router.put('/update/:id',auth(["admin"]),exampleController.update);

router.delete('/delete/:id',auth(["admin"]),exampleController.delete);
router.get('/logout', exampleController.logout);
router.post('/upload/:id', uploadimg.single('image'),exampleController.upload);

module.exports = router;