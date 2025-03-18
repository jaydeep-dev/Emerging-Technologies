const {backPropFun} = require('./backprop_fun')
const {sigmoid} = require('./activation_fun')


// Create a new 'render' controller method
exports.render = function (req, res) {
    // Use the 'response' object to render the 'index' view with a 'title' property
    res.render('index', {
        title: 'Simple BackProp Example'
    });
};

/*
***************************************************
* BackProp example with neuralNetwork function
* *************************************************
*/
exports.functionClassifier = function (req, res) { 
    //
    const {matrix} = require('mathjs')
    // testing backprop with XOR data

    /*
         Solve for XOR (returns true if only one, but not both, 
          of its inputs is true).
            --------------------------------
            | input 1 | input 2 | OR | XOR |
            --------------------------------
            |    0    |    0    |  0 |  0  |
            |    0    |    1    |  1 |  1  |
            |    1    |    0    |  1 |  1  |
            |    1    |    1    |  1 |  0  |
            --------------------------------
    */
    // data
    const input = matrix([[0,0], [0,1], [1,0], [1,1]]);
    const target = matrix([[0], [1], [1], [0]]);
    //
    var epochs = 500000;
    // activation function
    var activation =  sigmoid;
    //learning rate 
    var alpha = .5;
    // a 2-4-1 network
    var model = backPropFun(2, 4, 1, epochs, alpha, activation);
    // train the model
    model.train(input, target);
    // get the results
    var result = model.predict(input)
    console.log(model.predict(input));
    // output the results to the ejs page
    res.render('backprop_classifier_results', {
        classificationResult: result
        
    });
    
    
     

};
//
