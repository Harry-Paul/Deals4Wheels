const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predictController');
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.post('/',predictController.handlePredict);

module.exports=router;