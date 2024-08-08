const express = require('express')
const router = express.Router();

const metricsController = require("../controller/metrics")

router.post('/analyse',metricsController.getData)

module.exports = router