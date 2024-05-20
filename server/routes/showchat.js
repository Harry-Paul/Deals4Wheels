const express = require('express');
const router = express.Router();
const showchatController = require('../controllers/showchatController');
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.post('/',showchatController.handleShowChat);

module.exports=router;