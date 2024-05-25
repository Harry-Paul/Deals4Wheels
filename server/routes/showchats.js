const express = require('express');
const router = express.Router();
const showchatsController = require('../controllers/showchatsController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',showchatsController.handleShowChats);

module.exports=router;