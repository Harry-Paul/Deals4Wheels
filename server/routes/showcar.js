const express = require('express');
const router = express.Router();
const showcarController = require('../controllers/showcarController');
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.post('/',showcarController.handleShowCar);

module.exports=router;