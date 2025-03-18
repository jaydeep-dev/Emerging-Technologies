const express = require('express');
const backproptfController = require('../controllers/backproptf.server.controller');
//
const router = express.Router();
//
// Mount the 'perceptronController' controller's 'render' method
router.get('/', backproptfController.render);
//
router.get('/run_three_layer_model', backproptfController.classifier);
//
router.get('/run_xor_model',backproptfController.xorClassifier);

module.exports = router;




