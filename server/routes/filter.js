const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filterController');
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.post('/',filterController.handleFilter);

module.exports=router;