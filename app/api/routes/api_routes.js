const express = require('express');
const router = express.Router();

const apiController = require("../controllers/api_controller");

module.exports = router;

router.get('/crimes', apiController.getCrimeData);