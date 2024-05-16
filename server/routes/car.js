const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.post('/',carController.handleCar);

module.exports=router;