const express = require('express');
const router = express.Router();
const showbidsController = require('../controllers/showbidsController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',showbidsController.handleShowbids);

module.exports=router;