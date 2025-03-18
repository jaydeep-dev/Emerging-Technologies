const express = require('express');
const perceptronController = require('../controllers/perceptron.server.controller');
//
const router = express.Router();
//
// Mount the 'perceptronController' controller's 'render' method
router.get('/', perceptronController.render);
router.get('/results', perceptronController.linearClassifier);
// Mount the 'perceptron' controller's 'perceptron' method
router.get('/function_classifier', perceptronController.perceptronFunctionClassifier);
router.get('/function_classifier_AND', perceptronController.AND);
router.get('/function_classifier_OR', perceptronController.OR);
//
module.exports = router;