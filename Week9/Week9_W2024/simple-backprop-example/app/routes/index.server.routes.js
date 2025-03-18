// Load the 'index' controller
const index = require('../controllers/index.server.controllers');
const xor = require('../controllers/xor');

// Define the routes module' method
module.exports = function (app) {

    // Mount the 'index' controller's 'render' method
    app.get('/', index.render);
    //
    app.get('/backprop_function_classifier', index.functionClassifier);
    app.get('/backprop_exercise', xor.backprop);

    
    
};