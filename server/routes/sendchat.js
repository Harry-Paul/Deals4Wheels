const express = require('express');
const router = express.Router();
const sendchatController = require('../controllers/sendchatController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',sendchatController.handleSendChat);

module.exports=router;