const express = require('express');
const router = express.Router();
const showsellerchatsController = require('../controllers/showsellerchatsController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',showsellerchatsController.handleShowSellerChats);

module.exports=router;