const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',bidController.handleBid);

module.exports=router;