const express = require('express');
const router = express.Router();
const changeController = require('../controllers/changeController');
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.post('/',changeController.handleChange);

module.exports=router;