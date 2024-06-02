const express = require('express');
const router = express.Router();
const updatetrendController = require('../controllers/updatetrendController');
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.post('/',updatetrendController.handleUpdateTrend);

module.exports=router;