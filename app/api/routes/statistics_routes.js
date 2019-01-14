const express = require('express');
const router = express.Router();

const statisticsController = require("../controllers/statistics_controller");

module.exports = router;

router.get('/all', statisticsController.getAllStatisticsData);

router.get('/homicide', statisticsController.getHomicideData);

//router.get('/assault', statisticsController.getAssaultData);

router.get('/education', statisticsController.getEducationData);

router.get('/gdp', statisticsController.getGDPData);

router.get('/gini', statisticsController.getGINIData);


